import * as api from '../api'

export const signin = (formData, navigate, setErrorHandler) => async (dispatch) => {
    try {
        const {data} = await api.signin(formData) //jwt token
        dispatch({type:'AUTH', data})
        navigate('/home')
    } catch (error) {
        setErrorHandler({hasError:true, message:error.response.data.message})
    }
}
export const signup = (formData, navigate, setErrorHandler) => async (dispatch) => {
    try {
        const {data} = await api.signup(formData) //jwt token
        dispatch({type:'AUTH', data})
        navigate('/home')
    } catch (error) {
        setErrorHandler({hasError:true, message:error.response.data.message})
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