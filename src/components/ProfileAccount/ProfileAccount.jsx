import { useEffect, useState, useRef } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../../pages/Profile/Profile.css';

const ProfileAccount = ({ profileTab, dangerZone, setDangerZone, setSidebarUsername }) => {
  const [userData, setUserData] = useState({ email: '', username: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [userDocId, setUserDocId] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) return;

        const usersQuery = query(
          collection(db, 'users'),
          where('uid', '==', auth.currentUser.uid)
        );
        const userDocs = await getDocs(usersQuery);

        if (!userDocs.empty) {
          const userDoc = userDocs.docs[0];
          const data = userDoc.data();
          setUserData(data);
          setUsernameInput(data.username);
          setUserDocId(userDoc.id);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Auto focus when edit mode starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Save username to Firestore
  const handleSaveUsername = async () => {
    try {
      if (!userDocId) return;

      const userRef = doc(db, 'users', userDocId);
      await updateDoc(userRef, { username: usernameInput });

      setUserData((prev) => ({ ...prev, username: usernameInput }));
      setSidebarUsername(usernameInput);  // <-- Sidebar instantly update
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <>
      {profileTab === 'account' && (
        <div className="profile-section-cnt">
          <div className="profile-account">
            <h6 className="profile-title master-title">General</h6>
            <div className="profile-account-details">
              <div className="profile-account-item">
                <h4 className="profile-label">Email :</h4>
                <div className="profile-label-data profile-email">{userData.email}</div>
              </div>
              <div className="profile-account-item">
                <h4 className="profile-label">Username :</h4>
                <div className="profile-label-data profile-username">
                  {isEditing ? (
                    <>
                      <input
                        ref={inputRef}
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        className="profile-username-input"
                      />
                      <button className="profile-username-save-icon" onClick={handleSaveUsername}>
                        <i className="fa-regular fa-floppy-disk"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      {userData.username}
                      <button className="profile-username-edit-icon" onClick={() => setIsEditing(true)}>
                        <i className="fa-regular fa-pen"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="profile-account-item">
                <h4 className="profile-label">Password :</h4>
                <div className="profile-label-data profile-password">Change Password</div>
              </div>
            </div>

            <h6 className="profile-title master-title danger">Danger Zone</h6>
            <div className="profile-buttons-section profile-danger-zone">
              <button
                className={`profile-btn danger-zone ${dangerZone === 'logout' ? 'active' : ''}`}
                onClick={() => setDangerZone('logout')}
              >
                <i className="fa-solid fa-arrow-left-from-bracket"></i>Logout
              </button>
              <button
                className={`profile-btn danger-zone ${dangerZone === 'deleteAccount' ? 'active' : ''}`}
                onClick={() => setDangerZone('deleteAccount')}
              >
                <i className="fa-solid fa-trash-can"></i>Delete Account
              </button>
            </div>

            <div className="profile-account-details">
              {dangerZone === 'logout' && (
                <div className="profile-section-cnt">
                  <div className="profile-danger-content-section">
                    <h5 className="profile-danger-message">
                      This will logout of your account and end your session. You will need to sign in again to access your data.
                    </h5>
                    <div className="profile-danger-btn" onClick={handleLogout}>Logout</div>
                  </div>
                </div>
              )}
              {dangerZone === 'deleteAccount' && (
                <div className="profile-section-cnt">
                  <div className="profile-danger-content-section">
                    <h5 className="profile-danger-message">
                      This will permanently delete your account and all of its data. You will not be able to reactivate this account.
                    </h5>
                    <div className="profile-danger-btn">Delete Account</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileAccount;