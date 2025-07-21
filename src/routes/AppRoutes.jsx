import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Trash from '@/pages/Trash/Trash';
import PassGenerator from '@/pages/PassGenerator/PassGenerator';
import Settings from '@/pages/Setting/Setting';
import Premium from '@/pages/Premium/Premium';
import Profile from '@/pages/Profile/Profile';
import Error from '@/pages/Error/Error';

const AppRoutes = ({ searchQuery }) => {
  return (
    <Routes>
      <Route path="/" element={<Home searchQuery={searchQuery} />} />
      <Route path="/vault/:vaultId" element={<Home searchQuery={searchQuery} />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/generator" element={<PassGenerator />} />
      {/* <Route path="/setting" element={<Settings />} /> */}
      <Route path="/premium" element={<Premium />} />
      <Route path="/profile" element={<Profile />} />
      
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
