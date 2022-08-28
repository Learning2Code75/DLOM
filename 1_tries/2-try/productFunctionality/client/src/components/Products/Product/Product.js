import React,{useState} from 'react'
import moment from 'moment'

import ProdModal from '../ProdModal/ProdModal'

import {useDispatch} from 'react-redux'
import {deleteProduct} from '../../../actions/products'

const Product = ({prod,setCurrentId,currentId})=>{
  // console.log(prod)
  const {createdAt, prodDesc,prodImgUrl,prodName,prodSSN,prodTax,productUnitRate} = prod;
  const [prodModal,setProdModal]=useState("false");
  const dispatch = useDispatch();
  
  return(
    <>
      <div className="prodGridItem">
        <h2>{prodName}</h2>

        <h4>SSN:{prodSSN}</h4>
        <img src={prodImgUrl} height="50" width="150" />
        <p>{prodDesc}</p>
        <div>Tax:{prodTax}</div>
        <div>unitRate:{productUnitRate}</div>
        <div>{moment(createdAt).fromNow()}</div>
              <div>
                <button onClick={()=>{ setCurrentId(prod._id)}} >Update</button>

                <button onClick={()=>{dispatch(deleteProduct(prod._id))}}>Delete</button>
              </div>

              <button onClick={()=>{setProdModal("true")}}>View in detial(modal)</button>
              {prodModal==="true"&&<ProdModal setProdModal={setProdModal} prod={prod}/>}

      </div>
    </>
  );
}

export default Product;
