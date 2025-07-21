
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useEffect, useState } from 'react';

const VaultsData = () => {
  const { vaultId } = useParams();
  const [vaultData, setVaultData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchVault = async () => {
      if (!vaultId) return;
      try {
        const docRef = doc(db, 'vaults', vaultId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setVaultData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching vault:', error);
      }
    };

    fetchVault();
  }, [vaultId]);

  if (!vaultData) return <div className="vaultsData">Loading...</div>;

  const { email, password, username, website, note, createdAt, updatedAt } = vaultData;

  const handleFieldClick = (content, fieldName) => {
    if (fieldName === 'website') {
      if (content && content.trim()) {
        window.open(content, '_blank');
      }
    } else {
      if (content && content.trim()) {
        navigator.clipboard.writeText(content);
        toast.dismiss();
        toast.success('Copied to clipboard!');
      }
    }
  };

  return (
    <div className="vaultsData">
      <div className="vd-header">
        <div className="vd-head-title"><h4 className="vd-head-title-txt">My Password</h4></div>
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
            <div className="vd-icon"><i className="fa-light fa-envelope"></i></div>
            <div className="vd-input-section"><h6>Email</h6><p>{email}</p></div>
          </div>

          <div className="vd-input-field vd-group-box vd-clickable" onClick={() => handleFieldClick(password, 'password')}>
            <div className="vd-icon"><i className="fa-light fa-key"></i></div>
            <div className="vd-input-section"><h6>Password</h6><p>{showPassword ? password : '*************'}</p></div>
            <div className="vd-pass-btns">
              <button onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword); toast.dismiss(); }}>
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eyes'}`}></i>
              </button>
            </div>
          </div>

          <div className="vd-input-field vd-group-box vd-clickable" onClick={() => handleFieldClick(username, 'username')}>
            <div className="vd-icon"><i className="fa-light fa-user"></i></div>
            <div className="vd-input-section"><h6>Username</h6><p>{username}</p></div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-input-field vd-clickable vd-website-field" onClick={() => handleFieldClick(website, 'website')}>
            <div className="vd-icon"><i className="fa-light fa-earth-americas"></i></div>
            <div className="vd-input-section"><h6>Website</h6><p>{website}</p></div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-input-field vd-clickable" onClick={() => handleFieldClick(note, 'note')}>
            <div className="vd-icon"><i className="fa-light fa-notes"></i></div>
            <div className="vd-input-section"><h6>Note</h6><p>{note}</p></div>
          </div>
        </div>

        <div className="vd-main-cnt-field">
          <div className="vd-last-modified-field">
            <div className="vd-icon"><i className="fa-regular fa-pen"></i></div>
            <div className="vd-input-section"><h6>Last Modified</h6><p>{updatedAt}</p></div>
          </div>
          <div className="vd-last-modified-field">
            <div className="vd-icon"><i className="fa-light fa-bolt"></i></div>
            <div className="vd-input-section"><h6>Created</h6><p></p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultsData;