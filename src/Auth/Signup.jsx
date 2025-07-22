import './Auth.css'
import { Link } from 'react-router-dom';
import images from '../utils/Images';

const Signup = () => {
  
  return (
    <>
      <div className="auth">
        <div className="auth-content">
          <div className="auth-heading">
            <Link to="/">
              <img src={images.logo} alt="cinefix-logo" className='logo' />
            </Link>
          </div>
          <div className="auth-form">
            <h2 className='auth-title'>Create Account</h2>
            <div className="auth-input-field">
              <h6 className='auth-input-title'>Username</h6>
              <input type="text" placeholder="Email" className='auth-input' />
            </div>
            <div className="auth-input-field">
              <h6 className='auth-input-title'>Email Address</h6>
              <input type="text" placeholder="Email" className='auth-input' />
            </div>
            <div className="auth-input-field">
              <h6 className='auth-input-title'>Password</h6>
              <input type="password" placeholder="Password" className='auth-input' />
            </div>
            <button className='auth-btn' >Create Account</button>
            <p className='auth-already-account'>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
