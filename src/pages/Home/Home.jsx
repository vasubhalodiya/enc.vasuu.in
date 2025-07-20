import React from 'react'
import './Home.css'
import Vaults from '../../components/Vaults/Vaults'
import VaultsData from '../../components/VaultsData/VaultsData'
import LoginCreate from '../../components/LoginCreate/LoginCreate'

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-cnt master-cnt">
          <Vaults />
          {/* <VaultsData /> */}
          <LoginCreate />
        </div>
      </div>
    </>
  )
}

export default Home