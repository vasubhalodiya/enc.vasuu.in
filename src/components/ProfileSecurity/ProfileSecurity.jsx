import React, { useState } from 'react';
import '../../pages/Profile/Profile.css';
import Popup from '../Popup/Popup';

const unlockOptions = [
  { title: "None", desc: "ENCRYPT will always be accessible." },
  { title: "PIN code", desc: "Online access will require a PIN code. You'll be logged out after 3 failed attempts." },
  { title: "Password", desc: "Access will always require your ENCRYPT password." }
];

const ProfileSecurity = ({ profileTab }) => {
  const [selectedOption, setSelectedOption] = useState('None');
  const [previousOption, setPreviousOption] = useState('None');
  const [popupType, setPopupType] = useState(null);

  const handleSelect = (title) => {
    setPreviousOption(selectedOption); // Save old active
    if (title === "Password") setPopupType("password");
    else if (title === "PIN code") setPopupType("pin");
    else setPopupType("confirm");

    setSelectedOption(title); // Temporarily highlight clicked option
  };

  const handleClose = () => {
    setSelectedOption(previousOption); // revert to old if cancelled
    setPopupType(null);
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
              title={
                popupType === "password"
                  ? "Enter Password"
                  : popupType === "pin"
                    ? "Set 4 Digit PIN"
                    : "Confirmation"
              }
              description={
                popupType === "password"
                  ? "Please confirm your password in order to unregister your current lock."
                  : popupType === "pin"
                    ? "You will use this PIN to unlock ENCRYPT once it auto-locks after a period of inactivity."
                    : "Are you sure you want to disable lock?"
              }
              cancelText="Cancel"
              confirmText={popupType === "confirm" ? "Yes" : "Authenticate"}
              showPasswordField={popupType === "password"}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProfileSecurity;
