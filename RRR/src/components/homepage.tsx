import React, {forwardRef, useImperativeHandle,useRef} from "react";
import { getInv } from "../axios/axios";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import ShopContent from "./shopcontent";
import "../index.css";
import InventoryContext from "../contextprovider/inventorycontext";
import { GetShoppingCart } from "./cartcontent";
  
import CartContext from "../contextprovider/cartcontext";
interface Inventory {
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

export default function Homepage() {

  



 
  


  
  
    const api = axios.create({
      baseURL: 'http://127.0.0.1:8000'
    });
    
    const [inventory, setInventory] = useState<Inventory[]>([])
    const [loading, setLoading] = useState(false)
  const data = useContext(InventoryContext)
  
  
    // useEffect(() => {
    //   const fetchData = async () =>{
    //     setLoading(true);
    //     try {
    //       const {data: response} = await api.get('/');
    //       setInventory(response);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     setLoading(false);
    //   }
  
    //   fetchData();
    //   console.log
    // }, []);
  
 

    


  
  
  
  
  return (

    <ShopContent></ShopContent>
  );
}