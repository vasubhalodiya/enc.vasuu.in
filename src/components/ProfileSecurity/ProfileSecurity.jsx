import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import toast from 'react-hot-toast';

const SESSION_KEY = "userSession";
const SESSION_DURATION = 1 * 60 * 1000; // 1 min inactivity logout

let logoutTimer = null; // global timer

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ----------------- Session Handling -----------------
  const startSession = () => {
    const expiresAt = Date.now() + SESSION_DURATION;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ expiresAt }));
    resetLogoutTimer();
    addActivityListeners();
  };

  const resetLogoutTimer = () => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      sessionStorage.removeItem(SESSION_KEY);
      toast.error('Session expired');
      navigate('/login');
    }, SESSION_DURATION);
  };

  const addActivityListeners = () => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event =>
      window.addEventListener(event, resetLogoutTimer)
    );
  };

  const removeActivityListeners = () => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event =>
      window.removeEventListener(event, resetLogoutTimer)
    );
  };

  useEffect(() => {
    return () => {
      removeActivityListeners();
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, []);

  // ----------------- Login Handler -----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successfully');
      startSession(); // <-- start inactivity session timer
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password');
    }
    setIsLoading(false);
  };

  // ----------------- UI -----------------
  return (
    <>
      {isLoading ? (
        <div className="auth-loading">
          <div className="film-loader">
            <div className="reel left-reel"></div>
            <div className="strip"></div>
            <div className="reel right-reel"></div>
          </div>
          <h3>🍿 Popcorn Ready ? We're Loading...</h3>
        </div>
      ) : (
        <div className="auth">
          <div className="auth-content">
            <div className="auth-heading">
              <Link to="/">
                <img src="/logo.png" alt="cinefix-logo" className="logo" />
              </Link>
            </div>
            <div className="auth-form">
              <h2 className="auth-title">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="auth-input-field">
                  <h6 className="auth-input-title">Email Address</h6>
                  <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="auth-input-field">
                  <h6 className="auth-input-title">Password</h6>
                  <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="auth-btn" type="submit" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <p className="auth-already-account">
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
