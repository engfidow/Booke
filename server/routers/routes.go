// routes/routes.go
package routes

import (
	"book/controllers"
	"book/middlewares"

	"github.com/gin-gonic/gin"
)

func InitRoutes(router *gin.Engine) {
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)
	router.GET("/books", controllers.GetAllBooks)

	authorized := router.Group("/")
	authorized.Use(middlewares.AuthMiddleware())
	{
		// User routes
		// authorized.GET("/users", controllers.GetAllUsers)
		// authorized.GET("/users/:id", controllers.GetUser)
		// authorized.PUT("/users/:id", controllers.UpdateUser)
		// authorized.DELETE("/users/:id", controllers.DeleteUser)

		// Book routes
		authorized.POST("/books", controllers.AddBook)

		authorized.GET("/books/:id", controllers.GetBook)
		authorized.PUT("/books/:id", controllers.UpdateBook)
		authorized.DELETE("/books/:id", controllers.DeleteBook)

		// Order routes
		authorized.GET("/orders/:id", controllers.GetOrder)
		authorized.PUT("/orders/:id", controllers.UpdateOrder)
		authorized.DELETE("/orders/:id", controllers.DeleteOrder)
	}
}
