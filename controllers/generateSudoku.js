const getSudokuGrid = (req, res) => {
    

    var size = 3 // size of the little squares ( the main grid will be 9x9 )
    var sudokuGrid = new Array(size*size) // main grid
    var availableNumbers = new Array(Math.pow(size, 4)) // availableNumbers to put in each cell

    const allNumbers = new Array(size*size).fill(0).map((elem, idx) => idx+1) // array with all possible numbers you can play with (if size == 3 allNUmbers will be [1, 2, 3, 4, 5, 6, 7, 8 , 9] )

    for(let i = 0; i < sudokuGrid.length; i++) {
        sudokuGrid[i] = Array(size*size).fill(0) // initialize every cell to 0 (means empty)
    }

    for(let i = 0; i < availableNumbers.length; i++) {
        availableNumbers[i] = allNumbers.slice() // every cell, at the beginning, could have every number in it
    }

    // const reset = () => {
    //     sudokuGrid = new Array((size*size))
    //     availableNumbers = new Array(Math.pow(size, 4))
    //     for(let i = 0; i < sudokuGrid.length; i++) {
    //         sudokuGrid[i] = Array((size*size)).fill(0)
    //     }

    //     for(let i = 0; i < availableNumbers.length; i++) {
    //         availableNumbers[i] = allNumbers.slice()
    //     }
    // }


    const createSudoku = (grid) => {

        //pos is defined as the numbers of the cells, like:
        //1  2  3  4
        //5  6  7  8
        //9  10 11 12
        //13 14 15 16
        let pos = 0

        while(pos < Math.pow(size, 4)) {

            let [row, col] = coordinatesOfPos(pos)

            if(availableNumbers[pos].length == 0 ) { // if no more numbers are available for the cell, then backtrack and reset the availableNumbers of that cell to allNumbers
                grid[row][col] = 0
                let av = allNumbers.slice()
                availableNumbers[pos] = av
                pos--
            }
            else { // if numbers are still availble for that cell

                let newNumber // number guess, that we check to be valid
                while(availableNumbers[pos].length > 0) {
                    newNumber = availableNumbers[pos][Math.floor(Math.random() * availableNumbers[pos].length)] // pick a random available number, and check if it is valid in the grid
                    if(numberIsValid(pos, newNumber, grid)) {
                        break
                    } else { // if it's not valid, remove it from availablNumbers of that cell
                        numIndex = availableNumbers[pos].indexOf(newNumber)
                        availableNumbers[pos].splice(numIndex, 1)            
                    }
                    
                }
                
                if(availableNumbers[pos].length == 0) { 
                    // if no valid unmber is found, do nothing(the loop will restart and it will backtrack)
                } else {
                    grid[row][col] = newNumber // put the number in the grid

                    numIndex = availableNumbers[pos].indexOf(newNumber)
                    //DELETE THE NUMBER FROM AVAILABLE ONES (need to explicitly make a copy, delete from the copy and make the original array equal to the copy, otherwise there are bugs )
                    let av = availableNumbers[pos].slice()
                    av.splice(numIndex, 1)
                    availableNumbers[pos] = av

                    pos++
                }
            }

        }
        return grid  
    }

    //returns row and col of each cell (numbered from 0 to size^4 - 1 )
    const coordinatesOfPos = (pos) => {
        return [Math.floor(pos/(size*size)), pos % (size*size)] // [row, col]
    }

    //check if the number inserted breaks any rules (returns true if it doesn't break any)
    const numberIsValid = (pos, num, grid) => {
        let [row, col] = coordinatesOfPos(pos)
        for(let i = 0; i < size*size; i++) {
            
            if(i != col && grid[row][i] == num) {
                return false
            } 
            if(i!= row && grid[i][col] == num) {
                return false
            }
        }

        //can be 2, 5 or 8 (top left cell's coordinates)
        let squareCol = Math.floor(col / size) * size
        let squareRow = Math.floor(row / size) * size

        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                
                let tempRow = (squareRow) + i
                let tempCol = (squareCol) + j
                if (tempRow != row || tempCol != col) {
                    if(grid[tempRow][tempCol] == num) {
                        return false
                    }
                }
            }
        }
        // console.log(num,"is valid at position", [row, col] );
        return true
    }


    //!!!!!!!!!!!!!!!!!!!!!!! First value to return 
    //COMPLETE GRID, WITH ALL NUMBERS FILLED
    sudokuGrid = createSudoku(sudokuGrid)

    //DECIDE NUMBER OF CELlS TO BE EMPTIED BASED ON THE DIFFICULTY CHOSEN BY THE USER; PASSED AS A QUEY PARAM
    const calculateNumbersToDelete = () => {
        switch (req.query.mode) {
            case "easy":
                return Math.floor(Math.random()*8 + 40)
            case "medium":
                return Math.floor(Math.random()*5 + 45)
            case "hard":
                return Math.floor(Math.random()*5 + 50)
            case "extreme":
                return Math.floor(Math.random()*5 + 55)
            default:
                return Math.floor(Math.random()*8 + 40) //as if it was easy
            }
    }

    //NOW WE USE BACKTRACKING AGAIN TO DELETE SOME NUMBERS, BUT MAKING SURE THAT THE SOLUTION TO THE SUDOKU REMAINS UNIQUE

    var solutionsCount = {
        val: 0
    }


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    


    const createGridWithBlanks = (completeSudoku) => {

        let numbersToDelete = calculateNumbersToDelete()

        var gridWithBlanks = new Array(size*size)
        // at the beginning it will be equal to the complete grid, and numbers will gradually be deleted from it 
        for(let i = 0; i < size*size; i++) {
            gridWithBlanks[i] = new Array(size*size)
            for(let j = 0; j < size*size; j++) {
                gridWithBlanks[i][j] = completeSudoku[i][j]
            }
        }

        var shuffledPositions = new Array(Math.pow(size, 4)).fill(0).map((elem, idx) => idx) //order of the cells that will be checked to delete numbers from them
        shuffleArray(shuffledPositions)

        let k = 0
        let deletedNumbers = 0 // count of deleted numbers

        while(k < Math.pow(size, 4) && deletedNumbers < numbersToDelete) {

            let [row, col] = coordinatesOfPos(shuffledPositions[k])
            let prevNum = gridWithBlanks[row][col]
            gridWithBlanks[row][col] = 0

            solveIsUnique(gridWithBlanks)

            if(solutionsCount.val  < 2) { // if solutoin is still unique, do nothing(the number already got deleted)
                deletedNumbers++
            } else { // if solution isn't unique, restore the number that got deleted in the grid
                gridWithBlanks[row][col] = prevNum  
            }
            solutionsCount.val = 0
            k++
        }
        return gridWithBlanks
    }

    //calculates number of solutions of a grid (stores this value in solutionsCount.val)
    const solveIsUnique = (grid) => {

        let length = size*size

        for(let i = 0; i < length; i++) {
            for(let j = 0; j < length; j++) {
                if(grid[i][j] == 0) {
                    for(let num = 1; num <= 9; num++) {
                        if(numberIsValid(i*length + j, num, grid) && solutionsCount.val < 2) {
                            //IF IT'S A VALID NUMBER, PUT IT IN THE GRID, AND RUN THE SOLVE AGAIN WITH THE NUMBER INSERTED
                            grid[i][j] = num
                            solveIsUnique(grid)

                            grid[i][j] = 0
                        }
                    }
                    //If no valid numbers are found for the empty cell, backtrack
                    return
                }
            }
        }
        solutionsCount.val++
    }

    //!!!!!!!!!!!!!!!!!!!!!!! Second value to return 
    gridWithBlanks = createGridWithBlanks(sudokuGrid)

    //grid: complete grid ------ gridWithBlanks: grid with blanks that will remain so, in order to have the numbers that can't be deleted by the user ------ gridToBeFilled: grid that will be filled by the user
    res.status(200).json({grid: sudokuGrid, gridWithBlanks, gridToBeFilled: gridWithBlanks})
}



module.exports = {
    getSudokuGrid
}