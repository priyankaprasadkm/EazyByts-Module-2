import React, { useEffect,useState } from 'react'
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsFillPersonFill, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs'
  import { Link } from "react-router-dom"; 

  import { RiDashboardLine } from 'react-icons/ri';         // Alternative for Dashboard
  import { RiFolderLine } from 'react-icons/ri';            // Alternative for Assets
  import { AiOutlineBarChart } from 'react-icons/ai';        // Alternative for Insights
  import { FiTrendingUp } from 'react-icons/fi';             // Alternative for Analytics
  import { RiPulseLine } from 'react-icons/ri';              // Alternative for Performance
  import { RiUserFill } from 'react-icons/ri';               // Alternative for Profile
  import { RiSettings3Fill } from 'react-icons/ri';          // Alternative for Settings
import profilePic from './assets/profile.png';
import {FiMenu} from 'react-icons/fi';
// import StockTable from './StockTable';


function Sidebar({ openSidebarToggle, OpenSidebar }) {

  const [isOpen, setIsOpen] = useState(true); // Sidebar should be open by default

  // Automatically hide the sidebar when screen width is small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check size on first render

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ FIXED: Only one function definition
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // Toggle sidebar state
  };


  return (
    <>
     {/* Hamburger Menu Icon */}
     <div className="menu-icon" onClick={toggleSidebar}><FiMenu /></div>

     {/*Sidebar*/}
    <aside id="sidebar" className={isOpen ? "sidebar-responsive" : "sidebar"}>
    <div className='sidebar-title'>
          <span className='icon close_icon' onClick={toggleSidebar}>X</span>
        </div>
      

      {/*User Profile*/}
      <div className='sidebar-profile'>
        <img src={profilePic} alt="User Profile" className='profile-picture'/>
        <p className='profile-name'>John Snow</p>
      </div>
      
      <ul className='sidebar-list'>
        {/* <li className='sidebar-list-item'><a href=""><RiDashboardLine  className='icon'/> Dashboard</a></li> */}
        {/* <li className='sidebar-list-item'><a href=""><RiFolderLine  className='icon'/>Assets</a></li> */}
        <li className="sidebar-list-item">
        <Link to="/Home" className="flex items-center text-white hover:text-gray-300">
          <RiFolderLine className="icon" />
          Dashboard
        </Link>
      </li>
        <li className="sidebar-list-item">
        <Link to="/StockTable" className="flex items-center text-white hover:text-gray-300">
          <RiFolderLine className="icon" />
          Assets
        </Link>
      </li>
        <li className='sidebar-list-item'><a href=""><AiOutlineBarChart  className='icon'/>Insights</a></li>
        <li className='sidebar-list-item'><a href=""><FiTrendingUp  className='icon'/> Analytics</a></li>
        <li className='sidebar-list-item'><a href=""><RiPulseLine  className='icon'/>Performance</a></li>
        <li className='sidebar-list-item'><a href=""><RiUserFill  className='icon'/> Profile</a></li>
        <li className='sidebar-list-item'><a href=""><RiSettings3Fill  className='icon'/> Settings</a></li>
      </ul>
    </aside>
    </>
  );
}

export default Sidebar;