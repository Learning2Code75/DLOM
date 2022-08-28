import React,{useState} from 'react';

const ProdModal = ({prod,setProdModal})=>{
  return <>
    <h1>ProdModal</h1>
    <button onClick={()=>{setProdModal("false")}}>x</button>
  </>
}

export default ProdModal;
