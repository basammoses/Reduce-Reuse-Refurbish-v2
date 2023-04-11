import React from "react";
import { getInv } from "../axios";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

export interface Inventory {
  "color": string,
  "id": number,
  "img": string,
  "price": number,
  "productName": string,
  "refurbished": boolean,
  "screen": string,
  "size": string,
  "stock": number,
  "year": number
}

// const [inventory, setInventory] = useState<Inventory[]>([])

// async function fetchData() {
//     const {data: response} = await api.get('/');
//   setInventory(response)
// }

// fetchData()


const InventoryContext = createContext<Inventory[]>([])
export default InventoryContext





