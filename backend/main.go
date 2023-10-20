package main

import (
	"github.com/SpringSapphire/sa-project-demo/controller"
	"github.com/SpringSapphire/sa-project-demo/entity"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	//Dentists Routes
	r.GET("/dentists", controller.ListDentists)
	r.GET("/dentist/:id", controller.GetDentist)
	r.POST("/dentists", controller.CreateDentist)
	r.PATCH("/dentists", controller.UpdateDentist)
	r.DELETE("/dentists/:id", controller.DeleteDentist)

	//Member Routes
	r.GET("/members", controller.ListMembers)
	r.GET("/member/:id", controller.GetMember)
	r.POST("/members", controller.CreateMember)
	r.PATCH("/members", controller.UpdateMember)
	r.DELETE("/members/:id", controller.DeleteMember)

	//Occupations Routes
	r.GET("/occupations", controller.ListOccupations)

	//Genders Routes
	r.GET("/genders", controller.ListGenders)

	//Admins Routes
	r.GET("/admin", controller.GetAdmin)
	//Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
