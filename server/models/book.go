// models/book.go
package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Book represents the structure of a book in the MongoDB collection
type Book struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Title         string             `json:"title" bson:"title"`
	Author        string             `json:"author" bson:"author"`
	Description   string             `json:"description" bson:"description"`
	Price         float64            `json:"price" bson:"price"`
	ImageURL      string             `json:"image_url,omitempty" bson:"image_url,omitempty"`
	PDFURL        string             `json:"pdf_url,omitempty" bson:"pdf_url,omitempty"`
	PublishedDate string             `json:"published_date" bson:"published_date"`
	UserID        primitive.ObjectID `json:"user_id" bson:"user_id"` // Add UserID to link books to a user
}
