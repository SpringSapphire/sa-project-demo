package controller

import (
	"net/http"

	"github.com/SpringSapphire/sa-project-demo/entity"
	"github.com/gin-gonic/gin"
)

// PORT /dentists
func CreateDentist(c *gin.Context) {
	var dentist entity.Dentist
	var gender entity.Gender
	var admin entity.Admin

	if err := c.ShouldBindJSON(&dentist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", dentist.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", dentist.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	//สร้าง dentist
	d := entity.Dentist{
		Gender:       gender,
		Admin:        admin,
		Username:     dentist.Username,
		Password:     dentist.Password,
		FirstName:    dentist.FirstName,
		LastName:     dentist.LastName,
		Email:        dentist.Email,
		Birthday:     dentist.Birthday,
		Phone_number: dentist.Phone_number,
	}
	// บันทึก
	if err := entity.DB().Create(&d).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": d})
}

// GET /dentist/:username
func GetDentist(c *gin.Context) {
	var dentist entity.Dentist
	username := c.Param("username")
	if err := entity.DB().Preload("Gender").Raw("SELECT * FROM dentists WHERE username = ?", username).Find(&dentist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dentist})
}

// GET / dentists
func ListDentists(c *gin.Context) {
	var dentists []entity.Dentist
	if err := entity.DB().Preload("Gender").Raw("SELECT * FROM dentists").Find(&dentists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dentists})
}

// DELETE /dentists/:id
func DeleteDentist(c *gin.Context) {
	username := c.Param("username")
	if tx := entity.DB().Exec("DELETE FROM dentists WHERE username = ?", username); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": username})
}

// PATCH /dentists
func UpdateDentist(c *gin.Context) {
	var dentist entity.Dentist
	var result entity.Dentist

	if err := c.ShouldBindJSON(&dentist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา dentist ด้วย username
	if tx := entity.DB().Where("username = ?", dentist.Username).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&dentist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dentist})
}
