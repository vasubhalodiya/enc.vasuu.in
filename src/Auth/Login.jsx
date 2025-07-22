import './Auth.css';

const Login = () => {
  const fields = [
    { key: 'username', title: 'Username', value: 'sampleuser', icon: 'fa-user' },
    { key: 'email', title: 'Email', value: 'example@email.com', icon: 'fa-envelope' },
    { key: 'password', title: 'Password', value: '*************', icon: 'fa-key', isPassword: true },
    { key: 'login', title: 'Continue', isButton: true }
  ];

  return (
    <div className="auth">
      <div className="auth-content">
        <div className="auth-heading">
          <h1 className="auth-heading-title">Login</h1>
        </div>
        <div className="auth-main-cnt-field">
          {fields.map((field, index) => (
            <div
              key={`${field.key}-${index}`}
              className={[
                'auth-input-field',
                'auth-group-box',
                'auth-clickable',
                index === 0 ? 'auth-top-rounded' : '',
                index === fields.length - 1 ? 'auth-bottom-rounded' : '',
                index !== 0 && index !== fields.length - 1 ? 'auth-no-rounded' : '',
              ].join(' ').trim()}>
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
                    type={field.isPassword ? 'password' : 'text'}
                    className={`auth-${field.key}-input auth-input`}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}/>

                  <div className="auth-error">
                    <p className="auth-error-txt">
                      <i className="ph-fill ph-warning-circle"></i> hello
                    </p>
                  </div>
                </div>
              )}

              {field.isPassword && (
                <div className="auth-pass-btns">
                  <button className="auth-pass-show-icon">
                    <i className="fa-regular fa-eyes"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="auth-already-account">
          <p className="auth-already-account-txt">
            Don't have an account? <a href="/signup" className="auth-already-account-link">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
