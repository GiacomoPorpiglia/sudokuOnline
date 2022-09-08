import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Controller = () => {

    const navigate = useNavigate()
    // if jwtToken is expired, delete it
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('sudokuUser'))?.token
        if(token) {
            let decodedToken = jwtDecode(JSON.parse(localStorage.getItem('sudokuUser')).token)
            if(decodedToken.exp < Date.now()/1000) {
                localStorage.removeItem('sudokuUser')
                navigate('/auth')
            }
        }
    })

  return (
    <></>
  )
}

export default Controller