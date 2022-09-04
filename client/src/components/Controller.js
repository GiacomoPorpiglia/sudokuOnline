import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'

const Controller = () => {

    // if jwtToken is expired, delete it
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('sudokuUser'))?.token
        if(token) {
            let decodedToken = jwtDecode(JSON.parse(localStorage.getItem('sudokuUser')).token)
            if(decodedToken.exp < Date.now()/1000) {
                localStorage.removeItem('sudokuUser')
            }
        }
    })

  return (
    <></>
  )
}

export default Controller