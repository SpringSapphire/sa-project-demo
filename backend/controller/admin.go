package controller

import (
	"net/http"

	"github.com/SpringSapphire/sa-project-demo/entity"
	"github.com/gin-gonic/gin"
)

// GET /admin
func GetAdmin(c *gin.Context) {
	var Admin []entity.Admin
	if err := entity.DB().Raw("SELECT * FROM admins").Scan(&Admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Admin})
}
