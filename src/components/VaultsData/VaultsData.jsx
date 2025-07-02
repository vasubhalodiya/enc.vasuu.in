import React, { useState } from 'react';
import '@/common/VaultsCommon.css'
import toast from 'react-hot-toast';

const VaultsData = () => {
  const [showPassword, setShowPassword] = useState(false);


  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.dismiss();
      toast.success('Copied to clipboard!', { icon: null });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.dismiss();
      toast.error('Failed to copy!', { icon: null });
    }
  };

  const handleFieldClick = (content, fieldName) => {
    if (fieldName === 'website') {
      if (content && content.trim()) {
        window.open(content, '_blank');
      }
    } else {
      if (content && content.trim()) {
        copyToClipboard(content, fieldName);
      }
    }
  };

  return (
    <div className="vaultsData">
      <div className="vd-header">
        <div className="vd-head-title">
          <h4 className="vd-head-title-txt">My Password</h4>
        </div>
        <div className="vd-sec">
          <div className="vd-create">
            <div><button className="vd-create-btn"><i className="fa-regular fa-pen"></i>Edit</button></div>
            <div><button className="vd-three-dot-btn mini-master-btn"><i className="fa-regular fa-ellipsis-vertical"></i></button></div>
          </div>
        </div>
      </div>

      <div className="vaultsData-cnt">
        <div className="vd-main-cnt-field">
          <div className="vd-input-field vd-group-box vd-clickable" onClick={() => handleFieldClick('vasu@gmail.com', 'email')}>
            <div className="vd-icon">
              <i className="fa-light fa-envelope"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Email</h6>
              <p className="vd-email-input vd-input">vasu@gmail.com</p>
            </div>
          </div>

          <div className="vd-input-field vd-group-box vd-clickable" onClick={() => handleFieldClick('MySecretPassword123', 'password')}>
            <div className="vd-icon">
              <i className="fa-light fa-key"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Password</h6>
              <p className="vd-password-input vd-input">{showPassword ? 'MySecretPassword123' : '************'}</p>
            </div>
            <div className="vd-pass-btns">
              <button
                className="vd-pass-show-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                  toast.dismiss();
                }}>
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eyes'}`}></i>
              </button>
            </div>
          </div>

          <div className="vd-input-field vd-group-box vd-clickable" onClick={() => handleFieldClick('vasu', 'username')}>
            <div className="vd-icon">
              <i className="fa-light fa-user"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Username</h6>
              <p className="vd-username-input vd-input">vasu</p>
            </div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-input-field vd-clickable vd-website-field" onClick={() => handleFieldClick('https://vasuu.in', 'website')}>
            <div className="vd-icon">
              <i className="fa-light fa-earth-americas"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Websites</h6>
              <p className="vd-website-input vd-input">https://vasuu.in</p>
            </div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-input-field vd-clickable" onClick={() => handleFieldClick('this is testing note', 'note')}>
            <div className="vd-icon">
              <i className="fa-light fa-note-sticky"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Note</h6>
              <p className="vd-note-input vd-input">this is testing note</p>
            </div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-last-modified-field">
            <div className="vd-icon">
              <i className="fa-regular fa-pen"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Last Modified</h6>
              <p className="vd-note-input vd-input">Today at 10:15 PM</p>
            </div>
          </div>
          <div className="vd-last-modified-field">
            <div className="vd-icon">
              <i className="fa-light fa-bolt"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Created</h6>
              <p className="vd-note-input vd-input">Last Tuesday at 9:21 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultsData;