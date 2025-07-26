import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Vaults from '@/components/Vaults/Vaults';
import VaultsData from '@/components/VaultsData/VaultsData';
import PassGenerator from '@/pages/PassGenerator/PassGenerator';
import Premium from '@/pages/Premium/Premium';
import Profile from '@/pages/Profile/Profile';
import Error from '@/pages/Error/Error';
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

const AppRoutes = ({ searchQuery, setSidebarUsername }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 575);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Routes>
      {isMobile ? (
        <>
          <Route path="/" element={<Navigate to="/vaults" />} />
          <Route path="/vaults" element={<Vaults searchQuery={searchQuery} />} />
          <Route
            path="/vault/:vaultId"
            element={
              <div className="vault-mobile-page">
                <VaultsData />
              </div>
            }
          />
        </>
      ) : (
        <>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/vault/:vaultId" element={<Home searchQuery={searchQuery} />} />
        </>
      )}

      <Route path="/generator" element={<PassGenerator />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/profile" element={<Profile setSidebarUsername={setSidebarUsername} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
