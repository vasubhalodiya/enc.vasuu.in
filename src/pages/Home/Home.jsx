import React from 'react'
import './Home.css'
import Vaults from '../../components/Vaults/Vaults'
import VaultsDataCreate from '../../components/VaultsDataCreate/VaultsDataCreate'
import VaultsData from '../../components/VaultsData/VaultsData'

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-cnt master-cnt">
          <Vaults />
          {/* <VaultsData /> */}
          <VaultsDataCreate />
        </div>
      </div>
    </>
  )
}

export default Home