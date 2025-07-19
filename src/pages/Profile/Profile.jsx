import React, { useState } from 'react';
import './Profile.css';
import ProfileAccount from '../../components/ProfileAccount/ProfileAccount';
import ProfileSecurity from '../../components/ProfileSecurity/ProfileSecurity';
import ProfileAboutProject from '../../components/ProfileAboutProject/ProfileAboutProject';

const Profile = () => {
  const [profileTab, setProfileTab] = useState('account');
  const [dangerZone, setDangerZone] = useState('logout');

  return (
    <div className="profile">
      <div className="profile-cnt">
        <div className="profile-buttons-section">
          <button 
            className={`profile-btn ${profileTab === 'account' ? 'active' : ''}`} 
            onClick={() => setProfileTab('account')}>
              <i className="fa-solid fa-face-grin"></i>Account
          </button>
          <button 
            className={`profile-btn ${profileTab === 'security' ? 'active' : ''}`} 
            onClick={() => setProfileTab('security')}>
              <i className="fa-solid fa-shield-halved"></i>Security
          </button>
          <button 
            className={`profile-btn ${profileTab === 'about' ? 'active' : ''}`} 
            onClick={() => setProfileTab('about')}>
              <i className="fa-solid fa-info"></i>About Project
          </button>
        </div>
        <div className="profile-button-main-cnt">
          <ProfileAccount
            profileTab={profileTab} 
            dangerZone={dangerZone} 
            setDangerZone={setDangerZone}
          />
          <ProfileSecurity
            profileTab={profileTab}
          />
          <ProfileAboutProject
            profileTab={profileTab}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

















// import React, { useState, useEffect } from 'react';
// import './Profile.css';
// import ProfileAccount from '../../components/ProfileAccount/ProfileAccount';
// import ProfileSecurity from '../../components/ProfileSecurity/ProfileSecurity';
// import ProfileAboutProject from '../../components/ProfileAboutProject/ProfileAboutProject';

// const Profile = () => {
//   const [profileTab, setProfileTab] = useState('account');
//   const [dangerZone, setDangerZone] = useState('logout');
//   const [openTabDropdown, setOpenTabDropdown] = useState(false);
//   const [selectedTabLabel, setSelectedTabLabel] = useState('Account');
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const tabOptions = [
//     { key: 'account', label: 'Account' },
//     { key: 'security', label: 'Security' },
//     { key: 'about', label: 'About Project' },
//   ];

//   // Window resize listener
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const current = tabOptions.find(opt => opt.key === profileTab);
//     if (current) setSelectedTabLabel(current.label);
//   }, [profileTab]);

//   return (
//     <div className="profile">
//       <div className="profile-cnt">

//         {/* Tabs on Desktop | Dropdown on Mobile */}
//         {windowWidth > 768 ? (
//           <div className="profile-buttons-section">
//             {tabOptions.map(opt => (
//               <button
//                 key={opt.key}
//                 className={`profile-btn ${profileTab === opt.key ? 'active' : ''}`}
//                 onClick={() => setProfileTab(opt.key)}
//               >
//                 <i className={`fa-solid ${
//                   opt.key === 'account' ? 'fa-face-grin' :
//                   opt.key === 'security' ? 'fa-shield-halved' : 'fa-info'
//                 }`}></i>
//                 {opt.label}
//               </button>
//             ))}
//           </div>
//         ) : (
//           <div className="profile-tab-dropdown">
//             <div className="profile-tab-select" onClick={() => setOpenTabDropdown(!openTabDropdown)}>
//               <span>{selectedTabLabel}</span>
//               <i className="fa-solid fa-chevron-down"></i>
//             </div>

//             {openTabDropdown && (
//               <ul className="dropdown-options">
//                 {tabOptions.map(opt => (
//                   <li
//                     key={opt.key}
//                     className={`dropdown-item ${profileTab === opt.key ? 'active' : ''}`}
//                     onClick={() => {
//                       setProfileTab(opt.key);
//                       setOpenTabDropdown(false);
//                     }}
//                   >
//                     {opt.label}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {/* Content */}
//         <div className="profile-button-main-cnt">
//           <ProfileAccount
//             profileTab={profileTab}
//             dangerZone={dangerZone}
//             setDangerZone={setDangerZone}
//           />
//           <ProfileSecurity profileTab={profileTab} />
//           <ProfileAboutProject profileTab={profileTab} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
