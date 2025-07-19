import React, { useEffect } from 'react'
import './App.css'
import Sidebar from './components/SidebarNew/Sidebar'
import Home from './pages/Home/Home'
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast';

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isCustomAlign = currentPath === '/' || currentPath === '/trash';
  const hideSidebarRoutes = ["/premium", "/login", "/signup"];
  const isResetLayout = hideSidebarRoutes.includes(location.pathname);

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
      {!isResetLayout && <Sidebar />}
      <div className="app-layout">
        <main className={`main-cnt ${isCustomAlign ? 'custome-align' : ''}`}>
          <AppRoutes />
          {/* <Home /> */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: 'custom-toast',
              duration: 3000
            }}
            containerStyle={{
              bottom: '30px',
            }} />
        </main>
      </div>
    </>
  )
}

export default App