import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { useState, useRef } from 'react';
import { db, auth } from '@/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const inputRefs = useRef({});

  const handleFocus = (key) => setFocusedField(key);
  const handleBlur = () => setFocusedField(null);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });

    if (key === 'username') {
      if (!value.trim()) setUsernameError('Username is required');
      else if (value.trim().length > 25) setUsernameError('Username must be at most 25 characters');
      else setUsernameError('');
    }

    if (key === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) setEmailError('Email is required');
      else if (!emailRegex.test(value.trim())) setEmailError('Enter a valid email');
      else setEmailError('');
    }

    if (key === 'password') {
      const pass = value;
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{1,}$/;
      const hasUppercase = /[A-Z]/.test(pass);
      const hasNumber = /\d/.test(pass);
      const hasSpecialChar = /[^A-Za-z0-9]/.test(pass);

      if (!pass) setPasswordError('Password is required');
      else if (!passwordRegex.test(pass)) {
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
      } else setPasswordError('');
    }
  };

  const handleSubmit = async () => {
    if (!formData.username.trim()) setUsernameError('Username is required');
    if (!formData.email.trim()) setEmailError('Email is required');
    if (!formData.password) setPasswordError('Password is required');

    if (
      usernameError || emailError || passwordError ||
      !formData.username || !formData.email || !formData.password
    ) return;

    try {
      // ✅ Firebase Auth signup
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // ✅ Store additional user details in Firestore
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        username: formData.username,
        email: formData.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      toast.success('Account created successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error(error.message);
    }
  };

  const fields = [
    { key: 'username', title: 'Username', icon: 'fa-user', placeholder: 'Enter username' },
    { key: 'email', title: 'Email', icon: 'fa-envelope', placeholder: 'Enter email' },
    { key: 'password', title: 'Password', icon: 'fa-key', isPassword: true, placeholder: 'Enter password' },
    { key: 'login', title: 'Create Account', isButton: true }
  ];

  return (
    <div className="auth">
      <div className="auth-logo">
        <Link to="/" className='back-to-home'>
          <i className="fa-regular fa-arrow-left"></i>
        </Link>
        <Link to="/"><h3 className="encrypt-logo">Encrypt</h3></Link>
        <div></div>
      </div>
      <div className="auth-cnt">
        <div className="auth-heading"><h1 className="auth-heading-title">Create Account</h1></div>
        <div className="auth-main-cnt-field">
          {fields.map((field, index) => (
            field.isButton ? (
              <div
                key={`${field.key}-${index}`}
                className={[
                  'auth-input-field', 'auth-group-box', 'auth-clickable',
                  index === 0 ? 'auth-top-rounded' : '',
                  index === fields.length - 1 ? 'auth-bottom-rounded' : '',
                  index !== 0 && index !== fields.length - 1 ? 'auth-no-rounded' : ''
                ].join(' ').trim()}
                style={{ cursor: 'pointer' }}
                onClick={handleSubmit}
              >
                <div className="auth-icon"><i className={`fa-light ${field.icon}`}></i></div>
                <div className="auth-input-section auth-btn-full">
                  <h6 className="auth-input-title">{field.title}</h6>
                </div>
              </div>
            ) : (
              <div
                key={`${field.key}-${index}`}
                className={[
                  'auth-input-field', 'auth-group-box', 'auth-clickable',
                  focusedField === field.key ? 'auth-input-field-focused' : '',
                  index === 0 ? 'auth-top-rounded' : '',
                  index === fields.length - 1 ? 'auth-bottom-rounded' : '',
                  index !== 0 && index !== fields.length - 1 ? 'auth-no-rounded' : ''
                ].join(' ').trim()}
                onClick={() => {
                  handleFocus(field.key);
                  if (inputRefs.current[field.key]) inputRefs.current[field.key].focus();
                }}
              >
                <div className="auth-icon"><i className={`fa-light ${field.icon}`}></i></div>
                <div className="auth-input-section">
                  <h6 className="auth-input-title">{field.title}</h6>
                  <input
                    type={field.isPassword ? (showPassword ? 'text' : 'password') : 'text'}
                    className={`auth-${field.key}-input auth-input`}
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onFocus={() => handleFocus(field.key)}
                    onBlur={handleBlur}
                    ref={(el) => (inputRefs.current[field.key] = el)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />

                  {field.key === 'username' && usernameError && (
                    <div className="auth-error">
                      <p className="auth-error-txt"><i className="fa-solid fa-hexagon-exclamation"></i>{usernameError}</p>
                    </div>
                  )}
                  {field.key === 'email' && emailError && (
                    <div className="auth-error">
                      <p className="auth-error-txt"><i className="fa-solid fa-hexagon-exclamation"></i>{emailError}</p>
                    </div>
                  )}
                  {field.key === 'password' && passwordError && (
                    <div className="auth-error">
                      <p className="auth-error-txt"><i className="fa-solid fa-hexagon-exclamation"></i>{passwordError}</p>
                    </div>
                  )}
                </div>
                {field.isPassword && (
                  <div className="auth-pass-btns">
                    <button type="button" className="auth-pass-show-icon" onClick={() => setShowPassword((prev) => !prev)}>
                      <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eyes'}`}></i>
                    </button>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
        <div className="auth-already-account">
          <p className="auth-already-account-txt">
            Already have an account? <Link to="/login" className="auth-already-account-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
