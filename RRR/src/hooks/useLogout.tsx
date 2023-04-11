//@ts-nocheck

import useAuth from "./useAuth"
import { axiosPrivateInstance } from "../axios/axios"

export default function useLogout() {
  const { setUser, setAccessToken, setCSRFToken } = useAuth()

  const logout = async () => {
    try {
      const response = await axiosPrivateInstance.post("logout")

      setAccessToken(null)
      setCSRFToken(null)
      setUser({})

    } catch (error) {
      console.log(error)
    }
  }

  return logout
}