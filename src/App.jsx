import React from 'react'
import './App.css'
import Sidebar from './components/SIdebar/Sidebar'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {
  return (
    <>
    <Sidebar/>
     <div className="app-layout">
        <main className="main-cnt">
          {/* <AppRoutes /> */}
          <Dashboard />
        </main>
      </div>
    </>
  )
}

export default App