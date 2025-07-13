import React from 'react'
import './Navbar.css'
import images from '../../utils/Images'

const Navbar = ({ isTablet, onToggle, isOpen, closeSidebar }) => {
  return (
    <>
      <div className={`navbar ${isTablet && isOpen ? "shifted" : ""}`}>
        <div className="navbar-cnt">
          <div className="navbar-part">
            {isTablet && (
              <button className="navbar-toggle-btn" onClick={onToggle}>
                <i className="fa-light fa-sidebar"></i>
              </button>
            )}
            <div className="navbar-logo">
              <img src={images.logo} alt="encrypt-logo" className='logo' />
              <h3 className='navbar-logo-text'>Encrypt</h3>
            </div>
            <div className="search-box">
              <span className="search-icon">
                <i class="fa-light fa-magnifying-glass"></i>
              </span>
              <input type="text" className="search-input" placeholder="Search" />
            </div>
          </div>
          <div className="vaults-add">
            <button className="vaults-add-btn"><i class="fa-regular fa-plus"></i><span>Create</span></button>
            <div><button className="vaults-three-dot-btn mini-master-btn"><i className="fa-regular fa-ellipsis-vertical"></i></button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar