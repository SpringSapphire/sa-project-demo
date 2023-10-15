package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-project-demo.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&Dentist{},
		&Gender{},
		&Member{},
		&Occupation{},
	)

	db = database

	// Gender Data
	male := Gender{
		Name: "ชาย",
	}
	db.Model(&Gender{}).Create(&male)

	female := Gender{
		Name: "หญิง",
	}
	db.Model(&Gender{}).Create(&female)

	student := Occupation{
		Name: "นักเรียน",
	}
	db.Model(&Occupation{}).Create(&student)

	teacher := Occupation{
		Name: "ครู",
	}
	db.Model(&Occupation{}).Create(&teacher)

	worker := Occupation{
		Name: "คนงาน",
	}
	db.Model(&Occupation{}).Create(&worker)

	gardener := Occupation{
		Name: "คนสวน",
	}
	db.Model(&Occupation{}).Create(&gardener)

	freelancer := Occupation{
		Name: "ฟรีแลนซ์",
	}
	db.Model(&Occupation{}).Create(&freelancer)
}
