import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import LoginSignup from './Pages/LoginSignup/LoginSignup';
import Home from './Pages/Home/Home';
import GreenSpaceHub from './Pages/GreenSpaceHub/GreenSpaceHub';
import MySmartFarm from './Pages/MySmartFarm/MySmartFarm';
import About from './Pages/About/About';
import './App.css'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/loginsignup' element={<LoginSignup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/greenspace-hub' element={<GreenSpaceHub/>}/>
          <Route path='/my-smartfarm' element={<MySmartFarm/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
