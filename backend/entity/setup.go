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
		GenderName: "ชาย",
	}
	db.Model(&Gender{}).Create(&male)

	female := Gender{
		GenderName: "หญิง",
	}
	db.Model(&Gender{}).Create(&female)

	student := Occupation{
		OccupationName: "นักเรียน",
	}
	db.Model(&Occupation{}).Create(&student)

	teacher := Occupation{
		OccupationName: "ครู",
	}
	db.Model(&Occupation{}).Create(&teacher)

	worker := Occupation{
		OccupationName: "คนงาน",
	}
	db.Model(&Occupation{}).Create(&worker)

	gardener := Occupation{
		OccupationName: "คนสวน",
	}
	db.Model(&Occupation{}).Create(&gardener)

	freelancer := Occupation{
		OccupationName: "ฟรีแลนซ์",
	}
	db.Model(&Occupation{}).Create(&freelancer)
}
