import React from 'react'
import './Sidebar.css'
import images from '../../utils/Images'
import NavLink from '@/components/NavLink/NavLink';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';

const Sidebar = () => {
  const location = useLocation();
  const isActive = location.pathname === '/profile';
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-cnt">
          <div className="sidebar-sec">
            <div className="sidebar-logo">
              <img src={images.logo} alt="encrypt-logo" className='logo' />
              <h3 className='sidebar-logo-text'>Encrypt</h3>
            </div>
            <div className="sidebar-list">
              <div className="sidebar-menu">
                <div className="sidebar-list-group">
                  <h6 className="sidebar-title">Menu</h6>
                  <div className="sidebar-link-list">
                    <ul className="sidebar-links">
                      <NavLink to="/" iconClass="ph ph-house" label="Home" />
                      <NavLink to="/generator" iconClass="ph ph-password" label="Password Generator" />
                      <NavLink to="/trash" iconClass="ph ph-trash" label="Trash" />
                      <NavLink to="/setting" iconClass="ph ph-gear-six" label="Setting" />
                    </ul>
                  </div>
                </div>
                <div className="sidebar-list-group">
                  <p className='sidebar-title'>Upgrade</p>
                  <div className='sidebar-menu-links upgrade'>
                    <NavLink to="/upgrade" iconImg={images.upgrade_star} label="Upgrade" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-profile-sec">
            <Link to="/profile" className="sidebar-profile">
            {/* <Link to="/profile" className={`sidebar-profile ${isActive ? 'active' : ''}`}> */}
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
      {/* <Search /> */}
    </>
  )
}

export default Sidebar