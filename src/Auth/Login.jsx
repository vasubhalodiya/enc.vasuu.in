import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { useState, useRef } from 'react';
import { db } from '@/firebase';
import { query, collection, where, getDocs } from "firebase/firestore";
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const Login = () => {
  const navigate = useNavigate();
  const inputRefs = useRef({});
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleFocus = (key) => setFocusedField(key);
  const handleBlur = () => setFocusedField(null);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });

    // live validation
    if (key === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) setEmailError('Email is required');
      else if (!emailRegex.test(value.trim())) setEmailError('Enter a valid email');
      else setEmailError('');
    }

    if (key === 'password') {
      if (!value.trim()) setPasswordError('Password is required');
      else setPasswordError('');
    }
  };

  const handleLogin = async () => {
    let emailErr = '';
    let passErr = '';

    if (!formData.email.trim()) emailErr = 'Email is required';
    if (!formData.password.trim()) passErr = 'Password is required';

    setEmailError(emailErr);
    setPasswordError(passErr);

    if (emailErr || passErr) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // **NEW: Get user document id**
      const q = query(collection(db, "users"), where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userToken = querySnapshot.docs[0].id;  // document id
        localStorage.setItem("userToken", userToken); // store id in localStorage
      } else {
        toast.error("User document not found");
      }

      toast.success('Login successfully');
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setGeneralError('Invalid email or password');
      } else {
        setGeneralError('Something went wrong');
      }
    }
  };

  const fields = [
    { key: 'email', title: 'Email', icon: 'fa-envelope', placeholder: 'Enter email' },
    { key: 'password', title: 'Password', icon: 'fa-key', isPassword: true, placeholder: 'Enter password' },
    { key: 'login', title: 'Login', isButton: true }
  ];

  return (
    <div className="auth">
      <div className="auth-logo">
        <Link to="/" className="back-to-home"><i className="fa-regular fa-arrow-left"></i></Link>
        <Link to="/"><h3 className="encrypt-logo">Encrypt</h3></Link>
        <div></div>
      </div>
      <div className="auth-cnt">
        <div className="auth-heading"><h1 className="auth-heading-title">Login</h1></div>

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
                onClick={handleLogin}
              >
                <div className="auth-icon">
                  <i className={`fa-light ${field.icon}`}></i>
                </div>
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
                <div className="auth-icon">
                  <i className={`fa-light ${field.icon}`}></i>
                </div>
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
                        handleLogin();
                      }
                    }}
                  />
                  {field.key === 'email' && emailError && (
                    <div className="auth-error">
                      <p className="auth-error-txt">
                        <i className="fa-solid fa-hexagon-exclamation"></i> {emailError}
                      </p>
                    </div>
                  )}
                  {field.key === 'password' && passwordError && (
                    <div className="auth-error">
                      <p className="auth-error-txt">
                        <i className="fa-solid fa-hexagon-exclamation"></i> {passwordError}
                      </p>
                    </div>
                  )}
                </div>
                {field.isPassword && (
                  <div className="auth-pass-btns">
                    <button
                      type="button"
                      className="auth-pass-show-icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eyes'}`}></i>
                    </button>
                  </div>
                )}
              </div>
            )
          ))}
        </div>

        {generalError && (
          <div className="auth-error" style={{ marginTop: '10px' }}>
            <p className="auth-error-txt"><i className="fa-solid fa-hexagon-exclamation"></i>{generalError}</p>
          </div>
        )}

        <div className="auth-already-account">
          <p className="auth-already-account-txt">
            Don't have an account? <Link to="/signup" className="auth-already-account-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
