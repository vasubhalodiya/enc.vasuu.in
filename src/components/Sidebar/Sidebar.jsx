import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import images from '../../utils/Images'
import NavLink from '@/components/NavLink/NavLink';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';
import LoginCreate from '../LoginCreate/LoginCreate';
import CardCreate from '../CardCreate/CardCreate';
import NoteCreate from '../NoteCreate/NoteCreate';

const Sidebar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const isActive = location.pathname === '/profile';
  const [isOpen, setIsOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1240);
  const [selectedDrawer, setSelectedDrawer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [selectedDrawer, setSelectedDrawer] = useState('login');
  // const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const tablet = window.innerWidth < 1240;
      setIsTablet(tablet);
      if (!tablet) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrawerSelect = (type) => {
    setSelectedDrawer(type);
    setIsDrawerOpen(true);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  return (
    <>
      <div className={`sidebar desktop-menu ${isTablet && isOpen ? 'open' : ''}`}>
        <div className="sidebar-cnt">
          <div className="sidebar-sec">
            <div className="sidebar-logo">
              <div className='sidebar-logo-cnt'>
                <img src={images.logo} alt="encrypt-logo" className='logo' />
                <h3 className='sidebar-logo-text'>Encrypt</h3>
              </div>
              {isTablet && isOpen && (
                <button onClick={closeSidebar} className='navbar-toggle-btn'><i className="fa-light fa-sidebar"></i></button>
              )}
            </div>
            <div className="sidebar-list">
              <div className="sidebar-menu">
                <div className="sidebar-list-group">
                  <h6 className="sidebar-title master-title">Menu</h6>
                  <div className="sidebar-link-list">
                    <ul className="sidebar-links">
                      <NavLink to="/" iconClass="fa-light fa-house" label="Home" onClick={closeSidebar} />
                      <NavLink to="/generator" iconClass="ph ph-password" label="Generate Password" onClick={closeSidebar} />
                    </ul>
                  </div>
                </div>
                <div className="sidebar-list-group">
                  <p className='sidebar-title master-title'>Premium</p>
                  <div className='sidebar-menu-links premium'>
                    <NavLink to="/premium" iconClass="fa-regular fa-sparkles" label="Premium" onClick={closeSidebar} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-profile-sec">
            <Link to="/profile" className={`sidebar-profile ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
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
          <div className='sidebar-menu-links premium'>
            <NavLink to="/premium" iconClass="fa-regular fa-sparkles" />
          </div>
          <NavLink to="/profile" iconClass="fa-regular fa-user" />
        </div>
      </div>
      <Navbar
        isTablet={isTablet}
        onToggle={toggleSidebar}
        isOpen={isOpen}
        closeSidebar={closeSidebar}
        onDrawerSelect={handleDrawerSelect}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} />
      {isTablet && isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
          role="button"
          tabIndex={0}
          aria-label="Close Sidebar"
          onKeyDown={(e) => { if (e.key === 'Escape') closeSidebar(); }} />
      )}
      {isDrawerOpen && selectedDrawer === 'login' && (
        <LoginCreate onClose={() => setIsDrawerOpen(false)} />
      )}
      {isDrawerOpen && selectedDrawer === 'credit' && (
        <CardCreate onClose={() => setIsDrawerOpen(false)} />
      )}
      {isDrawerOpen && selectedDrawer === 'secureNote' && (
        <NoteCreate onClose={() => setIsDrawerOpen(false)} />
      )}

    </>
  )
}

export default Sidebar