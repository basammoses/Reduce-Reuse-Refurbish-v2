import axios from 'axios';
import react from 'react'
import { useEffect, useState } from 'react';

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

  

export default function ShopContent() {
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
  }, []);

  
 

  return (
  
    <div className="shop-content">
    
      {loading && <div>Loading</div>}
      {!loading && inventory.map((inventory) => (
        <div className="product-box">
          <img src={inventory.img} />
          <h2 className={inventory.productName.replaceAll('_', ' ')}></h2>
          <div className="price">${inventory.price}</div>
          <i className="bx bx-shopping-bag add-cart"></i>
    
      
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