import React from 'react'
import './Home.css'
import Vaults from '../../components/Vaults/Vaults'
import VaultsData from '../../components/VaultsData/VaultsData'

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-cnt">
          <Vaults />
          <VaultsData />
        </div>
      </div>
    </>
  )
}

export default Home