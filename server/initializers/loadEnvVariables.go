package initializers

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadVariabled() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
