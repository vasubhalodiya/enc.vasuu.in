import React, { useRef, useEffect, useState } from 'react';
import ContainerCreate from '../ContainerCreate/ContainerCreate';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { encryptPassword } from '@/utils/encryption';
import toast from 'react-hot-toast';
import { db, auth } from '@/firebase';

const LoginCreate = ({ onClose, onVaultCreated }) => {
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

  const editableFields = [
    {
      key: 'email',
      label: 'Email',
      icon: 'fa-envelope',
      ref: emailInputRef,
      inputClass: 'vd-email-input',
      placeholder: 'Enter email',
      error: emailError,
      onChange: (e) => {
        if (emailError) {
          emailInputRef.current.value = e.target.value;
          validateInputs();
        }
      },
    },
    {
      key: 'password',
      label: 'Password',
      icon: 'fa-key',
      ref: passwordInputRef,
      inputClass: 'vd-password-input',
      placeholder: 'Enter password',
      isPassword: true,
      error: passwordError,
      onChange: (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (passwordError) validateInputs(newPassword);
      },
    },
    {
      key: 'username',
      label: 'Username',
      icon: 'fa-user',
      ref: usernameInputRef,
      inputClass: 'vd-username-input',
      placeholder: 'Enter username',
    },
  ];

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
    if (!validateInputs()) return;

    if (!auth.currentUser) {
      toast.error("User not found! Please login again.");
      return;
    }
    try {
      const usersQuery = query(
        collection(db, 'users'),
        where('uid', '==', auth.currentUser.uid)
      );
      const userDocs = await getDocs(usersQuery);
      
      if (userDocs.empty) {
        toast.error("User document not found!");
        return;
      }

      const userDocId = userDocs.docs[0].id;

      const title = titleInputRef.current.value.trim();
      const email = emailInputRef.current.value.trim();
      const username = usernameInputRef.current.value.trim();
      const website = websiteInputRef.current.value.trim();
      const note = textareaRef.current.value.trim();

      const encryptedPass = encryptPassword(password);

      await addDoc(collection(db, "users", userDocId, "vaults"), {
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
      });

      toast.success("Login credentials saved successfully.");
      
      if (onVaultCreated) {
        onVaultCreated();
      }
      
      if (window.handleVaultCreated) {
        window.handleVaultCreated();
      }
      
      onClose();
    } catch (error) {
      console.error("Error saving vault:", error);
      toast.error("Failed to save login credentials.");
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
                  <i className="fa-solid fa-hexagon-exclamation"></i>{titleError}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="vd-main-cnt-field">
        {editableFields.map((field, index) => (
          <div
            key={field.key}
            className={[
              'vd-input-field',
              'vd-group-box',
              focusedField === field.key && 'vd-input-field-focused',
              index === 0 && 'vd-top-rounded',
              index === editableFields.length - 1 && 'vd-bottom-rounded',
              index > 0 && index < editableFields.length - 1 && 'vd-no-rounded'
            ].filter(Boolean).join(' ')}
            onClick={(e) => handleContainerClick(e, field.key)}>
            <div className="vd-icon">
              <i className={`fa-light ${field.icon}`}></i>
            </div>

            <div className="vd-input-section">
              <h6 className="vd-input-title">{field.label}</h6>
              <input
                ref={field.ref}
                type="text"
                className={`${field.inputClass} vd-input`}
                placeholder={field.placeholder}
                onFocus={() => {
                  handleFieldFocus(field.key);
                  if (field.key === 'password') setIsPasswordFocused(true);
                }}
                onBlur={() => {
                  handleFieldBlur();
                  if (field.key === 'password') setIsPasswordFocused(false);
                }}
                value={
                  field.key === 'password'
                    ? isPasswordFocused
                      ? password : password ? '*************' : ''
                    : undefined
                }
                readOnly={field.key === 'password' && !isPasswordFocused}
                onChange={field.onChange}
              />

              {field.error && (
                <div className="vd-error">
                  <p className="vd-error-txt">
                    <i className="fa-solid fa-hexagon-exclamation"></i> {field.error}
                  </p>
                </div>
              )}
            </div>

            {field.key === 'password' && (
              <div>
                <button className="vd-pass-generate-icon">
                  <i className="fa-light fa-arrows-rotate"></i>
                </button>
              </div>
            )}
          </div>
        ))}
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