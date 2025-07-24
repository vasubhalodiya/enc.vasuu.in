import React, { useState, useEffect, useRef } from 'react';
import '@/common/VaultsCommon.css';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { decryptPassword, encryptPassword } from '@/utils/encryption';

const VaultsData = () => {
  const { vaultId } = useParams();
  const [vaultData, setVaultData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [activeField, setActiveField] = useState(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (passwordRef.current && !passwordRef.current.contains(e.target)) {
        setShowPassword(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchVault = async () => {
      if (!vaultId) return;

      try {
        const q = query(collection(db, 'vaults'), where('vaultId', '==', vaultId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          const decrypted = decryptPassword(data.password);
          setVaultData({
            ...data,
            password: decrypted,
            id: docSnap.id,
          });
          setEditedData({
            email: data.email || '',
            password: decrypted || '',
            username: data.username || '',
            website: data.website || '',
            note: data.note || ''
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

  const copyToClipboard = async (text) => {
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
    if (!isEditable) {
      if (fieldName === 'website') {
        if (content && content.trim()) {
          window.open(content, '_blank');
        }
      } else {
        if (content && content.trim()) {
          copyToClipboard(content);
        }
      }
    }
  };

  const formatDateTime = (rawDate) => {
    if (!rawDate) return '';

    const date =
      typeof rawDate?.toDate === 'function' ? rawDate.toDate() : new Date(rawDate);
    if (isNaN(date)) return '';

    const now = new Date();
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffInDays = Math.floor((nowOnly - dateOnly) / (1000 * 60 * 60 * 24));

    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    if (diffInDays === 0) return `Today at ${timeStr}`;
    if (diffInDays === 1) return `Yesterday at ${timeStr}`;

    const fullDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return `${fullDate}, ${timeStr}`;
  };

  const handleSave = async () => {
    try {
      const vaultRef = doc(db, 'vaults', vaultData.id);
      await updateDoc(vaultRef, {
        email: editedData.email,
        password: editedData.password ? encryptPassword(editedData.password) : '',
        username: editedData.username,
        website: editedData.website,
        note: editedData.note,
        lastEditedAt: new Date()
      });
      toast.success('Vault updated successfully!');
      setIsEditable(false);
      setVaultData((prev) => ({ ...prev, ...editedData }));
    } catch (error) {
      console.error('Error updating vault:', error);
      toast.error('Failed to update vault!');
    }
  };

  const fields = [
    { key: 'email', icon: 'fa-envelope', label: 'Email' },
    { key: 'password', icon: 'fa-key', label: 'Password', isPassword: true },
    { key: 'username', icon: 'fa-user', label: 'Username' },
  ];
  const visibleFields = fields.filter((field) => (editedData[field.key] || '').trim());

  return (
    <div className="vaultsData">
      <div className="vd-header">
        <div className="vd-head-title">
          <h4 className="vd-head-title-txt">{vaultData?.title || 'My Password'}</h4>
        </div>
        <div className="vd-sec">
          <div className="vd-create">
            {!isEditable ? (
              <button
                className="vd-edit-btn"
                onClick={() => {
                  setIsEditable(true);
                  setActiveField(visibleFields[0]?.key);
                  setTimeout(() => {
                    const firstInput = document.querySelector('.vd-main-cnt-field input');
                    firstInput?.focus();
                  }, 0);
                }}
              >
                <i className="fa-regular fa-pen"></i>Edit
              </button>
            ) : (
              <div>
                <button className="vd-edit-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
            <div>
              <button className="vd-three-dot-btn mini-master-btn">
                <i className="fa-regular fa-ellipsis-vertical"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="vaultsData-cnt">
        <div className="vd-main-cnt-field">
          {visibleFields.map((field, index) => {
            const fieldClasses = [
              'vd-input-field',
              'vd-group-box',
              'vd-clickable',
              index === 0 ? 'vd-top-rounded' : '',
              index === visibleFields.length - 1 ? 'vd-bottom-rounded' : '',
              index > 0 && index < visibleFields.length - 1 && 'vd-no-rounded',
              isEditable && activeField === field.key ? 'vd-active-field' : ''
            ].filter(Boolean).join(' ');

            if (field.isPassword) {
              return (
                <div
                  key={field.key}
                  ref={passwordRef} // <-- only password field has ref
                  className={fieldClasses}
                  onClick={(e) => {
                    if (isEditable) {
                      const input = e.currentTarget.querySelector('input');
                      input?.focus();
                      setActiveField(field.key);
                    } else {
                      handleFieldClick(editedData[field.key], field.key);
                    }
                  }}
                >
                  <div className="vd-icon">
                    <i className={`fa-light ${field.icon}`}></i>
                  </div>
                  <div className="vd-input-section">
                    <h6 className="vd-input-title">{field.label}</h6>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="vd-password-input vd-input"
                      value={editedData.password}
                      onChange={(e) =>
                        setEditedData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      readOnly={!isEditable}
                    />
                  </div>
                  <div className="vd-pass-btns">
                    <button
                      className="vd-pass-show-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPassword(!showPassword);
                        toast.dismiss();
                      }}
                    >
                      <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eyes'}`}></i>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={field.key}
                className={fieldClasses}
                onClick={(e) => {
                  if (isEditable) {
                    const input = e.currentTarget.querySelector('input');
                    input?.focus();
                    setActiveField(field.key);
                  } else {
                    handleFieldClick(editedData[field.key], field.key);
                  }
                }}
              >
                <div className="vd-icon">
                  <i className={`fa-light ${field.icon}`}></i>
                </div>
                <div className="vd-input-section">
                  <h6 className="vd-input-title">{field.label}</h6>
                  <input
                    type="text"
                    className={`vd-${field.key}-input vd-input`}
                    value={editedData[field.key]}
                    onChange={(e) =>
                      setEditedData((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    readOnly={!isEditable}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {editedData.website && (
          <div className="vd-main-cnt-field">
            <div
              className={[
                "vd-input-field",
                "vd-clickable",
                "vd-website-field",
                isEditable && activeField === "website" ? "vd-active-field" : ""
              ].join(" ")}
              onClick={(e) => {
                if (isEditable) {
                  const input = e.currentTarget.querySelector("input");
                  input?.focus();
                  setActiveField("website");
                } else {
                  handleFieldClick(editedData.website, "website");
                }
              }}
            >
              <div className="vd-icon">
                <i className="fa-light fa-earth-americas"></i>
              </div>
              <div className="vd-input-section">
                <h6 className="vd-input-title">Websites</h6>
                <input
                  type="text"
                  className="vd-website-input vd-input"
                  value={editedData.website}
                  onChange={(e) =>
                    setEditedData((prev) => ({ ...prev, website: e.target.value }))
                  }
                  readOnly={!isEditable}
                />
              </div>
            </div>
          </div>
        )}

        {editedData.note && (
          <div className="vd-main-cnt-field">
            <div
              className={[
                "vd-input-field",
                "vd-clickable",
                isEditable && activeField === "note" ? "vd-active-field" : ""
              ].join(" ")}
              onClick={(e) => {
                if (isEditable) {
                  const input = e.currentTarget.querySelector("input");
                  input?.focus();
                  setActiveField("note");
                } else {
                  handleFieldClick(editedData.note, "note");
                }
              }}
            >
              <div className="vd-icon">
                <i className="fa-light fa-notes"></i>
              </div>
              <div className="vd-input-section">
                <h6 className="vd-input-title">Note</h6>
                <input
                  type="text"
                  className="vd-note-input vd-input"
                  value={editedData.note}
                  onChange={(e) =>
                    setEditedData((prev) => ({ ...prev, note: e.target.value }))
                  }
                  readOnly={!isEditable}
                />
              </div>
            </div>
          </div>
        )}

        <div className="vd-main-cnt-field">
          <div className="vd-last-modified-field">
            <div className="vd-icon">
              <i className="fa-regular fa-pen"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Last Modified</h6>
              <p className="vd-note-input vd-input">
                {formatDateTime(vaultData?.lastEditedAt)}
              </p>
            </div>
          </div>
          <div className="vd-last-modified-field">
            <div className="vd-icon">
              <i className="fa-light fa-bolt"></i>
            </div>
            <div className="vd-input-section">
              <h6 className="vd-input-title">Created</h6>
              <p className="vd-note-input vd-input">
                {formatDateTime(vaultData?.createdAt?.toDate())}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultsData;
