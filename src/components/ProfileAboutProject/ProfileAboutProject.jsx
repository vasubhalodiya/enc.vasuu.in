import '../../pages/Profile/Profile.css'

const ProfileAboutProject = ({ profileTab }) => {
  return (
    <>
      {profileTab === 'about' && (
        <div className="profile-section-cnt">
          <div className="profile-about">
            <div className="profile-about-part">
              <div className="about-field">
                <h4 className='about-field-title'>Portfolio: </h4>
                <p className='about-field-link'>
                  <a href="https://vasubhalodiya.in" target="_blank">vasubhalodiya.in</a>
                </p>
              </div>
              <div className="about-field">
                <h4 className='about-field-title'>Github: </h4>
                <p className='about-field-link'>
                  <a href="https://github.com/vasubhalodiya" target="_blank">github/vasubhalodiya</a>
                </p>
              </div>
              <div className="about-field">
                <h4 className='about-field-title'>LinkedIn: </h4>
                <p className='about-field-link'>
                  <a href="https://www.linkedin.com/in/vasubhalodiya" target="_blank">linkedin/vasubhalodiya</a>
                </p>
              </div>
            </div>
            <div className="profile-about-part">
              <p className='profile-about-inspired'>Inspired by Proton Pass, built with a personal touch for better privacy and simplicity.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileAboutProject;
