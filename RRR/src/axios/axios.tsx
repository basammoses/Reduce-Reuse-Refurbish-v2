import axios from 'axios';


const api = axios.create({
  baseURL: 'https://reduce.herokuapp.com/'
});

export function getInv() {
  api.get('/').then(response => {
    let inventory = response.data
    return inventory

  })
}

const API_URL = "https://reduce.herokuapp.com/"

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export const axiosPrivateInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

