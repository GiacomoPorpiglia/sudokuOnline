import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import '../css/index.css'

const Home = () => {

    const navigate = useNavigate()

    //0 = easy, 1 = medium, 2 = hard, 3 = extreme
    const modes = ["easy", "medium", "hard", "extreme"]
    const modeColors = [
        "rgb(0, 174, 239)", // easy
        "rgb(255, 200, 0)", // medium
        "red", //hard
        "black" //extreme
    ]

    const [mode, setMode] = useState(0)
    
    let resumeMode = JSON.parse(sessionStorage.getItem('currentSudoku'))?.mode
    // let resumeModeIdx
    // resumeMode == "easy" ? resumeModeIdx = 0 : resumeMode == "medium" ? resumeModeIdx=1 : resumeMode=="hard" ? resumeModeIdx=2 : resumeModeIdx=3

    const changeMode = () => {
        setMode((prev) => ((prev+1) % modes.length))
    }

    const handleResumeButton = () => {
        let mode = JSON.parse(sessionStorage.currentSudoku).mode
        console.log(mode);
        navigate('/game?mode=' + mode)
    }

    const handlePlayButton = () => {
        sessionStorage.removeItem('currentSudoku')
        navigate('/game?mode=' + modes[mode])
    }


  return (
        <>
            <Navbar />
            <div className="main">
                <div className="screen">
                    <div className="center-view active">
                        {/* <input type="text" placeholder="Your name" maxLength="11" className="input-name" id="input-name"></input> */}
                        <div className="btn" style={{backgroundColor: modeColors[mode]}} id="btn-level" onClick={changeMode}>
                            Mode: {modes[mode]}
                        </div>
                        <div className="btn" style={{backgroundColor: modeColors[mode]}} id="btn-play" onClick={handlePlayButton}>Play!</div>
                        {
                        sessionStorage.getItem('currentSudoku') ? (    
                            <div className="btn" id="btn-play" onClick={handleResumeButton}>{'Resume (' + resumeMode + ')'}</div>
                        ) : (
                            <></>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
  )
}

export default Home