import '../../pages/Profile/Profile.css'

const ProfileAccount = ({profileTab, dangerZone, setDangerZone }) => {
  return (
    <>
      {profileTab === 'account' && (
        <>
          <div className="profile-section-cnt">
            <div className="profile-account">
              <h6 className="profile-title master-title">General</h6>
              <div className="profile-account-details">
                <div className="profile-account-item">
                  <h4 className="profile-label">Email :</h4>
                  <div className="profile-label-data profile-email">vasu@gmail.com</div>
                </div>
                <div className="profile-account-item">
                  <h4 className="profile-label">Username :</h4>
                  <div className="profile-label-data profile-username"><button>Edit</button></div>
                </div>
                <div className="profile-account-item">
                  <h4 className="profile-label">Password :</h4>
                  <div className="profile-label-data profile-password">Change Pasword</div>
                </div>
              </div>
              <h6 className="profile-title master-title danger">Danger Zone</h6>
              <div className="profile-buttons-section profile-danger-zone">
                <button
                  className={`profile-btn danger-zone ${dangerZone === 'logout' ? 'active' : ''}`}
                  onClick={() => setDangerZone('logout')}>
                  <i className="fa-solid fa-arrow-left-from-bracket"></i>Logout
                </button>
                <button
                  className={`profile-btn danger-zone ${dangerZone === 'deleteAccount' ? 'active' : ''}`}
                  onClick={() => setDangerZone('deleteAccount')}>
                  <i className="fa-solid fa-trash-can"></i>Delete Account
                </button>
              </div>
              <div className="profile-account-details">
                {dangerZone === 'logout' && (
                  <>
                    <div className="profile-section-cnt">
                      <div className="profile-danger-content-section">
                        <h5 className="profile-danger-message">This will logout of your account and end your session. You will need to sign in again to access your data.</h5>
                        <div className="profile-danger-btn">Logout</div>
                      </div>
                    </div>
                  </>
                )}
                {dangerZone === 'deleteAccount' && (
                  <>
                    <div className="profile-section-cnt">
                      <div className="profile-danger-content-section">
                        <h5 className="profile-danger-message">This will permanently delete your account and all of its data. You will not be able to reactivate this account.</h5>
                        <div className="profile-danger-btn">Delete Account</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfileAccount