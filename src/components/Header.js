import React from 'react'
import { Link } from 'react-router-dom'
import keyboardlogo from "../keyboardlogo.png"

export default function Header() {
  return (
    <div className='header'>
      <Link className="header-link" to="/"><h3 className='header-name'>KeyBoardGame</h3></Link>
      <img className='header-logo' src={keyboardlogo} />
      <nav className='header-nav'>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/leader-board">LeaderBoard</Link>
      </nav>
    </div>
  )
}
