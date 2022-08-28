import React from 'react'

import {useSelector} from 'react-redux'
import Product from './Product/Product'



const Products = ({setCurrentId,currentId})=>{
  const products = useSelector((state)=>state.products)
  console.log(products)
  return(
    !products.length ? "Loading..":
    <>
      <div className="grid-3">
        {
          products.map((prod)=>(
            <div key={prod._id}  className="gridItem" >
              <Product prod={prod} setCurrentId={setCurrentId} currentId={currentId} />
            </div>
          ))
        }

      </div>
    </>
  );
}

export default Products;
