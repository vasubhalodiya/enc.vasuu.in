import React from 'react'
import './App.css'
import Sidebar from './components/SIdebar/Sidebar'
import Home from './pages/Home/Home'
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'

const App = () => {
  const location = useLocation();

  const currentPath = location.pathname;

  const isCustomAlign =
    currentPath === '/' || currentPath === '/trash';
  return (
    <>
    <Sidebar/>
     <div className="app-layout">
        <main className={`main-cnt ${isCustomAlign ? 'custome-align' : ''}`}>
          <AppRoutes />
          {/* <Home /> */}
        </main>
      </div>
    </>
  )
}

export default App