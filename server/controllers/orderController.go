// controllers/orderController.go
package controllers

import (
	db "book/config"
	"book/models"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var orderCollection *mongo.Collection

func InitializeOrderCollection() {
	if db.MongoClient == nil {
		fmt.Println("MongoClient is not initialized! Check the MongoDB connection.")
		return
	}
	bookCollection = db.MongoClient.Database("library").Collection("orders")
	fmt.Println("User collection initialized successfully!")
}

// GetOrder retrieves a single order by ID
func GetOrder(c *gin.Context) {
	id := c.Param("id")
	var order models.Order

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, _ := primitive.ObjectIDFromHex(id)
	err := orderCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&order)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	c.JSON(http.StatusOK, order)
}

// UpdateOrder updates an order (admin-only)
func UpdateOrder(c *gin.Context) {
	if userType, _ := c.Get("type"); userType != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	id := c.Param("id")
	var updatedOrder models.Order

	if err := c.ShouldBindJSON(&updatedOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, _ := primitive.ObjectIDFromHex(id)
	_, err := orderCollection.UpdateOne(ctx, bson.M{"_id": objID}, bson.M{"$set": updatedOrder})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update order"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order updated successfully"})
}

// DeleteOrder deletes an order (admin-only)
func DeleteOrder(c *gin.Context) {
	if userType, _ := c.Get("type"); userType != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	id := c.Param("id")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, _ := primitive.ObjectIDFromHex(id)
	_, err := orderCollection.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete order"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order deleted successfully"})
}
