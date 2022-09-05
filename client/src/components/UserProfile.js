import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyStatistics } from '../actions/myStatistics'
import { deleteAccount } from '../actions/auth'
import jwtDecode from 'jwt-decode'

import Navbar from './Navbar/Navbar'


const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [sureToDelete, setSureToDelete] = useState(false)

    const [username, setUsername] = useState("")

    const handleSureToDelete = () => {
        setSureToDelete((prev) => !prev)
    }

    const logout = () => {
        dispatch({type: 'LOGOUT'})

        if(!localStorage.getItem('sudokuUser'))
            navigate('/')
    }  

    const handleDeleteAccount = () => {
        dispatch(deleteAccount(navigate))
    }

    useEffect(() => {

        if(!localStorage.getItem('sudokuUser'))
            navigate('/auth')
        else
            dispatch(getMyStatistics())
            //get username from jwt
            let decodedToken = jwtDecode(JSON.parse(localStorage.getItem('sudokuUser')).token)
            setUsername(decodedToken?.username)
    }, [dispatch])

    
    const myStatistics = useSelector((state) => state.myStatistics)


  return (
    <>
        <Navbar />
        <div className='main'>
            <div className='screen'>
                <div className='center-view active'>
                    <h1 id="statisticsUsername">{username}</h1>

                    {myStatistics ? (
                        <>
                        <p className='easy-color-text'>Easy grids completed: {myStatistics[0]}</p>
                        <p className='medium-color-text'>Medium grids completed: {myStatistics[1]}</p>
                        <p className='hard-color-text'>Hard grids completed: {myStatistics[2]}</p>
                        <p className='extreme-color-text'>Extreme grids completed: {myStatistics[3]}</p>
                        </>
                    ) : (<></>)}
                    <button className='btn btn-logout' onClick={logout}>Logout</button>

                    <button className='btn btn-delete' onClick={handleSureToDelete}>Delete my account</button>
                </div>

                { sureToDelete ?
                (
                    <>
                    <div className='opacity-popup'></div>
                        <div id="sureToDeleteAccount">
                            <h2>We are sorry you want to go...</h2>
                            <p>Are you sure you want to delete your account?</p>
                            <div id="deleteAccountButtonsContainer">
                                <button id="yesDeleteAccountButton" onClick={handleDeleteAccount}>Yes</button>
                                <button id="noDeleteAccountButton" onClick={handleSureToDelete}>No</button>
                            </div>
                        </div>
                    </>
                ) : (<></>)
                }
            </div>
        </div>
    </>
  )
}

export default User