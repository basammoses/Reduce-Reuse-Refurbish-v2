import React from "react";
import { getInv } from "../axios/axios";
import { useState, useEffect } from "react";
import axios from "axios";
import ShopContent from "./shopcontent";
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
    
  
    useEffect(() => {
      const fetchData = async () =>{
        setLoading(true);
        try {
          const {data: response} = await api.get('/');
          setInventory(response);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
  
      fetchData();
      console.log
    }, []);
  
  
    


  
  
  
  
  return (

    <div>
      <header>
        <div className="nav container">
          <a href="#" className="logo">Reduce Reuse Refurbish</a>
          <i className='bx bx-shopping-bag' id="cart-icon"></i>
          
          <div className="cart">
            <h2 className="cart-title">Your Cart</h2>
            <div className="cart-content">


            </div>
            <div className= 'total'>
              <div className="total-title">Total</div>
              <div className="total-price">$</div>
            </div>

            <button type="button" className="btn-buy ">Buy Now</button>
            <i className='bx bx-x' id='close-cart'></i>

          </div>
        </div>

      </header>
      <section className="shop container">
        <h2 className="section-title">Shop Refurbished</h2>
        <div className="shop-content">
          <ShopContent  />
        </div>
      </section>
    </div>
  );
}