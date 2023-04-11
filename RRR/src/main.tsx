import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './firebaseAuth/AuthProvider'
import { AuthContextProvider } from './store/auth-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  
 
  <BrowserRouter>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
</BrowserRouter>
      
      
   
  ,
  
)
