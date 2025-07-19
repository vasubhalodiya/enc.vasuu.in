import React, { useState } from 'react';
import '../../pages/Profile/Profile.css'
import Popup from '../Popup/Popup';

const unlockOptions = [
  {
    title: "None",
    desc: "Proton Pass will always be accessible.",
  },
  {
    title: "PIN code",
    desc: "Online access to Proton Pass will require a PIN code. You'll be logged out after 3 failed attempts.",
  },
  {
    title: "Password",
    desc: "Access to Proton Pass will always require your Proton password.",
  }
];

const ProfileSecurity = ({ profileTab }) => {
  const [selectedOption, setSelectedOption] = useState('None');
  const [showPopup, setShowPopup] = useState(false);

  const handleSelect = (title) => {
    setSelectedOption(title);
    setShowPopup(true);
  };

  const options = ['1 minute', '2 minutes', '5 minutes', '10 minutes', '30 minutes', '1 hour'];
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  return (
    <>
      {profileTab === 'security' && (
        <>
          <div className="profile-section-cnt">
            <div className="profile-security">
              <div className="profile-unlock-box">
                <div className="profile-unlock-head">
                  <h2 className='profile-unlock-head-txt'>Unlock with</h2>
                </div>
                <div className="profile-unlock-options">
                  {/* <div className="profile-unlock-field">
                    <div className="profile-unlock-icon">
                      <i class="fa-regular fa-square"></i>
                      <i class="fa-solid fa-square-check"></i>
                    </div>
                    <div className="profile-unlock-field-txt-sec">
                      <p className='profile-unlock-field-txt-title'>None</p>
                      <p className='profile-unlock-field-txt-title-desc'>Proton Pass will always be accessible</p>
                    </div>
                  </div> */}
                  {unlockOptions.map((option) => (
                    <div
                      key={option.title}
                      className="profile-unlock-field"
                      onClick={() => handleSelect(option.title)}>
                      <div className="profile-unlock-icon">
                        {selectedOption === option.title ? (
                          <i className="fa-solid fa-square-check"></i>
                        ) : (
                          <i className="fa-light fa-square"></i>
                        )}
                      </div>
                      <div className="profile-unlock-field-txt-sec">
                        <p className='profile-unlock-field-txt-title'>{option.title}</p>
                        <p className='profile-unlock-field-txt-title-desc'>{option.desc}</p>
                      </div>
                    </div>
                  ))}

                  {showPopup && <Popup onClose={() => setShowPopup(false)} />}
                </div>
                {/* <div className="profile-auto-lock">
                  <h5>Auto-lock after</h5>
                  <div className="profile-auto-lock-dropd">
                    <select className='profile-auto-lock-select'>
                      <option value="1">1 minute</option>
                      <option value="1">2 minute</option>
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                    </select>
                  </div>
                </div> */}
                <div className="profile-auto-lock">
                  <h5 className='profile-auto-lock-title'>Auto-lock after</h5>
                  <div className="profile-auto-lock-dropd">
                    <div className="profile-auto-lock-select" onClick={() => setOpen(!open)}>
                      <span>{selected}</span>
                      <i class="fa-solid fa-chevron-down"></i>
                    </div>

                    {open && (
                      <ul className="dropdown-options">
                        {options.map((opt) => (
                          <li
                            key={opt}
                            className={`dropdown-item ${selected === opt ? 'active' : ''}`}
                            onClick={() => {
                              setSelected(opt);
                              setOpen(false);
                            }}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfileSecurity