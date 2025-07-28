import React, { useRef, useState, useEffect } from "react";
import "./Popup.css";

const Popup = ({
  onClose,
  title = "",
  description = "",
  cancelText = "",
  confirmText = "",
  onConfirm,
  showPasswordField = true,
  mode = "default", // "password" | "pin" | "confirm"
}) => {
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  // Focus first pin box automatically when mode=pin
  useEffect(() => {
    if (mode === "pin") {
      const firstInput = document.getElementById("pin-0");
      if (firstInput) firstInput.focus();
    }
  }, [mode]);

  const handlePinChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 5) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handlePinKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      document.getElementById(`pin-${index - 1}`).focus();
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
    }
  };

  return (
    <>
      <div className="popup-overlay"></div>
      <div className="popup-wrapper">
        <div className="popup-header">
          <h2 className="popup-title">{title}</h2>
          <button className="popup-close-btn" onClick={onClose}>
            <i className="fa-light fa-xmark"></i>
          </button>
        </div>

        <p className={`popup-desc ${mode === "danger" ? "popup-danger-desc" : ""}`}>
          {description}
        </p>

        {/* Password Mode */}
        {mode === "password" && showPasswordField && (
          <div
            className="auth-input-field auth-group-box auth-clickable"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="auth-icon popup-icon">
              <i className="fa-light fa-key"></i>
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
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? (
                  <i className="fa-light fa-eye-slash"></i>
                ) : (
                  <i className="fa-light fa-eye"></i>
                )}
              </button>
            </div>
          </div>
        )}

        {/* PIN Mode */}
        {mode === "pin" && (
          <div className="pin-input-container">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="password"
                maxLength={1}
                className="pin-input"
                value={digit}
                onChange={(e) => handlePinChange(e.target.value, index)}
                onKeyDown={(e) => handlePinKeyDown(e, index)}
              />
            ))}
          </div>
        )}

        <div className="popup-actions">
          <button className="popup-cancel-btn" onClick={onClose}>
            {cancelText}
          </button>
          <button
            className="popup-success-btn"
            onClick={() =>
              onConfirm?.(mode === "pin" ? pin.join("") : undefined)
            }
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;   // ✅ PROPER DEFAULT EXPORT
