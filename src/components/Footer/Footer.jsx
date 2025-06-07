import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <img
              src="/image-from-rawpixel-id-6479591-png.png"
              alt="logo"
              className="w-12 h-12 mb-4"
            />
            <p className="text-lg text-center md:text-left text-gray-300">
              BlogBeacon — A platform for insightful blogs and discussions.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center md:text-left">
              <h5 className="text-lg font-bold mb-3">Quick Links</h5>
              <ul>
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-amber-500 transition duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-post"
                    className="text-gray-300 hover:text-amber-500 transition duration-200"
                  >
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-post"
                    className="text-gray-300 hover:text-amber-500 transition duration-200"
                  >
                    Add Post
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h5 className="text-lg font-bold mb-3">Connect With Us</h5>
              <ul className="flex gap-6 justify-center md:justify-start">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-500 transition duration-200"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-500 transition duration-200"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-500 transition duration-200"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-500 transition duration-200"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 mt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BlogBeacon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
