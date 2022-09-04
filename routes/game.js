const express = require("express")
const router = express.Router()

const {getSudokuGrid} = require('../controllers/generateSudoku.js')

router.get('/', getSudokuGrid)

module.exports = router