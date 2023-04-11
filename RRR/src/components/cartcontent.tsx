import React, { Component } from "react";
import {forwardRef, useImperativeHandle} from "react";

import { useState, useEffect,useContext} from "react";
import axios from "axios";
import CartContext from "../contextprovider/cartcontext";
import classNames from "classnames";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
interface CartItem {
  "productName": string,
  "price": number,
  "img": string
}


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

export const GetShoppingCart = forwardRef((props,ref) => {

  const publicRef = {
    fetchCart: () => {
      fetchCart()
    }
  }

  useImperativeHandle(ref, () => publicRef)
  


  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState()


  const openCart = () => {
    const cart = document.querySelector('.cart');

    cart?.classList.add('active')
    fetchCart();
  }
  
  const closeCart = () => {
    const cart = document.querySelector('.cart');

    cart?.classList.remove('active')
      fetchCart();
  }




const axiosPrivateInstance = useAxiosPrivate();
  
  
  
  // const cart = useContext(CartContext)

  

  async function fetchCart() {
    const { data: response1 } = await axiosPrivateInstance.post('/cart/create_cart/');
    const { data: response } = await axiosPrivateInstance.get('/cart/');
    console.log(response[0].products)
    console.log(response)
    setCartItems(response[0].products)
    setTotal(response[0].total_price)

  }


  
  
  

 

  useEffect(() => {
    fetchCart()
    
  }, [])

  

    
  const handleDelete = (item) => {
    console.log(item.productName)
    axiosPrivateInstance.post(`/cart/remove_product/`, { productName: item.productName })
      .then((response) => {
        console.log(response)
        fetchCart()
      })
  
  

    
  
  }

  const handleCheckout = () => {
    axiosPrivateInstance.delete(`/cart/delete_cart/`)
      .then((response) => {
        console.log(response)
        fetchCart()
      })
  }
  
  return (
        <div className="nav container">
          <a href="#" className="logo">Reduce Reuse Refurbish</a>
          <i className='bx bx-shopping-bag' id="cart-icon" onClick={openCart}></i>
      
      <div className="cart">
      {cart.length > 0 ? (
        <h2 className="cart-title">Your Cart</h2>
      ) : (
        <h2 className="cart-title">Your Cart is Empty!, Add some items!</h2>
      )}
        
        {/* {cart.length === 0 && <div className="cart-empty">Your cart is empty</div>} */}
        
        <div className="cart-content">
          
      {cart.length > 0 && cart.map((item) => (
        <div className="cart-box">
        <img src={item.img} alt="" className="cart-img"/>
        <div className="detail-box">
            <div className="cart-product-title">{item.productName.replaceAll('_', ' ')}</div>
        <div className="cart-price">{item.price}</div>
        <input type = "number" value = "1" className = "cart-quantity"/>
        </div>
          <i className='bx bxs-trash-alt cart-remove' onClick={(e)=> handleDelete(item)}>
          </i>
        </div>
    
      ))}
        </div>
      
        {cart.length > 0 && 
        <>
        <div className= 'total'>
              <div className="total-title">Total</div>
          <div className="total-price">${total }</div>
            </div>

          <button type="button" className="btn-buy" onClick={handleCheckout} >Buy Now</button>
          </>}
          
            <i 
            className={`bx bx-x`}  id='close-cart' onClick={closeCart}></i>

          </div>
        </div>



    
        
    
      
      
    
    

  )
}
)

  
