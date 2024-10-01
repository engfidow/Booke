package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name     string             `json:"name" bson:"name"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
	Type     string             `json:"type" bson:"type"`                     // "user" or "admin"
	ImageURL string             `json:"image_url" bson:"image_url,omitempty"` // Optional field for image URL
}
