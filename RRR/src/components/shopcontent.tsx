import axios from 'axios';
import react from 'react'
import { useEffect, useState, createContext, useContext } from 'react';
import classNames from 'classnames';




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
  "name": string,
  "price": number
}


  

export default function ShopContent() {
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  });
  
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  createContext(cartItems)
  
  

  

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
  }, []);
  

  const onClickHandler = (e) => {
    let a = e.target.parentNode.childNodes[1].innerHTML
    let b = e.target.parentNode.childNodes[2].innerHTML
    let item = {
      "name": a,
      "price": b
    }
    console.log(a,b)
    setCartItems([...cartItems, item])
      
  };
  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])

const addToCartButton = classNames('bx', 'bx-shopping-bag', 'add-cart')
 
  


  return (
  
    <div className="shop-content">
    
      {loading && <div>Loading</div>}
      {!loading && inventory.map((inventory) => (
        <div className="product-box">
          <img src={inventory.img} />
          <h2 className="product-title">
            {inventory.productName.replaceAll('_', ' ')}</h2>
          <div className="price">price: ${inventory.price}</div>
          <div className='id'>stock: {inventory.stock}</div>
          <i className={addToCartButton } onClick={
            (e) =>
          onClickHandler(e)
          }></i>
    
      
  </div>
      )
      )}
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