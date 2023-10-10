package controller

import (
	"net/http"

	"github.com/SpringSapphire/sa-project-demo/entity"
	"github.com/gin-gonic/gin"
)

// GET /occupations
func ListOccupations(c *gin.Context) {
	var occupations []entity.Occupation
	if err := entity.DB().Raw("SELECT * FROM occupations").Scan(&occupations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": occupations})
}
