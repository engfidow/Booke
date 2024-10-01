// controllers/bookController.go
package controllers

import (
	db "book/config"
	"book/models"
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var bookCollection *mongo.Collection

// InitializeUserCollection initializes the userCollection after MongoDB connection is established
func InitializeBooksCollection() {
	if db.MongoClient == nil {
		fmt.Println("MongoClient is not initialized! Check the MongoDB connection.")
		return
	}
	bookCollection = db.MongoClient.Database("library").Collection("books")
	fmt.Println("book collection initialized successfully!")
}

// AddBook handles creating a new book with PDF and cover image upload
func AddBook(c *gin.Context) {
	var book models.Book

	// Bind form data for the book details (title, author, price, etc.)
	book.Title = c.PostForm("title")
	book.Author = c.PostForm("author")
	book.Price, _ = strconv.ParseFloat(c.PostForm("price"), 64)
	book.Description = c.PostForm("description")

	// Get the user ID from form data and convert it to ObjectID
	userIDStr := c.PostForm("user_id")
	if userIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	objID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID format"})
		return
	}
	book.UserID = objID // Assign the UserID to the book

	// Handle cover image upload
	coverImage, err := c.FormFile("coverImage")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cover image is required"})
		return
	}
	coverImagePath := fmt.Sprintf("uploads/images/%s", coverImage.Filename)
	if err := c.SaveUploadedFile(coverImage, coverImagePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload cover image"})
		return
	}
	book.ImageURL = coverImagePath // Save the image path

	// Handle PDF file upload
	pdfFile, err := c.FormFile("pdfFile")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PDF file is required"})
		return
	}
	pdfFilePath := fmt.Sprintf("uploads/pdfs/%s", pdfFile.Filename)
	if err := c.SaveUploadedFile(pdfFile, pdfFilePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload PDF file"})
		return
	}
	book.PDFURL = pdfFilePath // Save the PDF file path

	// Handle published date
	publishedDateStr := c.PostForm("publishedDate")
	if publishedDateStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Published date is required"})
		return
	}
	// Directly save published date as string
	book.PublishedDate = publishedDateStr

	// Log the book struct before inserting
	fmt.Printf("Book to be inserted: %+v\n", book)

	// Insert the book into the collection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := bookCollection.InsertOne(ctx, book)
	if err != nil {
		// Log the error for more context
		fmt.Printf("Error inserting book: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create book"})
		return
	}

	// Log successful insertion result
	fmt.Printf("Book inserted successfully with ID: %v\n", result.InsertedID)

	c.JSON(http.StatusOK, gin.H{"message": "Book added successfully", "book": book})
}

func GetAllBooks(c *gin.Context) {
	// Get user ID from request headers
	// userID := c.Request.Header.Get("User-ID")

	// // Check if User ID is present
	// if userID == "" {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
	// 	return
	// }

	var books []models.Book
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Log the user ID for debugging
	// fmt.Println("Fetching books for user ID:", userID)

	// Query the database for books associated with the user ID
	cursor, err := bookCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve books"})
		return
	}
	defer cursor.Close(ctx)

	// Iterate over cursor to decode books
	for cursor.Next(ctx) {
		var book models.Book
		if err := cursor.Decode(&book); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding book"})
			return
		}
		books = append(books, book)
	}

	// Check for errors during iteration
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cursor iteration error"})
		return
	}

	// Log the books retrieved
	fmt.Println("Books found:", books)

	// Return the list of books
	c.JSON(http.StatusOK, books)
}

// GetBook retrieves books by user_ID
func GetBook(c *gin.Context) {
	userID := c.Param("id") // Get user ID from route parameters
	fmt.Println("hello user id", userID)

	// Check if User ID is present
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Convert userID to ObjectID
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID format"})
		return
	}

	var books []models.Book
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Log the user ID for debugging
	fmt.Println("Fetching books for user ID:", userID)

	// Query the database for books associated with the user ID
	cursor, err := bookCollection.Find(ctx, bson.M{"user_id": userObjectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve books"})
		return
	}
	defer cursor.Close(ctx)

	// Iterate over cursor to decode books
	for cursor.Next(ctx) {
		var book models.Book
		if err := cursor.Decode(&book); err != nil {
			fmt.Printf("Error decoding book: %v\n", err) // Log the decoding error
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding book"})
			return
		}
		books = append(books, book)
	}

	// Check for errors during iteration
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cursor iteration error"})
		return
	}

	// Log the books retrieved
	fmt.Println("Books found:", books)

	// Return the list of books
	c.JSON(http.StatusOK, books)
}

// UpdateBook updates book information (admin-only)
func UpdateBook(c *gin.Context) {
	id := c.Param("id")
	var updatedFields bson.M = bson.M{}

	// Get fields from FormData
	title := c.PostForm("title")
	if title != "" {
		updatedFields["title"] = title
	}

	author := c.PostForm("author")
	if author != "" {
		updatedFields["author"] = author
	}

	priceStr := c.PostForm("price")
	if priceStr != "" {
		price, err := strconv.ParseFloat(priceStr, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid price format"})
			return
		}
		updatedFields["price"] = price
	}

	// Update published date as a string
	publishedDate := c.PostForm("publishedDate")
	if publishedDate != "" {
		updatedFields["published_date"] = publishedDate
	}

	// Handle cover image if provided
	coverImage, err := c.FormFile("coverImage")
	if err == nil {
		coverImagePath := fmt.Sprintf("uploads/images/%s", coverImage.Filename)
		if err := c.SaveUploadedFile(coverImage, coverImagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload cover image"})
			return
		}
		updatedFields["image_url"] = coverImagePath
	} else if err != http.ErrMissingFile {
		// Handle unexpected errors (not just missing file errors)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process cover image"})
		return
	}

	// Handle PDF file if provided
	pdfFile, err := c.FormFile("pdfFile")
	if err == nil {
		pdfFilePath := fmt.Sprintf("uploads/pdfs/%s", pdfFile.Filename)
		if err := c.SaveUploadedFile(pdfFile, pdfFilePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload PDF file"})
			return
		}
		updatedFields["pdf_url"] = pdfFilePath
	} else if err != http.ErrMissingFile {
		// Handle unexpected errors (not just missing file errors)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process PDF file"})
		return
	}

	// Check if there are any fields to update
	if len(updatedFields) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No fields to update"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Convert ID to ObjectID
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	// Update the book in the collection
	updateResult, err := bookCollection.UpdateOne(ctx, bson.M{"_id": objID}, bson.M{"$set": updatedFields})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update book"})
		return
	}

	// If no documents were updated, notify the client
	if updateResult.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book updated successfully ✅"})
}

// DeleteBook deletes a book by ID (admin-only)
func DeleteBook(c *gin.Context) {

	id := c.Param("id")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, _ := primitive.ObjectIDFromHex(id)
	_, err := bookCollection.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete book"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book deleted successfully"})
}
