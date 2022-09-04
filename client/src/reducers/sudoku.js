const sudokuReducer = (sudoku = [], action) => {
    switch (action.type) {
        case "GET_SUDOKU":
            sessionStorage.setItem('currentSudoku', JSON.stringify(action?.data)) // save sudoku in sessionStorage
            return action?.data
        case "UPDATE_SUDOKU":
            let newGridToBeFilled = sudoku["gridToBeFilled"]
            newGridToBeFilled[action?.data?.row][action?.data?.col] = action?.data?.number
            sessionStorage.setItem('currentSudoku', JSON.stringify( {...sudoku, gridToBeFilled: newGridToBeFilled})) // update sudoku in sessionStorage with the new gridToBeFilled
            return {...sudoku, gridToBeFilled: newGridToBeFilled}
        case "SET_SUDOKU":        
            let newSudoku = action?.data
            return {...newSudoku}
        default:
            return sudoku
    }
}

export default sudokuReducer