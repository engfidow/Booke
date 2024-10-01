package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoClient is a global MongoDB client
var MongoClient *mongo.Client

// ConnectDB establishes a connection to MongoDB
func ConnectDB() *mongo.Client {
	// Set client options and connect to MongoDB
	clientOptions := options.Client().ApplyURI("mongodb+srv://golang:ZYmNTBZIel9in0H7@golangone.tlo7a.mongodb.net/?retryWrites=true&w=majority&appName=golangone")

	// Create a new MongoDB client
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatalf("Failed to create MongoDB client: %v", err)
	}

	// Create a context with a timeout for connecting
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Connect the client
	err = client.Connect(ctx)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Test the connection by pinging MongoDB
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	log.Println("Connected to MongoDB successfully")
	MongoClient = client
	return client
}
