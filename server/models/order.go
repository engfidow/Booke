// models/order.go
package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserID   primitive.ObjectID `bson:"user_id" json:"user_id"`
	BookID   primitive.ObjectID `bson:"book_id" json:"book_id"`
	Quantity int                `json:"quantity" bson:"quantity"`
	Total    float64            `json:"total" bson:"total"`
	Date     time.Time          `json:"date" bson:"date"`
}
