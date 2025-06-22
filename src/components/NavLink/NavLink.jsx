import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = ({ to, iconClass, iconImg, label }) => {
  return (
    <RouterNavLink to={to}>
      {({ isActive }) => (
        <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
          {iconImg ? (
            <img src={iconImg} alt="icon" className="sidebar-upgrade-star" />
          ) : (
            <i className={`${isActive ? 'ph-fill' : 'ph'} ${iconClass}`}></i>
          )}
          {label}
        </div>
      )}
    </RouterNavLink>
  );
};

export default NavLink;
