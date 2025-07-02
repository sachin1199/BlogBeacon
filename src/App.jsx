import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-lg">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
