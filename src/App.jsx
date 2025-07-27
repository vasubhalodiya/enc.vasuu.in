import React, { useEffect, useState } from 'react'
import './App.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import { useLocation, Navigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './Auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './pages/Profile/Profile';
import Login from './Auth/Login';
import { Routes, Route } from 'react-router-dom';

const AppContent = () => {
  const { currentUser } = useAuth(); 
  const location = useLocation();
  const currentPath = location.pathname;
  const isVaultDetailPage = /^\/vault\/[^/]+$/.test(currentPath);
  const isCustomAlign = currentPath === '/' || isVaultDetailPage;
  const hideSidebarRoutes = ["/premium", "/login", "/signup"];
  const isHideSidebar = hideSidebarRoutes.includes(currentPath);
  const isResetLayout = hideSidebarRoutes.includes(location.pathname);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarUsername, setSidebarUsername] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleVaultCreated = () => setRefreshTrigger(prev => prev + 1);

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

  // *** ONLY 1 LINE ADDED ***
  if (!currentUser && location.pathname !== "/login" && location.pathname !== "/signup") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {!isResetLayout && (
        <Sidebar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          username={sidebarUsername} 
          setUsername={setSidebarUsername}
          onVaultCreated={handleVaultCreated}
        />
      )}
      <div className="app-layout">
        <main className={`main-cnt ${isCustomAlign ? 'custome-align' : ''} ${isHideSidebar ? 'hide-sidebar' : ''}`}>
          <Routes>
            <Route path="/*" element={
              <AppRoutes 
                searchQuery={searchQuery} 
                setSidebarUsername={setSidebarUsername} 
                refreshTrigger={refreshTrigger} />
            }/>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile setSidebarUsername={setSidebarUsername} />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster
            position="bottom-center"
            toastOptions={{ className: 'custom-toast', duration: 3000 }}
            containerStyle={{ bottom: '30px', zIndex: 999999999999999n }}
          />
        </main>
      </div>
    </>
  )
}

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
