import axios from 'axios';
import e from 'express';
import jwtDecode from 'jwt-decode';
import { useContext } from 'react';
import { useNavigate, redirect } from 'react-router';

const api = axios.create({
  baseURL: 'http://localhost:8000',
})



export const setAuthToken = (token: any) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('jwtToken', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}



export const login = (username: any, password: any) => {
  
  return api
    .post('/api-token-auth/', { username, password })
    .then((res) => {
      localStorage.removeItem('jwtToken');
      setAuthToken(res.data.refresh);
      console.log(jwtDecode(res.data.refresh))
      return jwtDecode(res.data.refresh);
      
    }).then(() => {
      redirect('/')
    } )
    .catch((err) => console.log(err));
}

export const logout = () => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  window.location.href = '/';
}

export const register = (username: any,email:any, password: any, ) => {
  return api
    .post('/users/', {
      username,
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export const checkToken = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    const currentTime = Date.now() / 1000;
    const user = jwtDecode(token);
    console.log(user)
    if (user.exp < currentTime) {
      logout();
      window.location.href = '/';
    } else {
      setAuthToken(token);
      return user;
    }
  }
  if (!token) {
    logout();
    window.location.href = '/';
  }
}



