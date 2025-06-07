import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logoutStore } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logoutStore())
    })
  }

  return (
    <>
      <button
        className="inline-block py-2 px-2 duration-200 hover:bg-blue-100 rounded-full  cursor-pointer"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  )
}

export default LogoutBtn
