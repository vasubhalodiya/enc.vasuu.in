import React, { useEffect, useState } from 'react'
import './App.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast';

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
    <>
      {!isResetLayout && <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      <div className="app-layout">
        <main
          className={`main-cnt 
            ${isCustomAlign ? 'custome-align' : ''} 
            ${isHideSidebar ? 'hide-sidebar' : ''}`}
        >
          <AppRoutes searchQuery={searchQuery} />
          {/* <Home /> */}
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
    </>
  )
}

export default App