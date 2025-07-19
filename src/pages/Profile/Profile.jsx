import React, { useState } from 'react';
import './Profile.css';

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
              <i class="fa-solid fa-info"></i>Account
          </button>
          <button 
            className={`profile-btn ${profileTab === 'security' ? 'active' : ''}`} 
            onClick={() => setProfileTab('security')}>
              <i class="fa-solid fa-shield-halved"></i>Security
          </button>
          <button 
            className={`profile-btn ${profileTab === 'support' ? 'active' : ''}`} 
            onClick={() => setProfileTab('support')}>
              <i class="fa-solid fa-headset"></i>Support
          </button>
        </div>
        <div className="profile-button-main-cnt">
          {profileTab === 'account' && (
            <>
              <div className="profile-section-cnt">
                <div className="profile-account">
                  <h6 className="profile-title master-title">General</h6>
                  <div className="profile-account-details">
                    <div className="profile-account-item">
                      <h4 className="profile-label">Email</h4>
                      <div className="profile-label-data profile-email">vasu@gmail.com</div>
                    </div>
                    <div className="profile-account-item">
                      <h4 className="profile-label">Display name</h4>
                      <div className="profile-label-data profile-username">Vasu Bhalodiya <button>Edit</button></div>
                    </div>
                    <div className="profile-account-item">
                      <h4 className="profile-label">Password</h4>
                      <div className="profile-label-data profile-password">Change Pasword</div>
                    </div>
                  </div>
                  <h6 className="profile-title master-title danger">Danger Zone</h6>
                  <div className="profile-buttons-section profile-danger-zone">
                    <button 
                      className={`profile-btn danger-zone ${dangerZone === 'logout' ? 'active' : ''}`} 
                      onClick={() => setDangerZone('logout')}>
                        <i class="fa-solid fa-arrow-left-from-bracket"></i>Logout
                    </button>
                    <button 
                      className={`profile-btn danger-zone ${dangerZone === 'deleteAccount' ? 'active' : ''}`} 
                      onClick={() => setDangerZone('deleteAccount')}>
                        <i class="fa-solid fa-trash-can"></i>Delete Account
                    </button>
                  </div>
                  <div className="profile-account-details">
                    {dangerZone === 'logout' && (
                      <>
                        <div className="profile-section-cnt">
                          <div className="profile-logout">
                            logout
                          </div>
                        </div>
                      </>
                    )}
                    {dangerZone === 'deleteAccount' && (
                      <>
                        <div className="profile-section-cnt">
                          <div className="profile-delete-account">
                            delete account
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {profileTab === 'security' && (
            <>
              <div className="profile-section-cnt">
                <div className="profile-security">
                  security
                </div>
              </div>
            </>
          )}
          {profileTab === 'support' && (
            <>
              <div className="profile-section-cnt">
                <div className="profile-support">
                  support
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
