import React, { useState } from 'react';
import './Home.css';
import Vaults from '../../components/Vaults/Vaults';
import VaultsData from '../../components/VaultsData/VaultsData';

const Home = ({ searchQuery }) => {
  const [vaultsLoaded, setVaultsLoaded] = useState(false);
  const [vaultsDataLoaded, setVaultsDataLoaded] = useState(false);

  const isFullyLoaded = vaultsLoaded && vaultsDataLoaded;

  return (
    <>
      <div className="home">
        {!isFullyLoaded ? (
          <div className="home-loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="home-cnt master-cnt">
            <Vaults searchQuery={searchQuery} />
            <VaultsData />
          </div>
        )}
      </div>
      
      {/* Hidden components for loading */}
      <div style={{ display: 'none' }}>
        <Vaults searchQuery={searchQuery} onLoaded={() => setVaultsLoaded(true)} />
        <VaultsData onLoaded={() => setVaultsDataLoaded(true)} />
      </div>
    </>
  );
};

export default Home;
