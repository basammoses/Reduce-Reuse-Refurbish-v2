//@ts-nocheck

import { axiosInstance } from "../axios/axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAccessToken, setCSRFToken } = useAuth()

  const refresh = async () => {
    const response = await axiosInstance.post('refresh-token')
    setAccessToken(response.data.access)
    setCSRFToken(response.headers["x-csrftoken"])
    console.log(response)

    return { accessToken: response.data.access, csrfToken: response.headers["x-csrftoken"] }
  }

  return refresh
}