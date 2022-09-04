import * as api from '../api'

export const getMyStatistics = () => async (dispatch) => {
    try {
        const {data} = await api.getMyStatistics()
        dispatch({type:'GET_MY_STATISTICS', data})
    } catch (error) {
        console.log(error.message);
    }
}