import React, { useState, useEffect } from 'react';
import '../../pages/Profile/Profile.css';
import Popup from '../Popup/Popup';

const unlockOptions = [
  { title: "None", desc: "ENCRYPT will always be accessible." },
  { title: "PIN code", desc: "Online access will require a PIN code. You'll be logged out after 3 failed attempts." },
  { title: "Password", desc: "Access will always require your ENCRYPT password." }
];

const SESSION_KEY = "lockSession";   // sessionStorage key
const SESSION_DURATION = 1 * 60 * 1000; // 5 minutes

const ProfileSecurity = ({ profileTab }) => {
  const [selectedOption, setSelectedOption] = useState('None');
  const [previousOption, setPreviousOption] = useState('None');
  const [popupType, setPopupType] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);

  // ---- Load session on mount ----
  useEffect(() => {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      if (parsed.expiresAt > Date.now()) {
        setSelectedOption(parsed.lockType);
        setSessionActive(parsed.lockType === "password" || parsed.lockType === "pin");
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  // ---- Handle option click ----
  const handleSelect = (title) => {
    setPreviousOption(selectedOption);
    if (title === "Password") setPopupType("password");
    else if (title === "PIN code") setPopupType("pin");
    else setPopupType("confirm");
    setSelectedOption(title);
  };

  const handleClose = () => {
    setSelectedOption(previousOption);
    setPopupType(null);
  };

  const handleConfirm = (data) => {
    if (popupType === "password") {
      // Normally validate password with API
      startSession("password");
    } else if (popupType === "pin") {
      // Normally validate / set PIN
      startSession("pin");
    } else {
      clearSession();
    }
    setPopupType(null);
  };

  // ---- Start session ----
  const startSession = (lockType) => {
    const expiresAt = Date.now() + SESSION_DURATION;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ lockType, expiresAt }));
    setSessionActive(true);

    // Auto expire after time
    setTimeout(() => {
      clearSession();
      alert("Session expired. Please re-authenticate.");
    }, SESSION_DURATION);
  };

  // ---- Clear session ----
  const clearSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSessionActive(false);
    setSelectedOption("None");
  };

  return (
    <>
      {profileTab === 'security' && (
        <div className="profile-section-cnt">
          <div className="profile-security">
            <div className="profile-unlock-box">
              <div className="profile-unlock-head">
                <h2 className='profile-unlock-head-txt'>Unlock with</h2>
              </div>
              <div className="profile-unlock-options">
                {unlockOptions.map((option) => (
                  <div
                    key={option.title}
                    className="profile-unlock-field"
                    onClick={() => handleSelect(option.title)}>
                    <div className="profile-unlock-icon">
                      {selectedOption === option.title
                        ? <i className="fa-solid fa-square-check"></i>
                        : <i className="fa-light fa-square"></i>}
                    </div>
                    <div className="profile-unlock-field-txt-sec">
                      <p className='profile-unlock-field-txt-title'>{option.title}</p>
                      <p className='profile-unlock-field-txt-title-desc'>{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {popupType && (
            <Popup
              mode={popupType}
              onClose={handleClose}
              onConfirm={handleConfirm}
              title={
                popupType === "password"
                  ? "Enter Password"
                  : popupType === "pin"
                    ? "Set 4 Digit PIN"
                    : "Confirmation"
              }
              description={
                popupType === "password"
                  ? "Please confirm your password in order to register your lock."
                  : popupType === "pin"
                    ? "You will use this PIN to unlock ENCRYPT once it auto-locks."
                    : "Are you sure you want to disable lock?"
              }
              cancelText="Cancel"
              confirmText={popupType === "confirm" ? "Yes" : "Authenticate"}
              showPasswordField={popupType === "password"}
            />
          )}

          <div style={{ marginTop: "20px" }}>
            {sessionActive
              ? <p style={{ color: "green" }}>Session Active: Access granted</p>
              : <p style={{ color: "red" }}>No active session. Please authenticate.</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSecurity;
