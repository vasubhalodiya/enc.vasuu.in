import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { db, auth } from '../../firebase';
import './Home.css';
import Vaults from '../../components/Vaults/Vaults';
import VaultsData from '../../components/VaultsData/VaultsData';

const Home = ({ searchQuery, refreshTrigger }) => {
  const [vaultsLoaded, setVaultsLoaded] = useState(false);
  const [vaultsDataLoaded, setVaultsDataLoaded] = useState(false);
  const [hasData, setHasData] = useState(null);
  const [internalRefresh, setInternalRefresh] = useState(0);

  const handleVaultDeleted = () => {
    setInternalRefresh(prev => prev + 1);
  };

  const handleVaultCreated = () => {
    setVaultsLoaded(false);
    setVaultsDataLoaded(false);
    setHasData(null);
    setInternalRefresh(prev => prev + 1);
    checkData();
  };

  const isFullyLoaded = vaultsLoaded && vaultsDataLoaded && hasData !== null;

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        signOut(auth);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkData = async () => {
    if (!auth.currentUser) return setHasData(false);

    try {
      const usersQuery = query(collection(db, 'users'), where('uid', '==', auth.currentUser.uid));
      const userDocs = await getDocs(usersQuery);

      if (userDocs.empty) return setHasData(false);

      const vaultsQuery = query(collection(db, 'users', userDocs.docs[0].id, 'vaults'));
      const vaultsDocs = await getDocs(vaultsQuery);

      setHasData(!vaultsDocs.empty);
    } catch (error) {
      setHasData(false);
    }
  };

  useEffect(() => {
    checkData();
  }, []);

  useEffect(() => {
    if (refreshTrigger) {
      setVaultsLoaded(false);
      setVaultsDataLoaded(false);
      setHasData(null);
      checkData();
    }
  }, [refreshTrigger]);

  useEffect(() => {
    window.handleVaultCreated = handleVaultCreated;
    return () => {
      delete window.handleVaultCreated;
    };
  }, []);

  return (
    <>
      <div className="home">
        {!isFullyLoaded ? (
          <div className="home-loader-container">
            <div className="loader"></div>
          </div>
        ) : hasData ? (
          <div className="home-cnt master-cnt">
            <Vaults 
              searchQuery={searchQuery} 
              key={`vaults-${refreshTrigger}-${internalRefresh}`} 
            />
            <VaultsData
              key={`vaultsdata-${refreshTrigger}-${internalRefresh}`}
              onVaultDeleted={handleVaultDeleted}
              onLoaded={() => setVaultsDataLoaded(true)}
            />
          </div>
        ) : (
          <div className="home-no-data">
            <div className="no-data-message">
              {/* <img src={images.failure} alt="failure" className='failure-img' /> */}
              <i class="fa-light fa-face-frown-slight"></i>
              <h3 className='failure-txt'>No Data Found</h3>
              <p className='failure-subtxt'>You haven't created any vaults yet. Start by creating your first vault!</p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden components for loading */}
      <div style={{ display: 'none' }}>
        <Vaults 
          searchQuery={searchQuery} 
          onLoaded={() => setVaultsLoaded(true)} 
          key={`hidden-vaults-${refreshTrigger}-${internalRefresh}`} 
        />
        <VaultsData 
          onLoaded={() => setVaultsDataLoaded(true)} 
          key={`hidden-vaultsdata-${refreshTrigger}-${internalRefresh}`} 
        />
      </div>
    </>
  );
};

export default Home;