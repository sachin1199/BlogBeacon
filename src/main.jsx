import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      {
        path: '/all-post',
        element: (
          <AuthLayout>
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout>
            <AddPost />
          </AuthLayout>
        ),
      },

      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: (
          <AuthLayout>
            <Post />
          </AuthLayout>
        ),
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
