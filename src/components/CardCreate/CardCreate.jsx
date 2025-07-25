import React, { useRef, useEffect, useState } from 'react';
import ContainerCreate from '../ContainerCreate/ContainerCreate';

const CardCreate = ({ onClose }) => {
  const textareaRef = useRef(null);
  const titleInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const websiteInputRef = useRef(null);

  const [focusedField, setFocusedField] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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

  const handleFieldFocus = (fieldId) => {
    setFocusedField(fieldId);

    const fieldRefs = {
      title: titleInputRef,
      email: emailInputRef,
      password: passwordInputRef,
      username: usernameInputRef,
      website: websiteInputRef,
      note: textareaRef,
    };

    fieldRefs[fieldId]?.current?.focus();
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
  };

  const handleContainerClick = (e, fieldId) => {
    e.stopPropagation();
    handleFieldFocus(fieldId);
  };

  return (
    <ContainerCreate title="Create Card" onClose={onClose}>
      {/* Title */}
      <div className="vd-main-cnt-field">
        <div className={`vd-input-field ${focusedField === 'title' ? 'vd-input-field-focused' : ''}`} onClick={(e) => handleContainerClick(e, 'title')}>
          <div className="vd-input-section">
            <h6 className="vd-input-title">Title</h6>
            <input
              ref={titleInputRef}
              type="text"
              className="vd-untitle-input vd-input"
              placeholder='Untitled'
              onFocus={() => handleFieldFocus('title')}
              onBlur={handleFieldBlur}
            />
            <p className="vd-error-txt"><i class="fa-solid fa-hexagon-exclamation"></i>Title is required</p>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="vd-main-cnt-field">
        <div className={`vd-input-field vd-group-box ${focusedField === 'email' ? 'vd-input-field-focused' : ''}`} onClick={(e) => handleContainerClick(e, 'email')}>
          <div className="vd-icon">
            <i className="fa-light fa-envelope"></i>
          </div>
          <div className="vd-input-section">
            <h6 className="vd-input-title">Email</h6>
            <input
              ref={emailInputRef}
              type="text"
              className="vd-email-input vd-input"
              placeholder='Enter email'
              onFocus={() => handleFieldFocus('email')}
              onBlur={handleFieldBlur}
            />
          </div>
        </div>

        {/* Password */}
        <div className={`vd-input-field vd-group-box ${focusedField === 'password' ? 'vd-input-field-focused' : ''}`} onClick={(e) => handleContainerClick(e, 'password')}>
          <div className="vd-icon">
            <i className="fa-light fa-key"></i>
          </div>
          <div className="vd-input-section">
            <h6 className="vd-input-title">Password</h6>
            <input
              ref={passwordInputRef}
              type="text"
              className="vd-password-input vd-input"
              placeholder="Enter password"
              value={isPasswordFocused ? password : password ? '*************' : ''}
              readOnly={!isPasswordFocused}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                handleFieldFocus('password');
                setIsPasswordFocused(true);
              }}
              onBlur={() => {
                handleFieldBlur();
                setIsPasswordFocused(false);
              }}
            />
          </div>
          <div>
            <button className="vd-pass-generate-icon">
              <i className="fa-light fa-arrows-rotate"></i>
            </button>
          </div>
        </div>

        {/* Username */}
        <div className={`vd-input-field vd-group-box ${focusedField === 'username' ? 'vd-input-field-focused' : ''}`} onClick={(e) => handleContainerClick(e, 'username')}>
          <div className="vd-icon">
            <i className="fa-light fa-user"></i>
          </div>
          <div className="vd-input-section">
            <h6 className="vd-input-title">Username</h6>
            <input
              ref={usernameInputRef}
              type="text"
              className="vd-username-input vd-input"
              placeholder='Enter username'
              onFocus={() => handleFieldFocus('username')}
              onBlur={handleFieldBlur}
            />
          </div>
        </div>
      </div>

      {/* Website */}
      <div className="vd-main-cnt-field">
        <div className={`vd-input-field ${focusedField === 'website' ? 'vd-input-field-focused' : ''}`} onClick={(e) => handleContainerClick(e, 'website')}>
          <div className="vd-icon">
            <i className="fa-light fa-earth-americas"></i>
          </div>
          <div className="vd-input-section">
            <h6 className="vd-input-title">Websites</h6>
            <input
              ref={websiteInputRef}
              type="text"
              className="vd-username-input vd-input"
              placeholder='https://'
              onFocus={() => handleFieldFocus('website')}
              onBlur={handleFieldBlur}
            />
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="vd-main-cnt-field">
        <div className={`vd-input-field ${focusedField === 'note' ? 'vd-input-field-focused' : ''}`} onClick={(e) => handleContainerClick(e, 'note')}>
          <div className="vd-icon">
            <i className="fa-light fa-notes"></i>
          </div>
          <div className="vd-input-section">
            <h6 className="vd-input-title">Note</h6>
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              placeholder="Add note"
              className="vd-note-input vd-input"
              rows={1}
              onFocus={() => handleFieldFocus('note')}
              onBlur={handleFieldBlur}
            />
          </div>
        </div>
      </div>
    </ContainerCreate>
  );
};

export default CardCreate;
