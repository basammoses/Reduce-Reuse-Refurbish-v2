import axios from 'axios';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

export function getInv() {
  api.get('/').then(response => {
    let inventory = response.data
    return inventory

  })
}

