package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	db "book/config"
	"book/controllers"

	"book/initializers"
	routes "book/routers"

	"github.com/gin-gonic/gin"

	"github.com/rs/cors"
)

func main() {
	// Load environment variables from .env file
	initializers.LoadVariabled()
	originAdminPanel := os.Getenv("originAdminPanel")
	originClientPanel := os.Getenv("originClientPanel")

	// Get the port from the .env file, default to 8080 if not set
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default to port 8080 if PORT is not set
	}

	// Connect to the database
	db.ConnectDB()
	initializers.LoadVariabled()
	controllers.InitializeUserCollection()
	controllers.InitializeBooksCollection()
	// controllers.InitializeOrderCollection()

	// Initialize Gin router
	router := gin.Default()

	// Set trusted proxies (for example, if running behind a load balancer)
	// err = router.SetTrustedProxies([]string{"127.0.0.1"}) // Replace with your proxy IP
	// if err != nil {
	// 	panic(err)
	// }

	// Serve static files (like images)
	router.Static("/uploads", "./uploads")

	// Set up CORS middleware
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{originAdminPanel, originClientPanel}, // Allow React frontend origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "User-ID"},
		AllowCredentials: true,
	})

	// Set up routes
	routes.InitRoutes(router)

	// Run the server with CORS handler, using the port from the .env file
	log.Printf("Server running on port %s", port)
	http.ListenAndServe(fmt.Sprintf(":%s", port), corsHandler.Handler(router))
}
