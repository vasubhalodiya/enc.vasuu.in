import React, { useState } from 'react';
import './Profile.css';
import ProfileAccount from '../../components/ProfileAccount/ProfileAccount';
import ProfileSecurity from '../../components/ProfileSecurity/ProfileSecurity';
import ProfileAboutProject from '../../components/ProfileAboutProject/ProfileAboutProject';

const Profile = () => {
  const [profileTab, setProfileTab] = useState('account');
  const [dangerZone, setDangerZone] = useState('logout');

  return (
    <div className="profile">
      <div className="profile-cnt">
        <div className="profile-buttons-section">
          <button 
            className={`profile-btn ${profileTab === 'account' ? 'active' : ''}`} 
            onClick={() => setProfileTab('account')}>
              <i className="fa-solid fa-face-grin"></i>Account
          </button>
          <button 
            className={`profile-btn ${profileTab === 'security' ? 'active' : ''}`} 
            onClick={() => setProfileTab('security')}>
              <i className="fa-solid fa-shield-halved"></i>Security
          </button>
          <button 
            className={`profile-btn ${profileTab === 'about' ? 'active' : ''}`} 
            onClick={() => setProfileTab('about')}>
              <i className="fa-solid fa-info"></i>About Project
          </button>
        </div>
        <div className="profile-button-main-cnt">
          <ProfileAccount
            profileTab={profileTab} 
            dangerZone={dangerZone} 
            setDangerZone={setDangerZone}
          />
          <ProfileSecurity
            profileTab={profileTab}
          />
          <ProfileAboutProject
            profileTab={profileTab}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
