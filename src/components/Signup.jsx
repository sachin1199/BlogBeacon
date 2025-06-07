import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStore } from '../store/authSlice'
import authService from '../appwrite/auth'
import { Input, Button } from './index'

function Signup() {
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const create = async (data) => {
    console.log(data)
    setError('')
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(loginStore({ userData }))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex justify-center">
      {error && <p className="text-red-500 px-1 ml-1">{error}</p>}
      <form onSubmit={handleSubmit(create)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Enter Your full name"
          {...register('name', {
            required: true,
          })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter Your Email"
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
            placeholder="Enter Your password"
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

        <Button className="w-full" type="submit">
          Create Account
        </Button>
      </form>
    </div>
  )
}

export default Signup
