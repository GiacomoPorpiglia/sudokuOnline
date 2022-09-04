import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const Navbar = () => {


  const navigate = useNavigate()

  const returnHome = () => {
    navigate('/')
  }

  const seeProfile = () => {
    navigate('/myprofile')
  }

  //If user tries to change its username from localStorage, set it back to the correct one, the one stored in the jwt-token
  const getUsername = () => {
    if(localStorage.getItem('sudokuUser')) {
          let token = JSON.parse(localStorage.getItem('sudokuUser')).token
          return jwtDecode(token).username
        }
      return undefined
  }


  return (  
    <nav>
        <div className="nav-container">
            <a href="#" className="nav-logo">
              {getUsername() ? `Welcome, ${getUsername()}`  : "Welcome to Sudoku online!"}
            </a>
            <div style={{display: 'flex'}}>
              {
                localStorage.getItem('sudokuUser') ? (
                  <img src={require("./userIcon.png")} alt="user" id="userLogo" onClick={seeProfile}></img>
                ) : (
                  <></>
                )
              }
              <img src={require("./homeIcon.jpg")} alt="home" id="homeLogo" onClick={returnHome}></img>
            </div>

        </div>
    </nav>
  )
}

export default Navbar