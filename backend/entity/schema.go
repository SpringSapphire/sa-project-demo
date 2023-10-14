package entity

import (
	"gorm.io/gorm"
)

type Dentist struct {
	gorm.Model
	Username     string `gorm:"unique:uniqueIndex"`
	Password     string `gorm:"unique:uniqueIndex"`
	Firstname    string
	Lastname     string
	Email        string
	Bod          string
	Phone_number string

	GenderID *uint
	Gender   Gender `gorm:"reference:id"`
}

type Gender struct {
	gorm.Model
	Gender_name string    `gorm:"unique:uniqueIndex"`
	Member      []Member  `gorm:"foreignkey:GenderID"`
	Dentist     []Dentist `gorm:"foreignkey:GenderID"`
}

type Member struct {
	gorm.Model
	Username     string `gorm:"unique:uniqueIndex"`
	Password     string `gorm:"unique:uniqueIndex"`
	Firstname    string
	Lastname     string
	Email        string
	Bod          string
	Phone_number string

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
