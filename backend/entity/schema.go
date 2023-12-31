package entity

import (
	"gorm.io/gorm"
)

type Dentist struct {
	gorm.Model
	Username     string `gorm:"unique:uniqueIndex"`
	Password     string `gorm:"unique:uniqueIndex"`
	FirstName    string
	LastName     string
	Email        string
	Birthday     string
	Phone_number string

	AdminID  *uint
	Admin    Admin `gorm:"reference:id"`
	GenderID *uint
	Gender   Gender `gorm:"reference:id"`
}

type Gender struct {
	gorm.Model
	Name    string    `gorm:"unique:uniqueIndex"`
	Member  []Member  `gorm:"foreignkey:GenderID"`
	Dentist []Dentist `gorm:"foreignkey:GenderID"`
}

type Member struct {
	gorm.Model
	Username     string `gorm:"unique:uniqueIndex"`
	Password     string `gorm:"unique:uniqueIndex"`
	FirstName    string
	LastName     string
	Email        string
	Birthday     string
	Phone_number string

	AdminID      *uint
	Admin        Admin `gorm:"reference:id"`
	GenderID     *uint
	Gender       Gender `gorm:"reference:id"`
	OccupationID *uint
	Occupation   Occupation `gorm:"reference:id"`
}

type Occupation struct {
	gorm.Model
	Name   string   `gorm:"unique:uniqueIndex"`
	Member []Member `gorm:"foreignkey:OccupationID"`
}

type Admin struct {
	gorm.Model
	Username  string `gorm:"unique:uniqueIndex"`
	Password  string `gorm:"unique:uniqueIndex"`
	FirstName string
	LastName  string
	Email     string

	Member  []Member  `gorm:"foreignkey:AdminID"`
	Dentist []Dentist `gorm:"foreignkey:AdminID"`
}
