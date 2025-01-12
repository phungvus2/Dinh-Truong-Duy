package Logic

import (
	"net/http"
	"wan-api-kol-event/DTO"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// * Get Kols from the database based on the range of pageIndex and pageSize
// ! USE GORM TO QUERY THE DATABASE
// ? There are some support function that can be access in Utils folder (/BE/Utils)
// --------------------------------------------------------------------------------
// @params: pageIndex
// @params: pageSize
// @return: List of KOLs and error message
func GetKolLogic(limit int64, page int64, db *gorm.DB, context *gin.Context) ([]*DTO.KolDTO, error) {

	var result []*DTO.KolDTO

	db = db.Where("Active = true")
	if err := db.Offset((int(page-1) * int(limit))).Limit(int(limit)).Find(&result).Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return nil, err
	}

	return result, nil
}
