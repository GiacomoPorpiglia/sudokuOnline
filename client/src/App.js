import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Game from './components/Game'
import Home from './components/Home'
import BottomBanner from './components/BottomBanner'
import Landing from './components/Landing'
import Auth from './components/Auth'
import User from './components/UserProfile'
import Navbar from './components/Navbar/Navbar'
import Controller from './components/Controller'

const App = () => {
  
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize',  () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`); 
  })
  
  return (
    <>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Controller />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/home" element={<Home />}></Route>
            
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/myprofile" element={<User />} />
            {/* <Route path="/user/:username" element={<User />}></Route> */}
          </Routes>

          <BottomBanner />

        </BrowserRouter>

    </>
  );
}

export default App;
