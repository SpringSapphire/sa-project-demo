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
		Gender:     gender,
		Occupation: occupation,
		UserName:   member.UserName,
		PassWord:   member.PassWord,
		FirstName:  member.FirstName,
		LastName:   member.LastName,
		Email:      member.Email,
		Birthday:   member.Birthday,
		Phone:      member.Phone,
		Profile:    member.Profile,
	}
	// บันทึก
	if err := entity.DB().Create(&m).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": m})
}

// GET /member/:id
func GetMember(c *gin.Context) {
	var members entity.Member
	id := c.Param("id")
	if err := entity.DB().Preload("Gender").Preload("Occupation").Raw("SELECT * FROM members WHERE id = ?", id).Find(&members).Error; err != nil {
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

// DELETE /members/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /members
func UpdateMember(c *gin.Context) {
	var member entity.Member
	var result entity.Member

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", member.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}
