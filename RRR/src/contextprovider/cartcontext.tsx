import React from "react";
import { getInv } from "../axios";
import { useState, useEffect, createContext, useContext } from "react";

export interface CartItem {
  "productName": string,
  "price": number,
  "img": string
}


const CartContext = createContext<CartItem[]>([])
export default CartContext
