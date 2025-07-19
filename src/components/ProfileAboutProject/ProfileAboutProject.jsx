import '../../pages/Profile/Profile.css'

const ProfileAboutProject = ({ profileTab }) => {
  return (
    <>
      {profileTab === 'about' && (
        <>
          <div className="profile-section-cnt">
            <div className="profile-about">
              about
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfileAboutProject