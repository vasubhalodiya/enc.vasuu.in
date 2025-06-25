import React from 'react'
import './VaultsData.css'
import { useRef, useEffect } from 'react';
// show proton add login 
// email-text-color------
//                       |---- before
// input-light-color------
// when type in input box reverse

const VaultsData = () => {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, []);


  return (
    <>
      <div className="vaultsData">
        <div className="vd-header">
          <div className="vd-close">
            <button className="vd-close-btn"><i class="fa-regular fa-xmark"></i></button>
          </div>
          <div className="vd-sec">
            <div className="vd-folder">
              <h4 className="vd-folder-btn">Folder<i class="fa-regular fa-chevron-down"></i></h4>
            </div>
            <div className="vd-create">
              <button className="vd-create-btn">Create Login</button>
            </div>
          </div>
        </div>
        <div className="vaultsData-cnt">
          <div className="vd-main-cnt-field">
            <div className="vd-input-field">
              <div className="vd-input-section">
                <h6 className="vd-input-title">Title</h6>
                <input type="text" className="vd-untitle-input vd-input" placeholder='Untitled' />
                <p className="vd-error-txt"><i class="ph-fill ph-warning-circle"></i>Title is required</p>
              </div>
            </div>
          </div>
          <div className="vd-main-cnt-field">
            <div className="vd-input-field vd-group-box">
              <div className="vd-icon">
                <i class="fa-light fa-envelope"></i>
              </div>
              <div className="vd-input-section">
                <h6 className="vd-input-title">Email</h6>
                <input type="text" className="vd-email-input vd-input" placeholder='Enter email' />
              </div>
            </div>
            <div className="vd-input-field vd-group-box">
              <div className="vd-icon">
                <i class="fa-light fa-key"></i>
              </div>
              <div className="vd-input-section">
                <h6 className="vd-input-title">Password</h6>
                <input type="text" className="vd-password-input vd-input" placeholder='Enter password' />
              </div>
              <div>
                <button className="vd-pass-generate-icon">
                  <i class="fa-light fa-arrows-rotate"></i>
                </button>
              </div>
            </div>
            <div className="vd-input-field vd-group-box">
              <div className="vd-icon">
                <i class="fa-light fa-user"></i>
              </div>
              <div className="vd-input-section">
                <h6 className="vd-input-title">Username</h6>
                <input type="text" className="vd-username-input vd-input" placeholder='Enter username' />
              </div>
            </div>
          </div>
          <div className="vd-main-cnt-field">
            <div className="vd-input-field">
              <div className="vd-icon">
                <i class="fa-light fa-earth-americas"></i>
              </div>
              <div className="vd-input-section">
                <h6 className="vd-input-title">Websites</h6>
                <input type="text" className="vd-username-input vd-input" placeholder='https://' />
              </div>
            </div>
          </div>
          <div className="vd-main-cnt-field">
            <div className="vd-input-field">
              <div className="vd-icon">
                <i class="fa-light fa-note-sticky"></i>
              </div>
              <div className="vd-input-section">
                <h6 className="vd-input-title">Note</h6>
                <textarea
                  ref={textareaRef}
                  onInput={handleInput}
                  placeholder="Add note"
                  className="vd-note-input vd-input"
                  rows={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VaultsData