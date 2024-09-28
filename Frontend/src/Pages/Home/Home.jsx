import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Homeleft from '../../Components/homeLeft/homeleft'
import HomeMiddle from '../../Components/homeMiddle/homeMiddle'
import HomeRight from '../../Components/homeRight/homeRight'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='home'>
        {/* <div className="homeLeft-main"></div> */}
        <div className="homeMiddle-main"><HomeMiddle/></div>
        <div className="homeRight-main"><HomeRight/><Homeleft/></div>
      </div>
    </div>
  )
}

export default Home
