import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMyStatistics } from '../actions/myStatistics'
import Navbar from './Navbar/Navbar'

const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch({type: 'LOGOUT'})

        if(!localStorage.getItem('sudokuUser'))
            navigate('/')
    }

    useEffect(() => {

        if(!localStorage.getItem('sudokuUser'))
            navigate('/auth')
        else
            dispatch(getMyStatistics())
    }, [dispatch])

    
    const myStatistics = useSelector((state) => state.myStatistics)


  return (
    <>
        <Navbar />
        <div className='main'>
            <div className='screen'>
                <div className='center-view active'>
                    {myStatistics ? (
                        <>
                        <p className='easy-color-text'>Easy grids completed: {myStatistics[0]}</p>
                        <p className='medium-color-text'>Medium grids completed: {myStatistics[1]}</p>
                        <p className='hard-color-text'>Hard grids completed: {myStatistics[2]}</p>
                        <p className='extreme-color-text'>Extreme grids completed: {myStatistics[3]}</p>
                        </>
                    ) : (<></>)}
                    <button className='btn btn-logout' onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default User