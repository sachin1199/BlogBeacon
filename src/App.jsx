import React, { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { loginStore, logoutStore } from './store/authSlice'
import { useDispatch } from 'react-redux'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch=useDispatch()


  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
          dispatch(loginStore({ userData }))

      }
      else {
        dispatch(logoutStore())
      }
}).finally(()=>setLoading(false))
    
  },[])
  
  
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-lg">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : null
  
}

export default App