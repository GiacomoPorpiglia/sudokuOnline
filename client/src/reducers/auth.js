const authReducer =(auth = {}, action) => {
    switch (action.type) {
        case 'AUTH':
            //stores the jwt in localStorage as "sudokuUser"
            localStorage.setItem('sudokuUser', JSON.stringify(action?.data))
            return action?.data
        case 'LOGOUT':
            localStorage.removeItem('sudokuUser')
            sessionStorage.removeItem('currentSudoku') // it is the previous unfinished sudoku, but if you logout you can't access it anymore, since it is a private property of the user
            return auth
        case 'DELETE_ACCOUNT':
            localStorage.removeItem('sudokuUser')
            sessionStorage.removeItem('currentSudoku')
            return auth
        default:
            return auth
    }
}

export default authReducer