import React,{useEffect,useState} from 'react'
import ProductForm from '../components/ProductForm/ProductForm'
import Products from '../components/Products/Products'
import {getProducts} from '../actions/products'

import Inventory from '../components/Products/Inventory/Inventory'
import Catelog from '../components/Products/Catelog/Catelog'



import {useDispatch} from 'react-redux'

const ProductsPage = ()=>{
  const dispatch = useDispatch();



  const [currentId,setCurrentId] = useState(null);
  const [display,setDisplay] = useState("default");

  useEffect(()=>{
    dispatch(getProducts())
  },[currentId,dispatch])

  return(
    <>
        <div className="productsFunctionality">
          <div className="prodFuncItem"> <h4>Products Management</h4> <button onClick={()=>setDisplay("default")}>Products --> </button> </div>
          <div className="prodFuncItem"> <h4>Inventory</h4> <button onClick={()=>setDisplay("inventory")}>Inventory --> </button> </div>
          <div className="prodFuncItem"> <h4>Catelog</h4> <button onClick={()=>setDisplay("catelog")}>Catelog --> </button> </div>
        </div>

        {(display === "default")&&<>
        <div className="container">
          <div className="grid-2">
            <div className="gridItem">
              <Products currentId={currentId} setCurrentId={setCurrentId} />
            </div>
            <div className="gridItem">
              <ProductForm currentId={currentId} setCurrentId={setCurrentId} />
            </div>
          </div>
        </div>
        </>}

        {(display === "catelog")&& <>
          <Catelog />
        </>}

        {(display === "inventory")&& <>
          <Inventory />
        </>}

    </>

  )

}
export default ProductsPage;
