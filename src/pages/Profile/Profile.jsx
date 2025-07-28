import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth"; // <-- ADD THIS
import './Profile.css';
import ProfileAccount from '../../components/ProfileAccount/ProfileAccount';
import ProfileSecurity from '../../components/ProfileSecurity/ProfileSecurity';
import ProfileAboutProject from '../../components/ProfileAboutProject/ProfileAboutProject';

const Profile = ({ setSidebarUsername }) => {
  const [profileTab, setProfileTab] = useState('account');
  const [dangerZone, setDangerZone] = useState('logout');
  const [openTabDropdown, setOpenTabDropdown] = useState(false);
  const [selectedTabLabel, setSelectedTabLabel] = useState('Account');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const tabOptions = [
    { key: 'account', label: 'Account' },
    // { key: 'security', label: 'Security' },
    { key: 'about', label: 'About Project' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenTabDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const current = tabOptions.find(opt => opt.key === profileTab);
    if (current) setSelectedTabLabel(current.label);
  }, [profileTab]);

  return (
    <div className="profile">
      <div className="profile-cnt">
        {windowWidth > 575 ? (
          <div className="profile-buttons-section">
            {tabOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setProfileTab(opt.key)}
                className={`profile-btn ${profileTab === opt.key ? 'active' : ''}`}>
                <i className={`fa-solid ${opt.key === 'account' ? 'fa-face-grin' :
                  opt.key === 'security' ? 'fa-shield-halved' : 'fa-info'
                  }`}></i>
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="profile-tab-dropdown" ref={dropdownRef}>
            <div className="profile-tab-select" onClick={() => setOpenTabDropdown(!openTabDropdown)}>
              <span>{selectedTabLabel}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            {openTabDropdown && (
              <ul className="dropdown-options">
                {tabOptions.map(opt => (
                  <li
                    key={opt.key}
                    className={`dropdown-item ${profileTab === opt.key ? 'active' : ''}`}
                    onClick={() => {
                      setProfileTab(opt.key);
                      setOpenTabDropdown(false);
                    }}>
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="profile-button-main-cnt">
          <ProfileAccount
            profileTab={profileTab}
            dangerZone={dangerZone}
            setDangerZone={setDangerZone}
            setSidebarUsername={setSidebarUsername}
          />
          {/* <ProfileSecurity profileTab={profileTab} /> */}
          <ProfileAboutProject profileTab={profileTab} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
