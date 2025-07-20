import React, { useState } from 'react'
import './Navbar.css'
import images from '../../utils/Images'

const Navbar = ({ isTablet, onToggle, isOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Create');

  const dropdownOptions = [
  { key: 'login', label: 'Login', icon: 'fa-light fa-user' },
  { key: 'credit', label: 'Credit Card', icon: 'fa-light fa-credit-card' },
  { key: 'secureNote', label: 'Secure Note', icon: 'fa-light fa-notes' },
];

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
                <i className="fa-light fa-magnifying-glass"></i>
              </span>
              <input type="text" className="search-input" placeholder="Search" />
            </div>
          </div>
          <div className="vaults-add">
            {/* <button className="vaults-add-btn"><i className="fa-regular fa-plus"></i><span>Create</span></button> */}
            <div className="vaults-create-dropdown">
              <button
                className="vaults-add-btn"
                onClick={() => setOpenDropdown(!openDropdown)}>
                <i className="fa-regular fa-plus"></i>
                <span className='white-space-none'>{selectedOption}</span>
              </button>
              {openDropdown && (
                <ul className="dropdown-options">
                  {dropdownOptions.map(opt => (
                    <li
                      key={opt.key}
                      className={`dropdown-item`}
                      onClick={() => {
                        setSelectedOption(opt.label);
                        setOpenDropdown(false);
                      }}>
                      <i className={opt.icon}></i>
                      <h5>{opt.label}</h5>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div><button className="vaults-three-dot-btn mini-master-btn"><i className="fa-regular fa-ellipsis-vertical"></i></button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar