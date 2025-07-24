import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import PassGenerator from '@/pages/PassGenerator/PassGenerator';
import Premium from '@/pages/Premium/Premium';
import Profile from '@/pages/Profile/Profile';
import Error from '@/pages/Error/Error';
// import { AuthProvider } from "../Auth/AuthContext";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
// import PrivateRoute from "../Auth/PrivateRoute";

const AppRoutes = ({ searchQuery }) => {
  return (
    // <AuthProvider>
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/vault/:vaultId" element={<Home searchQuery={searchQuery} />} />
        <Route path="/generator" element={<PassGenerator />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<Error />} />
      </Routes>
    // </AuthProvider>
  );
};

export default AppRoutes;
