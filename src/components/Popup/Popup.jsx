import React from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Selected Option</h3>
        <p>This is your selected option detail.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
