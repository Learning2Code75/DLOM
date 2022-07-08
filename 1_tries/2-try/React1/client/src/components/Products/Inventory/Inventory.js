import React from 'react';

const Inventory = ()=>{
  return(
    <>
    <h1>Inventory</h1>
    <div>
      <ul>
        <li>View all products </li>
        <li>enter product sku in search / product name / </li>
        <li>select the product</li>
        <li>update the qty (only can be increased )</li>
        <li>qty in pending state when order is in placed state --> shipped state </li>
        <li>qty automatically decreased when order reaches shipped state</li>
      </ul>
    </div>

  </>)

}

export default Inventory;
