import React, { useState } from 'react'
import './Home.css'
import Vaults from '../../components/Vaults/Vaults'
import VaultsData from '../../components/VaultsData/VaultsData'
import LoginCreate from '../../components/LoginCreate/LoginCreate'

const Home = () => {
  const [showLoginCreate, setShowLoginCreate] = useState(false);
  return (
    <>
      <div className="home">
        <div className="home-cnt master-cnt">
          <Vaults />
          {/* <VaultsData /> */}
          <button onClick={() => setShowLoginCreate(true)} className="open-login-create-btn">
            Open Login Create
          </button>
          {showLoginCreate && (
            <div className="login-create-wrapper">
              <div className="login-create-overlay"></div>
              <LoginCreate onClose={() => setShowLoginCreate(false)} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home