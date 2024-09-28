import React from 'react'
import './GreenSpaceHub.css'
import Navbar from '../../Components/Navbar/Navbar'
import GreenspaceLeft from '../../Components/GreenspaceLeft/GreenspaceLeft'
import GreenspaceRight from '../../Components/GreenspaceRight/GreenspaceRight'
const GreenSpaceHub = () => {
  return (
    <div>
      <Navbar/>
      <div className="greenSpace">
      <div className="greenSpaceLeft"><GreenspaceLeft/></div>
      <div className="greenSpaceRight"><GreenspaceRight/></div>
      </div>
    </div>
  )
}

export default GreenSpaceHub
