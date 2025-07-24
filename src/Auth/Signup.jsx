import { Link } from 'react-router-dom';
import './Auth.css';
import { useState, useRef } from 'react';

const Signup = () => {
  const fields = [
    { key: 'username', title: 'Username', value: 'sampleuser', icon: 'fa-user' },
    { key: 'email', title: 'Email', value: 'example@email.com', icon: 'fa-envelope' },
    { key: 'password', title: 'Password', value: 'Hello@123', icon: 'fa-key', isPassword: true },
    { key: 'login', title: 'Create Account', isButton: true }
  ];
  const inputRefs = useRef({});
  const [showPassword, setShowPassword] = useState(false);

  const [focusedField, setFocusedField] = useState(null);
  const handleFocus = (key) => {
    setFocusedField(key);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <>
      <div className="auth">
        <div className="auth-logo">
          <Link to="/" className='back-to-home'>
            <i className="fa-regular fa-arrow-left"></i>
          </Link>
          <Link to="/">
            <h3 className="encrypt-logo">Encrypt</h3>
          </Link>
          <div></div>
        </div>
        <div className="auth-cnt">
          <div className="auth-heading">
            <h1 className="auth-heading-title">Create Account</h1>
          </div>
          <div className="auth-main-cnt-field">
            {fields.map((field, index) => (
              <div
                key={`${field.key}-${index}`}
                className={[
                  'auth-input-field',
                  'auth-group-box',
                  'auth-clickable',
                  focusedField === field.key ? 'auth-input-field-focused' : '',
                  index === 0 ? 'auth-top-rounded' : '',
                  index === fields.length - 1 ? 'auth-bottom-rounded' : '',
                  index !== 0 && index !== fields.length - 1 ? 'auth-no-rounded' : '',
                ].join(' ').trim()}
                onClick={() => {
                  handleFocus(field.key);
                  if (inputRefs.current[field.key]) {
                    inputRefs.current[field.key].focus();
                  }
                }}>

                <div className="auth-icon">
                  <i className={`fa-light ${field.icon}`}></i>
                </div>

                {field.isButton ? (
                  <button className="auth-input-section auth-btn-full" onClick={() => console.log('Submit')}>
                    <h6 className="auth-input-title">{field.title}</h6>
                  </button>
                ) : (
                  <div className="auth-input-section">
                    <h6 className="auth-input-title">{field.title}</h6>

                    <input
                      type={field.isPassword ? (showPassword ? 'text' : 'password') : 'text'}
                      className={`auth-${field.key}-input auth-input`}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      onFocus={() => handleFocus(field.key)}
                      onBlur={handleBlur}
                      ref={(el) => (inputRefs.current[field.key] = el)} />

                    <div className="auth-error">
                      <p className="auth-error-txt">
                        <i className="ph-fill ph-warning-circle"></i> hello
                      </p>
                    </div>
                  </div>
                )}

                {field.isPassword && (
                  <div className="auth-pass-btns">
                    <button
                      type="button"
                      className="auth-pass-show-icon"
                      onClick={() => setShowPassword((prev) => !prev)}>
                      <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eyes'}`}></i>
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
          <div className="auth-already-account">
            <p className="auth-already-account-txt">
              Already have an account? <Link to="/login" className="auth-already-account-link">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
