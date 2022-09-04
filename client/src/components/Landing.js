import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

const Landing = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('sudokuUser')) {
            navigate('/home')
        }
    }, [])

  return (
    <>
        <Navbar />
        <div className='main'>
            <div className='screen'>
                <div className='center-view active'>
                    <button className='btn btn-blue' onClick={() => navigate('/auth')}>Login</button>
                    <div>or</div>
                    <button className='btn btn-blue' onClick={() => navigate('/home')}>Play as guest</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Landing