import React, { useState, useEffect } from 'react';
import './PassGenerator.css';
import toast from 'react-hot-toast';
import images from '../../utils/Images'

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

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

  const getStrengthIcon = (strength) => {
    switch (strength) {
      case 'Vulnerable':
        return <i className="fa-solid fa-shield-xmark"></i>;
      case 'Weak':
        return <i className="fa-solid fa-shield-exclamation"></i>;
      case 'Strong':
        return <i className="fa-solid fa-shield-check"></i>;
      default:
        return <i className="fa-solid fa-shield-quartered"></i>;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success('Copied to clipboard!', { icon: null });
      setTimeout(() => setCopyFeedback(''), 3000);
    } catch (err) {
      console.error('Failed to copy password:', err);
      toast.error('Failed to copy!', { icon: null });
      setTimeout(() => setCopyFeedback(''), 3000);
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
          <h5 className="pass-head-txt">Generate Password</h5>
          <div className="pass-btn-row">
            <button onClick={copyToClipboard} className="pass-fill-btn">Fill Password</button>
            <button onClick={generatePassword} className="pass-random-generate-icon"><i className="fa-light fa-arrows-rotate"></i></button>
          </div>
        </div>
        
        <div className="pass-cnt-parent">
          <div className="pass-cnt">
            <div className="pass-output">
              <img src={images.click_to_copy} alt="click to copy image" className='click-to-copy-img' />
              <h5 className='pass-main clickable-password' onClick={copyToClipboard}>
                {showPassword ? renderPasswordWithColors(password) : 'No password generated'}
              </h5>
              {copyFeedback && <span className="copy-feedback">{copyFeedback}</span>}
              <div className={`strength-badge ${passwordStrength.toLowerCase()}`}>
                {getStrengthIcon(passwordStrength)}
                <h5>{passwordStrength}</h5>
              </div>
            </div>

            <div className="pass-length-sec">
              <div className="pass-length-header">
                <h5 className="pass-length-label">Password Length</h5>
                <h5 className="pass-length-value">{length} characters</h5>
              </div>
              <input
                type="range"
                min="8"
                max="20"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="pass-length-slider" />
              <div className="pass-length-marks">
                <h5>8</h5>
                <h5>20</h5>
              </div>
            </div>

            <div className="pass-options-sec">
              <div className="pass-option-item">
                <label className="pass-option-label">Capital letters (A-Z)</label>
                <label className="pass-toggle-switch">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="pass-toggle-input" />
                  <div className="pass-toggle-slider"></div>
                </label>
              </div>

              <div className="pass-option-item">
                <label className="pass-option-label">Include numbers (0-9)</label>
                <label className="pass-toggle-switch">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="pass-toggle-input"
                  />
                  <div className="pass-toggle-slider"></div>
                </label>
              </div>

              <div className="pass-option-item">
                <label className="pass-option-label">Special characters (!&*)</label>
                <label className="pass-toggle-switch">
                  <input
                    type="checkbox"
                    checked={includeSpecialChars}
                    onChange={(e) => setIncludeSpecialChars(e.target.checked)}
                    className="pass-toggle-input"
                  />
                  <div className="pass-toggle-slider"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;