import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs'

function Header({ OpenSidebar }) {
  return (
    <header className='header'>
      {/* Sidebar Toggle Button */}
      <div className='menu-icon'>
        <BsJustify className='header-icon' onClick={OpenSidebar} />
      </div>

      {/* Search Bar */}
      <div className='search-bar'>
        <BsSearch className='search-icon' />
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      {/* Right Side Icons */}
      <div className='header-right'>
        <BsFillBellFill className='header-icon' />
        <BsFillEnvelopeFill className='header-icon' />
      </div>
    </header>
  )
}

export default Header