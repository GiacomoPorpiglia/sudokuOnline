import * as api from '../api'

export const getSudoku =  (mode) => async (dispatch) => {

    try {
        const {data} = await api.getSudoku(mode)

        //console.log(data);
        dispatch({type:'GET_SUDOKU', data: {...data, mode}}) // the mode is passed in the sudoku to implement correctly the Sudoku saving in the sessionStorage
    } catch (error) {
        console.log(error)
    }
}

export const updateStatistics = (data) => async (dispatch) => {
    try {
        await api.updateStatistics(data)
    } catch (error) {
        console.log(error.message);
    }
}
