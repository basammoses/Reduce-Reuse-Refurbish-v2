//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useRefreshToken from '../hooks/useRefreshToken'

export default function PersistLogin() {

    const refresh = useRefreshToken()
    const {  setUser,accessToken, user} = useAuth()
    const [loading, setLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  

  useEffect(() => {
        console.log(accessToken)
        let isMounted = true

      async function verifyUser() {
        
            try {
                await refresh()
                const { data } = await axiosPrivate.get('user')
                setUser(data)
            } catch (error) {
                console.log(error?.response)
            } finally {
                isMounted && setLoading(false)
            
        }
      }

        !accessToken ? verifyUser() : setLoading(false)

        return () => {
            isMounted = false
        }
    }, [])

    return (
         <Outlet />
    )
}
