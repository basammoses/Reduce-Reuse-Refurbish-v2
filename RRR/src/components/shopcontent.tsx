import axios from 'axios';
import react from 'react'
import { useEffect, useState, createContext, useContext, useRef } from 'react';
import classNames from 'classnames';
import InventoryContext from '../contextprovider/inventorycontext';
import { GetShoppingCart } from './cartcontent';




// type Inventory = {
//   "productName": string,
//     "companyName": string,
//     "year": number,
//     "refurbished": boolean,
//     "color": string,
//     "price": number,
//     "size": string,
//     "screen": string,
//     "stock": number,
//     "img": string,

// }


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

interface CartItem {
  "productName": string,
  "price": number
  "img": string
}


  

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});
export default function ShopContent() {

  const childRef = useRef();

  const handleChild = () => {
    if (!childRef.current) return;
    console.log(childRef.current);
    childRef.current.fetchCart();
  }
  
  
 
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // createContext(cartItems)

  const inv = useContext(InventoryContext)

  
  
  

  


  

  const onClickHandler = (inventory) => {
    let a = inventory.productName
    let b = inventory.price
    let c = inventory.img

    let item:CartItem = {
      "productName": a,
      "price": b,
      "img": c
    }
    console.log(a,b)
    setCartItems([...cartItems, item])
    console.log(inv)
    api.post('/cart/add', item).then((response) => {
      childRef.current.fetchCart();
    })
    
    
  };
 
  

  let addToCartButton = classNames('bx', 'bx-shopping-bag', 'add-cart')


 

  


 


  return (
  





   
    <div>
      <header>
        <GetShoppingCart ref={childRef} />
        

      </header>
      <section className="shop container">
        <h2 className="section-title">Shop Refurbished</h2>
        <div className="shop-content">
    
      
      {loading && <div>Loading</div>}
      {!loading && inv.map((inventory) => (
        <div className="product-box">
          <img src={inventory.img} />
          <h2 className="product-title">
            {inventory.productName.replaceAll('_', ' ')}</h2>
          <div className="price">price: ${inventory.price}</div>
          <div className='id'>stock: {inventory.stock}</div>
          <i className={addToCartButton} onClick={
            (e) =>
              onClickHandler(inventory)
          }></i>
        </div>
      )
      )}
        </div>
      </section>
    </div>
  )

  
//   useEffect(() => {
//     const handleData = () => {
//       api.get('/').then(response => {
//         let inv = response.data
//         setInventory(inv)
//         console.log(inventory)
//       })

//       // try {
//       //   setLoading(true)
//       //   const { data } = await api.get('/')
//       //   setLoading(false)
//       //   setInventory(data)
//       //   console.log(inventory)
//       // } catch (error) {
//       //   console.log(error)
//       // }
//     }
//     handleData()
  
//     inventory.forEach(inventory => {
//       console.log(inventory.productName)
//     }
//     )
  

    
//   }, [])
//  return(
  // inventory.forEach(inventory => {
  //   return (
  //     <div className="product-box">
  //       <img src={inventory.img} />
  //       <h2 className={inventory.productName.replaceAll('_', ' ')}></h2>
  //       <div className="price">${inventory.price}</div>
  //       <i className="bx bx-shopping-bag add-cart"></i>
  //     </div>
  //   )
  // })
//   )

}