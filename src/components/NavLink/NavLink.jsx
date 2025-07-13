import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = ({ to, iconClass, iconImg, label, tooltip, onClick }) => {
  return (
    <RouterNavLink to={to}>
      {({ isActive }) => {
        const isSparkleIcon = iconClass === 'fa-regular fa-sparkles';
        return (
          <li className={`sidebar-link ${isActive ? 'active' : ''}`} onClick={onClick}>
            {iconImg ? (
              <img src={iconImg} alt="icon" className="sidebar-premium-star" />
            ) : (
              <i className={`${isActive ? 'fa-solid' : 'fa-light'} ${iconClass}`} style={isSparkleIcon ? { color: '#ffd700' } : {}}></i>
            )}
            {label}
          </li>
        );
      }}
    </RouterNavLink>
  );
};

export default NavLink;