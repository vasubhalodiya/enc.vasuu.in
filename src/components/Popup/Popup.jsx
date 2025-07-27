import React, { useRef, useState } from "react";
import "./Popup.css";

const Popup = ({ onClose }) => {
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleFieldClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="popup-overlay"></div>
      <div className="popup-wrapper">
        <div className="popup-header">
          <h2 className="popup-title">Enter Password</h2>
          <button className="popup-close-btn" onClick={onClose}>
            <i className="fa-light fa-xmark"></i>
          </button>
        </div>
        <p className="popup-desc">
          Please confirm your password in order to unregister your current lock.
        </p>

        <div
          className="auth-input-field auth-group-box auth-clickable"
          onClick={handleFieldClick}>
          <div className="auth-icon popup-icon">
            <i class="fa-light fa-key"></i>
          </div>
          <div className="auth-input-section">
            <h6 className="auth-input-title">Password</h6>
            <input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              className="auth-password-input auth-input"
              placeholder="Enter your password"
            />
          </div>
          <div className="auth-pass-btns">
            <button
              type="button"
              className="auth-pass-show-icon popup-icon"
              onClick={(e) => {
                e.stopPropagation();
                togglePassword();
              }}>
              {showPassword ? (
                <i class="fa-light fa-eye-slash"></i>
              ) : (
                <i class="fa-light fa-eyes"></i>
              )}
            </button>
          </div>
        </div>

        <div className="popup-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-authenticate">Authenticate</button>
        </div>
      </div>
    </>
  );
};

export default Popup;
