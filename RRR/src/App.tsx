import react from 'react'
import './App.css';
import AuthMiddleware from './middleware/Auth';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import Home from './views/Home';
import User from './views/Auth/User'
import PersistLogin from './components/PersistLogin';
import Navbar from "./components/Navbar2"
import React from "react";
import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { ActiveConversations } from "./components/ActiveConversations";
import { Chat } from "./components/Chat";
import { Conversations } from "./components/Conversations";
import { Navbar2 } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import { AuthContextProvider } from "./contexts/AuthContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";




function App() {
  return<>
    <Navbar />
    <Routes>
   
      <Route path='/' element={<PersistLogin />}>
      <Route
            path="convo"
            element={
              <ProtectedRoute>
                <Conversations />
              </ProtectedRoute>
            }
          />
          <Route
            path="conversations"
            element={
              <ProtectedRoute>
                <ActiveConversations />
              </ProtectedRoute>
            }
          />
          <Route
            path="chats/:conversationName"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        <Route index exact element={<Home />}></Route>
        <Route path='/auth'>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='user' element={<AuthMiddleware />}>
            <Route index element={<User />}></Route>
          </Route>
        </Route>
      </Route>
      {/* <Route path='*' element={<Navigate to='/' />}></Route> */}
    </Routes>
  </>
}

export default App;
