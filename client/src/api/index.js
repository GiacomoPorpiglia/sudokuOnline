import axios from 'axios'

const API  = axios.create({baseURL: "/api/v1"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('sudokuUser')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('sudokuUser')).token}`
    }
    return req
})

export const getSudoku = (mode) => API.get(`/game?mode=${mode}`)

export const signin = (formData) => API.post('/auth/signin', formData)
export const signup = (formData) => API.post('/auth/signup', formData)
export const deleteAccount = () => API.delete('/auth/deleteAccount')

export const updateStatistics = (data) => API.patch('statistics/myStatistics', data)
export const getMyStatistics = () => API.get('/statistics/myStatistics')