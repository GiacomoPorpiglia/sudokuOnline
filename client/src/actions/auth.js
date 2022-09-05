import * as api from '../api'

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signin(formData) //jwt token
        dispatch({type:'AUTH', data})
        navigate('/home')
    } catch (error) {
        console.log(error.message);
    }
}
export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signup(formData) //jwt token
        dispatch({type:'AUTH', data})
        navigate('/home')
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAccount = (navigate) => async (dispatch) => {
    try {
        await api.deleteAccount()
        dispatch({type:'DELETE_ACCOUNT'})
        navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}