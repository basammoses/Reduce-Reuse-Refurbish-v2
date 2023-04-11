import React from "react";
import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ActiveConversations } from "./components/ActiveConversations";
import { Chat } from "./components/Chat";
import { Conversations } from "./components/Conversations";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextProvider } from "./contexts/AuthContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import Homepage from './components/homepage'
import InventoryContext from './contextprovider/inventorycontext'
import { Inventory } from './contextprovider/inventorycontext'
import CartContext from './contextprovider/cartcontext'
import { CartItem } from './contextprovider/cartcontext'
import { AuthProvider } from './firebaseAuth/AuthProvider'
import axios from 'axios'


let config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

export default function App() {
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    async function fetchData() {
      setLoading(true);
      const { data: response } = await api.get('/products');
      setInventory(response)
      setLoading(false);
    }

    fetchData()
  }, [])



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthContextProvider>
              <NotificationContextProvider>
                <Navbar />
              </NotificationContextProvider>
            </AuthContextProvider>
          }
        >
          <Route path="/store" element={<CartContext.Provider value={cartItems}>
          <InventoryContext.Provider value={inventory}>

            <Homepage />

          </InventoryContext.Provider>
        </CartContext.Provider>} />


          <Route
            path="convo"
            element={
              <ProtectedRoute>
                <Conversations />
              </ProtectedRoute>
            }
          />
          <Route
            path="conversations/"
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
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
