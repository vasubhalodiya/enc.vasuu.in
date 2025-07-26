import React, { useEffect, useState } from 'react'
import './App.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './pages/Profile/Profile';
import Login from './Auth/Login';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isVaultDetailPage = /^\/vault\/[^/]+$/.test(currentPath);
  const isCustomAlign =
    currentPath === '/' ||
    isVaultDetailPage;
  const hideSidebarRoutes = ["/premium", "/login", "/signup"];
  const isHideSidebar = hideSidebarRoutes.includes(currentPath);
  const isResetLayout = hideSidebarRoutes.includes(location.pathname);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarUsername, setSidebarUsername] = useState('');
  
  useEffect(() => {
    const existingKey = localStorage.getItem("encryptionKey");
    if (!existingKey) {
      const newKey = crypto.randomUUID();
      localStorage.setItem("encryptionKey", newKey);
      console.log("Encryption key generated:", newKey);
    }
  }, []);

  useEffect(() => {
    if (isResetLayout) {
      document.body.classList.add("reset-css");
    } else {
      document.body.classList.remove("reset-css");
    }
    return () => document.body.classList.remove("reset-css");
  }, [location.pathname, isResetLayout]);

  return (
    <AuthProvider>
      {!isResetLayout && (
        <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} username={sidebarUsername} />
      )}
      <div className="app-layout">
        <main
          className={`main-cnt 
            ${isCustomAlign ? 'custome-align' : ''} 
            ${isHideSidebar ? 'hide-sidebar' : ''}`}
        >
          <Routes>
            {/* Your existing routes */}
            <Route path="/*" element={<AppRoutes searchQuery={searchQuery} setSidebarUsername={setSidebarUsername} />} />
            {/* Login & Protected Profile route */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile setSidebarUsername={setSidebarUsername} />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: 'custom-toast',
              duration: 3000
            }}
            containerStyle={{
              bottom: '30px',
              zIndex: 999999999999999n,
            }} />
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
