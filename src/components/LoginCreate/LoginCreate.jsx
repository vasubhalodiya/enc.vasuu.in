import React, { useRef, useEffect, useState } from 'react';
import ContainerCreate from '../ContainerCreate/ContainerCreate';
import { db, auth } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { encryptPassword } from '@/utils/encryption';
import toast from 'react-hot-toast';

const LoginCreate = ({ onClose }) => {
  const textareaRef = useRef(null);
  const titleInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const websiteInputRef = useRef(null);

  const [focusedField, setFocusedField] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


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

  const handleCreateVault = async () => {
    const encryptionKey = localStorage.getItem('encryptionKey');
    if (!encryptionKey) return toast.error("Encryption key missing");

    if (!validateInputs()) return;

    const title = titleInputRef.current.value.trim();
    const email = emailInputRef.current.value.trim();
    const username = usernameInputRef.current.value.trim();
    const website = websiteInputRef.current.value.trim();
    const note = textareaRef.current.value.trim();

    try {
      const encryptedPass = await encryptPassword(password, encryptionKey);
      const data = {
        vaultId: crypto.randomUUID(),
        type: "login",
        title,
        email,
        password: encryptedPass,
        username,
        website,
        note,
        createdAt: serverTimestamp(),
        lastEditedAt: serverTimestamp()
      };

      await addDoc(collection(db, "vaults"), data);
      toast.success("Login credentials saved successfully.");
      onClose();
    } catch (error) {
      console.error("Error saving vault:", error);
      toast.error("Failed to save login credentials. Please try again.");
    }
  };

  const validateInputs = (currentPassword = password) => {
    let isValid = true;

    const title = titleInputRef.current?.value.trim();
    const email = emailInputRef.current?.value.trim();
    const pass = currentPassword;

    setTitleError('');
    setEmailError('');
    setPasswordError('');

    if (!title) {
      setTitleError('Title is required');
      isValid = false;
    } else if (title.length > 25) {
      setTitleError('Title must be at most 25 characters');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{1,}$/;

    const hasUppercase = /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(pass);

    if (!pass) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!passwordRegex.test(pass)) {
      setPasswordError(
        <>
          <div>
            Password must have at least:
            <ul className="password-error-message">
              <li className={hasUppercase ? 'valid' : 'invalid'}>1 uppercase letter</li>
              <li className={hasNumber ? 'valid' : 'invalid'}>1 number</li>
              <li className={hasSpecialChar ? 'valid' : 'invalid'}>1 special character</li>
            </ul>
          </div>
        </>
      );
      isValid = false;
    }


    return isValid;
  };


  return (
    <ContainerCreate title="Create Login" onClose={onClose} onCreate={handleCreateVault}>
      {/* Title */}
      <div className="vd-main-cnt-field">
        <div className={`vd-input-field ${focusedField === 'title' ? 'vd-input-field-focused' : ''}`} onClick={(e) => handleContainerClick(e, 'title')}>
          <div className="vd-input-section">
            <h6 className="vd-input-title">Title</h6>
            <input
              ref={titleInputRef}
              type="text"
              className="vd-untitle-input vd-input"
              placeholder="Untitled"
              onFocus={() => handleFieldFocus('title')}
              onBlur={handleFieldBlur}
              onChange={(e) => {
                if (titleError) {
                  titleInputRef.current.value = e.target.value;
                  validateInputs();
                }
              }}
            />
            {titleError && (
              <div className="vd-error">
                <p className='vd-error-txt'>
                  <i className="ph-fill ph-warning-circle"></i>{titleError}
                </p>
              </div>
            )}

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
              placeholder="Enter email"
              onFocus={() => handleFieldFocus('email')}
              onBlur={handleFieldBlur}
              onChange={(e) => {
                if (emailError) {
                  emailInputRef.current.value = e.target.value;
                  validateInputs();
                }
              }}
            />
            {emailError && (
              <div className="vd-error">
                <p className='vd-error-txt'>
                  <i className="ph-fill ph-warning-circle"></i>{emailError}
                </p>
              </div>
            )}

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
              onChange={(e) => {
                const newPassword = e.target.value;
                setPassword(newPassword);

                if (passwordError) {
                  validateInputs(newPassword);
                }
              }}
              onFocus={() => {
                handleFieldFocus('password');
                setIsPasswordFocused(true);
              }}
              onBlur={() => {
                handleFieldBlur();
                setIsPasswordFocused(false);
              }}
            />
            {passwordError && (
              <div className="vd-error">
                <p className='vd-error-txt'>
                  <i className="ph-fill ph-warning-circle"></i>{passwordError}
                </p>
              </div>
            )}
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

export default LoginCreate;
