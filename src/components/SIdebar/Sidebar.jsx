import React from 'react'
import './Sidebar.css'
import images from '../../utils/Images'
import NavLink from '@/components/NavLink/NavLink';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';

const Sidebar = () => {
  const location = useLocation();
  const isActive = location.pathname === '/profile';
  return (
    <>
      <div className="sidebar desktop-menu">
        <div className="sidebar-cnt">
          <div className="sidebar-sec">
            <div className="sidebar-logo">
              <img src={images.logo} alt="encrypt-logo" className='logo' />
              <h3 className='sidebar-logo-text'>Encrypt</h3>
              <button>close</button>
            </div>
            <div className="sidebar-list">
              <div className="sidebar-menu">
                <div className="sidebar-list-group">
                  <h6 className="sidebar-title master-title">Menu</h6>
                  <div className="sidebar-link-list">
                    <ul className="sidebar-links">
                      <NavLink to="/" iconClass="fa-light fa-house" label="Home" />
                      <NavLink to="/generator" iconClass="ph ph-password" label="Password Generator" />
                      <NavLink to="/trash" iconClass="fa-light fa-trash-can" label="Trash" />
                      <NavLink to="/setting" iconClass="fa-regular fa-gear" label="Setting" />
                    </ul>
                  </div>
                </div>
                <div className="sidebar-list-group">
                  <p className='sidebar-title master-title'>Premium</p>
                  <div className='sidebar-menu-links premium'>
                    {/* <NavLink to="/premium" iconImg={images.premium} label="Premium" /> */}
                    <NavLink to="/premium" iconClass="fa-regular fa-sparkles" label="Premium" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-profile-sec">
            {/* <Link to="/profile" className="sidebar-profile"> */}
            <Link to="/profile" className={`sidebar-profile ${isActive ? 'active' : ''}`}>
              <div className="sidebar-profile-sec-txt">
                <img src={images.my_avtar} alt="profile" className='sidebar-profile-img' />
                <div className="sidebar-profile-sec-name">
                  <p className='sidebar-profile-sec-name-subtext'>Profile</p>
                  <h4 className='sidebar-profile-sec-name-text'>Vasu Bhalodiya</h4>
                </div>
              </div>
              <div className="sidebar-profile-sec-arrow">
                <i className="ph ph-caret-up-down"></i>
              </div>
            </Link>
            <div className="sidebar-watermark">
              <div className="watermark-divider">
                <p>Developed by <a href="https://www.linkedin.com/in/vasubhalodiya/" target='_blank'>Vasu Bhalodiya</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-menu">
        <div className="bottom-menu-mobile">
          <NavLink to="/" iconClass="fa-light fa-house" />
          <NavLink to="/generator" iconClass="ph ph-password" />
          <NavLink to="/trash" iconClass="fa-regular fa-sparkles" />
          <NavLink to="/setting" iconClass="fa-regular fa-gear" />
        </div>
      </div>
      <Navbar />
    </>
  )
}

export default Sidebar