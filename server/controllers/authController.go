package controllers

import (
	db "book/config"
	"book/models"
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection

// InitializeUserCollection initializes the userCollection after MongoDB connection is established
func InitializeUserCollection() {
	if db.MongoClient == nil {
		fmt.Println("MongoClient is not initialized! Check the MongoDB connection.")
		return
	}
	userCollection = db.MongoClient.Database("library").Collection("users")
	fmt.Println("User collection initialized successfully!")
}

// func init() {
// 	// Initialize the userCollection after DB is initialized
// 	userCollection = config.GetCollection(config.DB, "users")
// }

var jwtKey = []byte(os.Getenv("SECRET_KEY")) // Change this secret in production

// Claims defines the structure for JWT claims
type Claims struct {
	Email string `json:"email"`
	Type  string `json:"type"`
	jwt.RegisteredClaims
}

// Register handles new user registration
func Register(c *gin.Context) {
	var user models.User

	// Parse the incoming form data (multipart/form-data)
	user.Name = c.PostForm("name")
	user.Email = c.PostForm("email")
	password := c.PostForm("password")
	// confirmPassword := c.PostForm("confirmPassword")

	// // Validate passwords
	// if password != confirmPassword {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Passwords do not match"})
	// 	return
	// }

	// Handle file upload (image)
	file, err := c.FormFile("profileImage")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to upload image"})
		return
	}

	// Save the file to a local directory
	filename := filepath.Base(file.Filename)
	savePath := filepath.Join("uploads", filename)
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	// Hash the password before saving it
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password = string(hashedPassword)
	user.Type = "user"       // Default user type
	user.ImageURL = savePath // Store the file path or URL

	// Insert the user into the database
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = userCollection.InsertOne(ctx, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully", "image_url": user.ImageURL})
}

// Login handles user login and JWT token generation
func Login(c *gin.Context) {
	var credentials models.User
	var storedUser models.User

	// Bind login credentials
	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find the user in the database by email
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := userCollection.FindOne(ctx, bson.M{"email": credentials.Email}).Decode(&storedUser)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Compare stored hashed password with the provided password
	if err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(credentials.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Create the JWT token with an expiration time of 24 hours
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Email: storedUser.Email,
		Type:  storedUser.Type,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	// Remove the password before sending the response
	storedUser.Password = "" // Never return the password

	// Return the JWT token and all user information
	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
		"user":  storedUser, // Return all user info except password
	})
}
