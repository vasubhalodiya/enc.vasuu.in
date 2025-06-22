import React from 'react'
import './Home.css'
import Vaults from '../../components/Vaults/Vaults'

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-cnt">
          <Vaults />
        </div>
      </div>
    </>
  )
}

export default Home