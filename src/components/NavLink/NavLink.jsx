import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = ({ to, iconClass, iconImg, label }) => {
  return (
    <RouterNavLink to={to}>
      {({ isActive }) => {
        return (
          <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
            {iconImg ? (
              <img src={iconImg} alt="icon" className="sidebar-premium-star" />
            ) : (
              <i className={`${isActive ? 'fa-solid' : 'fa-light'} ${iconClass}`}></i>
            )}
            {label}
          </div>
        );
      }}
    </RouterNavLink>
  );
};

export default NavLink;