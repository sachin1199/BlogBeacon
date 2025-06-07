import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({
    children,
    authentication = true
}) {
    const [loader, setLoader] = useState(true)
    const userStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (authentication && userStatus !== authentication) {
            navigate('/login')
        }
        else if (!authentication && userStatus !== authentication){
        navigate('/')
        }
        setLoader(false)

    },[userStatus,authentication,navigate])


    return loader ? (<h1>loading...</h1>) : <>{ children}</>
}



AuthLayout.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.bool,
}

export default AuthLayout