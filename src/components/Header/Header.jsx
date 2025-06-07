import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import Container from '../container/Container'

function Header() {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)
  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Post', slug: '/all-post', active: authStatus },
    { name: 'Add Post', slug: '/Add-Post', active: authStatus },
  ]

  return (
    <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-lg ">
      <Container>
        <nav className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 px-6 py-2">
            <img
              src="/image-from-rawpixel-id-6479591-png.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-white">BlogBeacon</h1>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-md mx-auto hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <ul className="flex items-center gap-x-4 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block py-2 px-4  text-white font-semibold transition duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white rounded-full hover:scale-105"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
