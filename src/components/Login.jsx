import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { loginStore } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { Input, Button } from './index'

function Login() {
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data)

      if (session) {
        const userData = await authService.getCurrentUser(session)
        if (userData) {
          dispatch(loginStore({ userData }))
        }
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex justify-center">
      {error && <p className=" text-red-500 text-center mt-8">{error}</p>}

      <form onSubmit={handleSubmit(login)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your Email"
          {...register('email', {
            required: true,
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Email address must be a valid address',
            },
          })}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password', {
              required: true,
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] text-sm text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  )
}

export default Login
