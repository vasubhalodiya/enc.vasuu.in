import React from 'react'
import './Navbar.css'

const Navbar = ({ isTablet, onToggle, isOpen, closeSidebar }) => {
  return (
    <>
      <div className={`navbar ${isTablet && isOpen ? "shifted" : ""}`}>
        <div className="navbar-cnt">
          {isTablet && (
            <button className="navbar-toggle-btn" onClick={onToggle}>
              <i className="fa-light fa-sidebar"></i>
            </button>
          )}
          <div className="search-box">
            <span className="search-icon">
              <i class="fa-light fa-magnifying-glass"></i>
            </span>
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="vaults-add">
            <button className="vaults-add-btn"><i class="fa-regular fa-shield-plus"></i>Create item</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar