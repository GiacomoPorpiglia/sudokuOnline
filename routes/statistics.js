const { updateMyStatistics, getMyStatistics } = require("../controllers/statistics")
const {jwtAuth} = require("../middleware/jwtAuth")

const express = require('express')
const router = express.Router()


router.patch('/myStatistics', jwtAuth, updateMyStatistics)
router.get('/myStatistics', jwtAuth, getMyStatistics)

module.exports = router