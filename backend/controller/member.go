package controller

import (
	"net/http"

	"github.com/SpringSapphire/sa-project-demo/entity"
	"github.com/gin-gonic/gin"
)

// PORT /members
func CreateMember(c *gin.Context) {
	var member entity.Member
	var gender entity.Gender
	var occupation entity.Occupation

	// bind เข้าตัวแปร members
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// ค้นหา occupation ด้วย id
	if tx := entity.DB().Where("id = ?", member.OccupationID).First(&occupation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "occupation not found"})
		return
	}

	//สร้าง member
	m := entity.Member{
		Gender:       gender,
		Occupation:   occupation,
		Username:     member.Username,
		Password:     member.Password,
		Firstname:    member.Firstname,
		Lastname:     member.Lastname,
		Email:        member.Email,
		Bod:          member.Bod,
		Phone_number: member.Phone_number,
	}
	// บันทึก
	if err := entity.DB().Create(&m).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": m})
}

// GET /member/:username
func GetMember(c *gin.Context) {
	var members entity.Member
	username := c.Param("username")
	if err := entity.DB().Preload("Gender").Preload("Occupation").Raw("SELECT * FROM members WHERE username = ?", username).Find(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": members})
}

// GET / members
func ListMembers(c *gin.Context) {
	var members []entity.Member
	if err := entity.DB().Preload("Gender").Preload("Occupation").Raw("SELECT * FROM members").Find(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": members})
}

// DELETE /members/:username
func DeleteMember(c *gin.Context) {
	username := c.Param("username")
	if tx := entity.DB().Exec("DELETE FROM members WHERE username = ?", username); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": username})
}

// PATCH /members
func UpdateMember(c *gin.Context) {
	var member entity.Member
	var result entity.Member

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา member ด้วย username
	if tx := entity.DB().Where("username = ?", member.Username).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}
