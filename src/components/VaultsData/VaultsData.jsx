import React, { useState, useEffect } from 'react';
import '@/common/VaultsCommon.css'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { encryptPassword, decryptPassword } from '@/utils/encryption';

const VaultsData = () => {
  const { vaultId } = useParams();
  const [vaultData, setVaultData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const email = vaultData?.email;
  const password = vaultData?.password;
  const username = vaultData?.username;
  const website = vaultData?.website;
  const note = vaultData?.note;
  const createdAt = vaultData?.createdAt;
  const updatedAt = vaultData?.updatedAt;

  useEffect(() => {
    const fetchVault = async () => {
      if (!vaultId) return;

      try {
        const q = query(collection(db, 'vaults'), where('vaultId', '==', vaultId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          const decrypted = decryptPassword(data.password);
          setVaultData({
            ...data,
            password: decrypted,
            id: doc.id,
          });

        } else {
          console.log('No vault found with vaultId:', vaultId);
          setVaultData(null);
        }
      } catch (error) {
        console.error('Error fetching vault:', error);
        setVaultData(null);
      }
    };

    fetchVault();
  }, [vaultId]);

  if (!vaultData) return <div className="vaultsData">Loading...</div>;

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.dismiss();
      toast.success('Copied to clipboard!', { icon: null });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.dismiss();
      toast.error('Failed to copy!', { icon: null });
    }
  };

  const handleFieldClick = (content, fieldName) => {
    if (fieldName === 'website') {
      if (content && content.trim()) {
        window.open(content, '_blank');
      }
    } else {
      if (content && content.trim()) {
        copyToClipboard(content, fieldName);
      }
    }
  };

  return (
    <div className="vaultsData">
      <div className="vd-header">
        <div className="vd-head-title">
          <h4 className="vd-head-title-txt">My Password</h4>
        </div>
        <div className="vd-sec">
          <div className="vd-create">
            <div><button className="vd-edit-btn"><i className="fa-regular fa-pen"></i>Edit</button></div>
            <div><button className="vd-three-dot-btn mini-master-btn"><i className="fa-regular fa-ellipsis-vertical"></i></button></div>
          </div>
        </div>
      </div>

      <div className="vaultsData-cnt">
        <div className="vd-main-cnt-field">
          <div className="vd-input-field vd-group-box vd-clickable" onClick={() => handleFieldClick(email, 'email')}>
            <div className="vd-icon">
              <i className="fa-light fa-envelope"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Email</h6>
              <p className="vd-email-input vd-input">{email}</p>
            </div>
          </div>

          <div className="vd-input-field vd-group-box vd-clickable" onClick={() => handleFieldClick(password, 'password')}>
            <div className="vd-icon">
              <i className="fa-light fa-key"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Password</h6>
              <p className="vd-password-input vd-input">{showPassword ? password : '*************'}</p>
            </div>
            <div className="vd-pass-btns">
              <button
                className="vd-pass-show-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                  toast.dismiss();
                }}>
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eyes'}`}></i>
              </button>
            </div>
          </div>

          <div className="vd-input-field vd-group-box vd-clickable" onClick={() => handleFieldClick(username, 'username')}>
            <div className="vd-icon">
              <i className="fa-light fa-user"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Username</h6>
              <p className="vd-username-input vd-input">{username}</p>
            </div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-input-field vd-clickable vd-website-field" onClick={() => handleFieldClick(website, 'website')}>
            <div className="vd-icon">
              <i className="fa-light fa-earth-americas"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Websites</h6>
              <p className="vd-website-input vd-input">{website}</p>
            </div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-input-field vd-clickable" onClick={() => handleFieldClick(note, 'note')}>
            <div className="vd-icon">
              <i className="fa-light fa-notes"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Note</h6>
              <p className="vd-note-input vd-input">{note}</p>
            </div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-last-modified-field">
            <div className="vd-icon">
              <i className="fa-regular fa-pen"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Last Modified</h6>
              {/* <p className="vd-note-input vd-input">{updatedAt}</p> */}
              {/* Today at 10:15 PM - this formate */}
            </div>
          </div>
          <div className="vd-last-modified-field">
            <div className="vd-icon">
              <i className="fa-light fa-bolt"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Created</h6>
              {/* <p className="vd-note-input vd-input">{createdAt}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultsData;