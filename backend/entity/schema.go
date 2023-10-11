package entity

import (
	"gorm.io/gorm"
)

type Dentist struct {
	gorm.Model
	UserName  string `gorm:"unique:uniqueIndex"`
	PassWord  string `gorm:"unique:uniqueIndex"`
	FirstName string
	LastName  string
	Email     string
	Birthday  string
	Phone     string
	Profile   string `gorm:"type:longtext"`

	GenderID *uint
	Gender   Gender `gorm:"reference:id"`
}

type Gender struct {
	gorm.Model
	GenderName string    `gorm:"unique:uniqueIndex"`
	Member     []Member  `gorm:"foreignkey:GenderID"`
	Dentist    []Dentist `gorm:"foreignkey:GenderID"`
}

type Member struct {
	gorm.Model
	UserName  string `gorm:"unique:uniqueIndex"`
	PassWord  string `gorm:"unique:uniqueIndex"`
	FirstName string
	LastName  string
	Email     string
	Birthday  string
	Phone     string
	Profile   string `gorm:"type:longtext"`

	GenderID     *uint
	Gender       Gender `gorm:"reference:id"`
	OccupationID *uint
	Occupation   Occupation `gorm:"reference:id"`
}

type Occupation struct {
	gorm.Model
	OccupationName string   `gorm:"unique:uniqueIndex"`
	Member         []Member `gorm:"foreignkey:OccupationID"`
}
