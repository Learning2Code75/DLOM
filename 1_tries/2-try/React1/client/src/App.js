import React,{useEffect} from 'react'
import './App.css'
import dlom from './images/DLOM.svg'


import ProductsPage from './pages/ProductsPage'


const App = ()=>{

  return(
    <div className="container">

      <div className="appBar">
        <h2 clssName="header">
          DLOM
        </h2>
        <img className="headerImg" src={dlom} alt="dlom" height="60" />
      </div>

      <h1> Products </h1>
      <ProductsPage />

      <h1> Clients </h1>
      <div className="clientsFunctionality">
        <div className="clientFuncItem"> <h4>Clients</h4> <button>Clients --> </button> </div>
        <div className="clientFuncItem"> <h4>CRM</h4> <button>CRM --> </button> </div>
      </div>
      {/*for clients crm : */
        <>
          <h3>CRM for clients</h3>
          <div>
            <ul>
              <li>Show clients - all (existing,potential)</li>
              <li>filter search to find existing , potential or using client name</li>
              <li>client add conversation</li>
              <li>show timeline of conversation with order details for existing clients</li>
            </ul>
          </div>
        </>
      }

      <h1> Users </h1>
      <div>
        User login : before entering into system
      </div>
      <div>
      User registration :
        can be done only by the manager , after logging in
      </div>

      <h1> Orders </h1>
      <div>
        <ul>
          <li>Create Order</li>
          <li>View Orders</li>
          <li>Update SO for order</li>
          <li>Update Invoice for order</li>
          <li>Update Warehouse receipt for order</li>
          <li>Update Sales Receipt(Payment Status) for order</li>
          <li>Update Delivery status for order</li>
          <li>Cancel order:update status to cancelled</li>
          <li>Approval workflow for every update shown up</li>
        </ul>
      </div>

    </div>
  )
}

export default App;
