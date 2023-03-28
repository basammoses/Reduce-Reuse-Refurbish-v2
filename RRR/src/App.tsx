import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import react from 'react'
import './App.css'
import Homepage from './components/homepage'
import InventoryContext from './contextprovider/inventorycontext'
import { Inventory } from './contextprovider/inventorycontext'
import CartContext from './contextprovider/cartcontext'
import { CartItem } from './contextprovider/cartcontext'

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
  
function App() {
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    
    async function fetchData() {
      setLoading(true);
       const {data: response} = await api.get('/');
      setInventory(response)
      setLoading(false);
    }

    fetchData()
  }, [])




  


 

      



  


  // const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <>
      <CartContext.Provider value={cartItems}>
      <InventoryContext.Provider value={inventory}>
        <Homepage />
        </InventoryContext.Provider>
        </CartContext.Provider>
    </>
  )
}

export default App
