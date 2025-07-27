// import React, { useState, useEffect, useRef } from 'react';
// import '@/common/VaultsCommon.css';
// import toast from 'react-hot-toast';
// import { Link, useParams } from 'react-router-dom';
// import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
// import { db } from '@/firebase';
// import { decryptPassword, encryptPassword } from '@/utils/encryption';

// const VaultsData = () => {
//   const { vaultId } = useParams();
//   const [vaultData, setVaultData] = useState(undefined);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isEditable, setIsEditable] = useState(false);
//   const [editedData, setEditedData] = useState({});
//   const [activeField, setActiveField] = useState(null);
//   const passwordRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (passwordRef.current && !passwordRef.current.contains(e.target)) {
//         setShowPassword(false);
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const fetchVault = async () => {
//       try {
//         const userToken = localStorage.getItem('userToken');  // 🔥 changed
//         if (!userToken) {
//           setVaultData(null);
//           return;
//         }

//         let finalVaultId = vaultId || sessionStorage.getItem('selectedVaultId');
//         if (!finalVaultId) {
//           const snapshot = await getDocs(collection(db, `users/${userToken}/vaults`)); // 🔥 changed
//           if (snapshot.empty) {
//             setVaultData(null);
//             return;
//           }
//           setVaultData(null);
//           return;
//         }

//         const q = query(
//           collection(db, `users/${userToken}/vaults`), // 🔥 changed
//           where('vaultId', '==', finalVaultId)
//         );
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const docSnap = querySnapshot.docs[0];
//           const data = docSnap.data();
//           const decrypted = decryptPassword(data.password);
//           setVaultData({
//             ...data,
//             password: decrypted,
//             id: docSnap.id,
//           });
//           setEditedData({
//             email: data.email || '',
//             password: decrypted || '',
//             username: data.username || '',
//             website: data.website || '',
//             note: data.note || ''
//           });
//           sessionStorage.setItem('selectedVaultId', finalVaultId);
//         } else {
//           console.log('No vault found with vaultId:', finalVaultId);
//           setVaultData(null);
//         }
//       } catch (error) {
//         console.error('Error fetching vault:', error);
//         setVaultData(null);
//       }
//     };

//     fetchVault();
//   }, [vaultId]);

//   // ---------- Return conditions ----------
//   if (vaultData === undefined) {
//     return <div className="vaultsData">
//       <div className="loader-container">
//         <div class="loader"></div>
//       </div>
//     </div>;
//   }

//   if (vaultData === null) {
//     return <div className="vaultsData">
//       No vault found. Please create one.
//     </div>;
//   }

//   // ---------- Helper functions ----------
//   const copyToClipboard = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       toast.dismiss();
//       toast.success('Copied to clipboard!', { icon: null });
//     } catch (err) {
//       console.error('Failed to copy text: ', err);
//       toast.dismiss();
//       toast.error('Failed to copy!', { icon: null });
//     }
//   };

//   const handleFieldClick = (content, fieldName) => {
//     if (!isEditable) {
//       if (fieldName === 'website') {
//         if (content && content.trim()) {
//           window.open(content, '_blank');
//         }
//       } else {
//         if (content && content.trim()) {
//           copyToClipboard(content);
//         }
//       }
//     }
//   };

//   const formatDateTime = (rawDate) => {
//     if (!rawDate) return '';
//     const date = typeof rawDate?.toDate === 'function' ? rawDate.toDate() : new Date(rawDate);
//     if (isNaN(date)) return '';

//     const now = new Date();
//     const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//     const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const diffInDays = Math.floor((nowOnly - dateOnly) / (1000 * 60 * 60 * 24));

//     const timeStr = date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });

//     if (diffInDays === 0) return `Today at ${timeStr}`;
//     if (diffInDays === 1) return `Yesterday at ${timeStr}`;

//     const fullDate = date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });

//     return `${fullDate}, ${timeStr}`;
//   };

//   const handleSave = async () => {
//     try {
//       const userToken = localStorage.getItem('userToken'); // 🔥 changed
//       const vaultRef = doc(db, `users/${userToken}/vaults`, vaultData.id); // 🔥 changed
//       await updateDoc(vaultRef, {
//         email: editedData.email,
//         password: editedData.password ? encryptPassword(editedData.password) : '',
//         username: editedData.username,
//         website: editedData.website,
//         note: editedData.note,
//         lastEditedAt: new Date()
//       });
//       toast.success('Vault updated successfully!');
//       setIsEditable(false);
//       setVaultData((prev) => ({ ...prev, ...editedData }));
//     } catch (error) {
//       console.error('Error updating vault:', error);
//       toast.error('Failed to update vault!');
//     }
//   };

//   const fields = [
//     { key: 'email', icon: 'fa-envelope', label: 'Email' },
//     { key: 'password', icon: 'fa-key', label: 'Password', isPassword: true },
//     { key: 'username', icon: 'fa-user', label: 'Username' },
//   ];
//   const visibleFields = fields.filter((field) => (editedData[field.key] || '').trim());

//   return (
//     <div className="vaultsData">
//       <div className="vd-header">
//         <div className="vd-head-title">
//           <Link to="/" className='back-to-home'>
//             <i className="fa-regular fa-arrow-left"></i>
//           </Link>
//           <h4 className="vd-head-title-txt">{vaultData?.title || 'My Password'}</h4>
//         </div>
//         <div className="vd-sec">
//           <div className="vd-create">
//             {!isEditable ? (
//               <button
//                 className="vd-edit-btn"
//                 onClick={() => {
//                   setIsEditable(true);
//                   setActiveField(visibleFields[0]?.key);
//                   setTimeout(() => {
//                     const firstInput = document.querySelector('.vd-main-cnt-field input');
//                     firstInput?.focus();
//                   }, 0);
//                 }}
//               >
//                 <i className="fa-regular fa-pen"></i>Edit
//               </button>
//             ) : (
//               <div>
//                 <button className="vd-edit-btn" onClick={handleSave}>
//                   Save
//                 </button>
//               </div>
//             )}
//             <div>
//               <button className="vd-three-dot-btn mini-master-btn">
//                 <i className="fa-regular fa-ellipsis-vertical"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="vaultsData-cnt">
//         <div className="vd-main-cnt-field">
//           {visibleFields.map((field, index) => {
//             const fieldClasses = [
//               'vd-input-field',
//               'vd-group-box',
//               'vd-clickable',
//               index === 0 ? 'vd-top-rounded' : '',
//               index === visibleFields.length - 1 ? 'vd-bottom-rounded' : '',
//               index > 0 && index < visibleFields.length - 1 && 'vd-no-rounded',
//               isEditable && activeField === field.key ? 'vd-active-field' : ''
//             ].filter(Boolean).join(' ');

//             if (field.isPassword) {
//               return (
//                 <div
//                   key={field.key}
//                   ref={passwordRef}
//                   className={fieldClasses}
//                   onClick={(e) => {
//                     if (isEditable) {
//                       const input = e.currentTarget.querySelector('input');
//                       input?.focus();
//                       setActiveField(field.key);
//                     } else {
//                       handleFieldClick(editedData[field.key], field.key);
//                     }
//                   }}
//                 >
//                   <div className="vd-icon">
//                     <i className={`fa-light ${field.icon}`}></i>
//                   </div>
//                   <div className="vd-input-section">
//                     <h6 className="vd-input-title">{field.label}</h6>
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       className="vd-password-input vd-input"
//                       value={editedData.password}
//                       onChange={(e) =>
//                         setEditedData((prev) => ({ ...prev, password: e.target.value }))
//                       }
//                       readOnly={!isEditable}
//                     />
//                   </div>
//                   <div className="vd-pass-btns">
//                     <button
//                       className="vd-pass-show-icon"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setShowPassword(!showPassword);
//                         toast.dismiss();
//                       }}
//                     >
//                       <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eyes'}`}></i>
//                     </button>
//                   </div>
//                 </div>
//               );
//             }

//             return (
//               <div
//                 key={field.key}
//                 className={fieldClasses}
//                 onClick={(e) => {
//                   if (isEditable) {
//                     const input = e.currentTarget.querySelector('input');
//                     input?.focus();
//                     setActiveField(field.key);
//                   } else {
//                     handleFieldClick(editedData[field.key], field.key);
//                   }
//                 }}
//               >
//                 <div className="vd-icon">
//                   <i className={`fa-light ${field.icon}`}></i>
//                 </div>
//                 <div className="vd-input-section">
//                   <h6 className="vd-input-title">{field.label}</h6>
//                   <input
//                     type="text"
//                     className={`vd-${field.key}-input vd-input`}
//                     value={editedData[field.key]}
//                     onChange={(e) =>
//                       setEditedData((prev) => ({ ...prev, [field.key]: e.target.value }))
//                     }
//                     readOnly={!isEditable}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {editedData.website && (
//           <div className="vd-main-cnt-field">
//             <div
//               className={[
//                 "vd-input-field",
//                 "vd-clickable",
//                 "vd-website-field",
//                 isEditable && activeField === "website" ? "vd-active-field" : ""
//               ].join(" ")}
//               onClick={(e) => {
//                 if (isEditable) {
//                   const input = e.currentTarget.querySelector("input");
//                   input?.focus();
//                   setActiveField("website");
//                 } else {
//                   handleFieldClick(editedData.website, "website");
//                 }
//               }}
//             >
//               <div className="vd-icon">
//                 <i className="fa-light fa-earth-americas"></i>
//               </div>
//               <div className="vd-input-section">
//                 <h6 className="vd-input-title">Websites</h6>
//                 <input
//                   type="text"
//                   className="vd-website-input vd-input"
//                   value={editedData.website}
//                   onChange={(e) =>
//                     setEditedData((prev) => ({ ...prev, website: e.target.value }))
//                   }
//                   readOnly={!isEditable}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {editedData.note && (
//           <div className="vd-main-cnt-field">
//             <div
//               className={[
//                 "vd-input-field",
//                 "vd-clickable",
//                 isEditable && activeField === "note" ? "vd-active-field" : ""
//               ].join(" ")}
//               onClick={(e) => {
//                 if (isEditable) {
//                   const input = e.currentTarget.querySelector("input");
//                   input?.focus();
//                   setActiveField("note");
//                 } else {
//                   handleFieldClick(editedData.note, "note");
//                 }
//               }}
//             >
//               <div className="vd-icon">
//                 <i className="fa-light fa-notes"></i>
//               </div>
//               <div className="vd-input-section">
//                 <h6 className="vd-input-title">Note</h6>
//                 <input
//                   type="text"
//                   className="vd-note-input vd-input"
//                   value={editedData.note}
//                   onChange={(e) =>
//                     setEditedData((prev) => ({ ...prev, note: e.target.value }))
//                   }
//                   readOnly={!isEditable}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="vd-main-cnt-field">
//           <div className="vd-last-modified-field">
//             <div className="vd-icon">
//               <i className="fa-regular fa-pen"></i>
//             </div>
//             <div className="vd-input-section">
//               <h6 className="vd-input-title">Last Modified</h6>
//               <p className="vd-note-input vd-input">
//                 {formatDateTime(vaultData?.lastEditedAt)}
//               </p>
//             </div>
//           </div>
//           <div className="vd-last-modified-field">
//             <div className="vd-icon">
//               <i className="fa-light fa-bolt"></i>
//             </div>
//             <div className="vd-input-section">
//               <h6 className="vd-input-title">Created</h6>
//               <p className="vd-note-input vd-input">
//                 {formatDateTime(vaultData?.createdAt?.toDate())}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VaultsData;





import React, { useState, useEffect, useRef } from 'react';
import '@/common/VaultsCommon.css';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { decryptPassword, encryptPassword } from '@/utils/encryption';
import { useAuth } from '@/Auth/AuthContext'; // Add this import
import Popup from '../Popup/Popup';

const VaultsData = ({ onLoaded, onVaultDeleted }) => {
  const { vaultId } = useParams();
  const [vaultData, setVaultData] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575);
  const passwordRef = useRef(null);
  const { currentUser } = useAuth();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 575);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      try {

        if (!currentUser?.uid) {
          setVaultData(null);
          onLoaded?.();
          return;
        }

        const getUserDocId = async () => {
          const usersQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
          const usersSnapshot = await getDocs(usersQuery);
          return usersSnapshot.empty ? null : usersSnapshot.docs[0].id;
        };

        const userDocId = await getUserDocId();
        if (!userDocId) {
          setVaultData(null);
          onLoaded?.();
          return;
        }

        let finalVaultId = vaultId || sessionStorage.getItem('selectedVaultId');
        if (!finalVaultId) {
          const snapshot = await getDocs(collection(db, `users/${userDocId}/vaults`));
          if (snapshot.empty) {
            setVaultData(null);
            onLoaded?.();
            return;
          }
          setVaultData(null);
          onLoaded?.();
          return;
        }

        const q = query(
          collection(db, `users/${userDocId}/vaults`),
          where('vaultId', '==', finalVaultId)
        );
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
          sessionStorage.setItem('selectedVaultId', finalVaultId);
        } else {
          setVaultData(null);
        }
        onLoaded?.();
      } catch (error) {
        console.error('Error fetching vault:', error);
        setVaultData(null);
        onLoaded?.();
      }
    };

    fetchVault();
  }, [vaultId, onLoaded, currentUser]); // Add currentUser to dependency array

  if (vaultData === undefined && isMobile) {
    return (
      <div className="vaultsData">
        <div className="mobile-loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  const shouldShowNoVault = vaultData === null;
  const shouldShowVault = vaultData && typeof vaultData === 'object';

  if (shouldShowNoVault) {
    return <div className="vaultsData">
      No vault selected. Please select one.
    </div>;
  }

  if (!shouldShowVault) {
    return <div className="vaultsData"></div>;
  }

  // ---------- Helper functions ----------
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
    const date = typeof rawDate?.toDate === 'function' ? rawDate.toDate() : new Date(rawDate);
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
      if (!currentUser?.uid) {
        toast.error('User not authenticated!');
        return;
      }

      const getUserDocId = async () => {
        const usersQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
        const usersSnapshot = await getDocs(usersQuery);
        return usersSnapshot.empty ? null : usersSnapshot.docs[0].id;
      };

      const userDocId = await getUserDocId();
      if (!userDocId) {
        toast.error('User document not found!');
        return;
      }

      const vaultRef = doc(db, `users/${userDocId}/vaults`, vaultData.id);
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

  const handleDeleteVault = async () => {
    try {
      if (!vaultData?.id) return toast.error("Vault not found!");
      if (!currentUser?.uid) return toast.error("User not authenticated!");

      // Find user document by uid and get its document ID
      const getUserDocId = async () => {
        const usersQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
        const usersSnapshot = await getDocs(usersQuery);
        return usersSnapshot.empty ? null : usersSnapshot.docs[0].id;
      };

      const userDocId = await getUserDocId();
      if (!userDocId) {
        toast.error('User document not found!');
        return;
      }

      await deleteDoc(doc(db, `users/${userDocId}/vaults`, vaultData.id));

      toast.success("Vault deleted successfully!");

      // Immediately remove UI maathi
      setVaultData(null);

      // If parent ne info aapvu hoy (vault list refresh mate)
      onVaultDeleted?.(vaultData.id);

    } catch (error) {
      console.error("Error deleting vault:", error);
      toast.error("Failed to delete vault!");
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
          <Link to="/" className='back-to-home'>
            <i className="fa-regular fa-arrow-left"></i>
          </Link>
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
              <button
                className="vd-delete-btn mini-master-btn"
                onClick={() => setShowDeletePopup(true)}
              >
                <i className="fa-light fa-trash-can"></i>
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
                  ref={passwordRef}
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
      {showDeletePopup && (
        <Popup
          onClose={() => setShowDeletePopup(false)}
          title="Delete Vault"
          description="Are you sure you want to delete this vault? This action cannot be undone."
          cancelText="No, Keep It"
          confirmText="Yes, Delete"
          onConfirm={() => {
            handleDeleteVault();
            setShowDeletePopup(false);
          }}
        />
      )}

    </div>
  );
};

export default VaultsData;
