import React, { useState, useEffect } from 'react';
import './PassGenerator.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*';
    
    let password = [];
    
    // Calculate target counts for each character type (aiming for ~40% numbers + special chars)
    const targetNumbersAndSpecials = Math.floor(length * 0.4); // 40% for numbers and specials combined
    const targetNumbers = includeNumbers ? Math.floor(targetNumbersAndSpecials * 0.6) : 0; // 60% of the 40%
    const targetSpecials = includeSpecialChars ? Math.floor(targetNumbersAndSpecials * 0.4) : 0; // 40% of the 40%
    const targetUppercase = includeUppercase ? Math.floor(length * 0.3) : 0; // 20% uppercase
    const targetLowercase = length - targetNumbers - targetSpecials - targetUppercase; // Rest lowercase
    
    // Add required numbers
    for (let i = 0; i < targetNumbers; i++) {
      password.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    
    // Add required special characters
    for (let i = 0; i < targetSpecials; i++) {
      password.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
    }
    
    // Add required uppercase
    for (let i = 0; i < targetUppercase; i++) {
      password.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    }
    
    // Fill remaining with lowercase
    for (let i = 0; i < targetLowercase; i++) {
      password.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    }
    
    // Shuffle the password array to randomize positions
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }
    
    // Convert array to string
    const finalPassword = password.join('');
    
    setPassword(finalPassword);
    calculateStrength(finalPassword);
  };

  const calculateStrength = (pwd) => {
    let score = 0;
    let feedback = [];

    // Length scoring
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 2;
    if (pwd.length >= 16) score += 1;

    // Character variety scoring
    if (/[a-z]/.test(pwd)) {
      score += 1;
      const lowercaseCount = (pwd.match(/[a-z]/g) || []).length;
      if (lowercaseCount >= pwd.length * 0.3) score += 1;
    }
    
    if (/[A-Z]/.test(pwd)) {
      score += 1;
      const uppercaseCount = (pwd.match(/[A-Z]/g) || []).length;
      if (uppercaseCount >= 2) score += 1;
    }
    
    if (/[0-9]/.test(pwd)) {
      score += 1;
      const numberCount = (pwd.match(/[0-9]/g) || []).length;
      if (numberCount >= 2) score += 1;
    }
    
    if (/[^A-Za-z0-9]/.test(pwd)) {
      score += 2;
    }

    // Pattern detection (reduce score for patterns)
    if (/(.)\1{2,}/.test(pwd)) score -= 1; // Repeated characters
    if (/012|123|234|345|456|567|678|789|890/.test(pwd)) score -= 1; // Sequential numbers
    if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(pwd.toLowerCase())) score -= 1; // Sequential letters

    // Final strength determination
    if (score <= 8) setPasswordStrength('Vulnerable');
    else if (score <= 11) setPasswordStrength('Weak');
    else setPasswordStrength('Strong');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const renderPasswordWithColors = (pwd) => {
    return pwd.split('').map((char, index) => {
      let className = 'password-char';
      if (/[0-9]/.test(char)) {
        className += ' number-char';
      } else if (/[A-Z]/.test(char)) {
        className += ' uppercase-char';
      } else if (/[^A-Za-z0-9]/.test(char)) {
        className += ' special-char';
      } else {
        className += ' lowercase-char';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeNumbers, includeSpecialChars]);

  return (
    <>
      <div className="pass">
          <div className="pass-header">
            <h5 className="pass-head-txt">Password Generator</h5>
            <div className="pass-btn-row">
              <button onClick={copyToClipboard} className="pass-fill-btn">Fill Password</button>
              <button onClick={generatePassword} className="pass-random-generate-icon"><i className="fa-light fa-arrows-rotate"></i></button>
            </div>
          </div>
        <div className="pass-cnt-parent">
          <div className="pass-cnt">
            <div className="pass-output">
              <h5 className='pass-main'>{showPassword ? renderPasswordWithColors(password) : 'No password generated'}</h5>
              <div className={`strength-badge ${passwordStrength.toLowerCase()}`}>
                {passwordStrength}
              </div>
            </div>
          </div>
        </div>
      </div>

{/* ============================================= */}

      <div className="password-generator-container">
        <div className="password-generator-card">

          <div className="password-section">
            
            <div className="strength-indicator">
              <span className="strength-label">Strength:</span>
              <span className={`strength-badge ${passwordStrength.toLowerCase()}`}>
                {passwordStrength}
              </span>
            </div>
          </div>

          <div className="length-section">
            <div className="length-header">
              <label className="length-label">Password Length</label>
              <span className="length-value">{length} characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="20"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="length-slider"
            />
            <div className="length-marks">
              <span>8</span>
              <span>20</span>
            </div>
          </div>

          <div className="options-section">
            <div className="option-item">
              <label className="option-label">Capital letters (A-Z)</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="toggle-input"
                />
                <div className="toggle-slider"></div>
              </label>
            </div>

            <div className="option-item">
              <label className="option-label">Include numbers (0-9)</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="toggle-input"
                />
                <div className="toggle-slider"></div>
              </label>
            </div>

            <div className="option-item">
              <label className="option-label">Special characters (!&*)</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={includeSpecialChars}
                  onChange={(e) => setIncludeSpecialChars(e.target.checked)}
                  className="toggle-input"
                />
                <div className="toggle-slider"></div>
              </label>
            </div>
          </div>

          <div className="history-section">
            <div className="history-header">
              <span className="history-label">Password History</span>
              <span className="coming-soon">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;