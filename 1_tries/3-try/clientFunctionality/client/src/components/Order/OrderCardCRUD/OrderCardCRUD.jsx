import React, { useState } from "react";

const OrderCardCRUD = () => {
  const [state, setState] = useState({
    clientId: "636672f7d649e0c2f9cc53e9",
    salesperson: "sp1",
    salesOrder: {
      distributorName: "dname1",
      distributorDetails: "daddr dno",
      voucherNo: "vno1",
      dated: "2/12/22",
      modeTermsOfPayment: "cash",
      buyerRefOrderNo: "bron123",
      otherRef: "or123",
      invoiceTo: "buyer1",
      despatchThrough: "fed x",
      destination: "Kolkata",
      termsOfDelivery: "30 day payment",
      soTable: [
        {
          siNo: 1,
          descriptionOfGoods: "prod1",
          dueOn: "22/12/22",
          qty: 2,
          rate: "500",
          per: "unit",
          amount: "1000",
        },
        {
          siNo: 2,
          descriptionOfGoods: "prod2",
          dueOn: "22/12/22",
          qty: 2,
          rate: "1000",
          per: "unit",
          amount: "2000",
        },
        {
          siNo: 3,
          descriptionOfGoods: "prod3",
          dueOn: "22/12/22",
          qty: 1,
          rate: "100",
          per: "unit",
          amount: "100",
        },
      ],
      totalQty: 5,
      totalAmt: "3100",
      amtInWords: "Three Thousand One Hundred Only",
    },
    invoice: {
      distributorName: "dname1",
      distributorDetails: "daddr dno",
      invoiceNo: "inv1",
      dated: "2/12/22",
      deliveryNote: "del note1",
      supplierRef: "sr1",
      otherRef: "or1",
      client: "cli1",
      despatchDocNo: "ddoc1",
      deliveryNoteDate: "13/12/22",
      despatchedThrough: "fed x",
      destination: "Kolkata",
      invTable: [
        {
          siNo: 1,
          descriptionOfGoods: "prod1",
          hsnSAC: "1243",
          GSTRate: "18",
          qty: 2,
          rate: "500",
          per: "unit",
          amount: "1000",
        },
        {
          siNo: 2,
          descriptionOfGoods: "prod2",
          hsnSAC: "1243",
          GSTRate: "18",
          qty: 2,
          rate: "1000",
          per: "unit",
          amount: "2000",
        },
        {
          siNo: 3,
          descriptionOfGoods: "prod3",
          hsnSAC: "1244",
          GSTRate: "18",
          qty: 1,
          rate: "100",
          per: "unit",
          amount: "100",
        },
      ],
      totalQty: 4,
      totalAmount: "3100",
      amtChargableInWords: "Three Thousand Only",
      invTaxTable: [
        {
          hsnSAC: "1243",
          taxableValue: "3000",
          centralTaxRate: "9",
          centralTaxAmt: "270",
          stateTaxRate: "9",
          stateTaxAmt: "270",
        },
        {
          hsnSAC: "1244",
          taxableValue: "100",
          centralTaxRate: "9",
          centralTaxAmt: "9",
          stateTaxRate: "9",
          stateTaxAmt: "9",
        },
      ],
      totalTaxableValue: "3100",
      totalCentralTaxAmt: "279",
      totalStateTaxAmt: "279",
      taxAmtInWords: "Two Hundred and Seventy Nine Only",
      companyPAN: "123456789",
      companyBankDetails: {
        bankName: "bank1",
        acNo: "321564798",
        BranchIFSCode: "bk12354",
      },
      for: "dname1",
    },
    wareHouseReceipt: [
      {
        imgString: "https://daf.adsa.com",
      },
    ],
    salesReceipt: {
      distributorName: "dname1",
      distributorDetails: "daddr dno",
      soldBy: "dname 1",
      date: "4/12/22",
      name: "company1",
      address: "addr1",
      mode: "cash",
      srTable: [
        {
          qty: 2,
          details: "prod1",
          price: "500",
          amount: "1000",
        },
        {
          qty: 2,
          details: "prod2",
          price: "1000",
          amount: "2000",
        },
        {
          qty: 1,
          details: "prod3",
          price: "100",
          amount: "100",
        },
      ],
    },
    orderDelivery: {
      history: [
        {
          timeStamp: "time1",
          status: "Ordered",
        },
        {
          timeStamp: "time2",
          status: "Dispatched",
        },
        {
          timeStamp: "time3",
          status: "Delivered",
        },
      ],
    },
    orderCancel: {
      timeStamp: "",
      state: "",
      desc: "",
    },
    orderPayment: {
      history: [
        {
          timeStamp: "time1",
          amount: "2000",
          method: "cash",
          description: "payment 1",
        },
        {
          timeStamp: "time2",
          amount: "1379",
          method: "cash",
          description: "payment 2",
        },
      ],
    },
  });

  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div>
      <h1> OrderCard CRUD</h1>
      <div>
        <form>
          <div className="formLabel">Client name</div>
          <select
            value={state.clientId}
            onChange={(e) => setState({ ...state, clientId: e.target.value })}
            className="formControl"
            id="clientid"
          >
            <option value="636672f7d649e0c2f9cc53e9">com1 : cp1</option>
            <option value="63667316d649e0c2f9cc53ed">com2 : cp2</option>
          </select>

          <div className="formLabel">salesperson</div>
          <input
            type="text"
            value={state.salesperson}
            onChange={(e) =>
              setState({ ...state, salesperson: e.target.value })
            }
            id="salesperson"
            className="formControl"
          />

          <div>
            <h2>Sales Order</h2>
          </div>

          <div className="formLabel">Distributor name</div>
          <input
            type="text"
            value={state.salesOrder.distributorName}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.distributorName = e.target.value;
              setState(new_state);
            }}
            id="soDistributorName"
            className="formControl"
          />

          <div className="formLabel">Distributor details</div>
          <input
            type="text"
            value={state.salesOrder.distributorDetails}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.distributorDetails = e.target.value;
              setState(new_state);
            }}
            id="soDistributorDetails"
            className="formControl"
          />

          <div className="formLabel">Voucher No.</div>
          <input
            type="text"
            value={state.salesOrder.voucherNo}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.voucherNo = e.target.value;
              setState(new_state);
            }}
            id="soVoucherNo"
            className="formControl"
          />

          <div className="formLabel">Dated</div>
          <input
            type="date"
            value={state.salesOrder.dated}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.dated = e.target.value;
              setState(new_state);
            }}
            id="soDated"
            className="formControl"
          />
          <div className="formLabel">Mode/Terms of Payment</div>
          <input
            type="text"
            value={state.salesOrder.modeTermsOfPayment}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.modeTermsOfPayment = e.target.value;
              setState(new_state);
            }}
            id="soModeTermsOfPayment"
            className="formControl"
          />
          <div className="formLabel">Buyer Ref/ Order No.</div>
          <input
            type="text"
            value={state.salesOrder.buyerRefOrderNo}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.buyerRefOrderNo = e.target.value;
              setState(new_state);
            }}
            id="soBuyerRefOrderNo"
            className="formControl"
          />
          <div className="formLabel">Other Ref</div>
          <input
            type="text"
            value={state.salesOrder.otherRef}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.otherRef = e.target.value;
              setState(new_state);
            }}
            id="soOtherRef"
            className="formControl"
          />
          <div className="formLabel">Invoice To</div>
          <input
            type="text"
            value={state.salesOrder.invoiceTo}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.invoiceTo = e.target.value;
              setState(new_state);
            }}
            id="soInvoiceTo"
            className="formControl"
          />
          <div className="formLabel">Despatch through</div>
          <input
            type="text"
            value={state.salesOrder.despatchThrough}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.despatchThrough = e.target.value;
              setState(new_state);
            }}
            id="soDespatchThrough"
            className="formControl"
          />
          <div className="formLabel">Destination</div>
          <input
            type="text"
            value={state.salesOrder.destination}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.destination = e.target.value;
              setState(new_state);
            }}
            id="soDestination"
            className="formControl"
          />
          <div className="formLabel">Terms Of Delivery</div>
          <input
            type="text"
            value={state.salesOrder.termsOfDelivery}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.termsOfDelivery = e.target.value;
              setState(new_state);
            }}
            id="soTermsOfDelivery"
            className="formControl"
          />

          <div className="formLabel">Total Quantity</div>
          <input
            type="text"
            value={state.salesOrder.totalQty}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.totalQty = e.target.value;
              setState(new_state);
            }}
            id="soTotalQty"
            className="formControl"
          />

          <div className="formLabel">Total Amount</div>
          <input
            type="text"
            value={state.salesOrder.totalAmt}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.totalAmt = e.target.value;
              setState(new_state);
            }}
            id="soTotalAmt"
            className="formControl"
          />

          <div className="formLabel">Amount in Words</div>
          <input
            type="text"
            value={state.salesOrder.amtInWords}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.amtInWords = e.target.value;
              setState(new_state);
            }}
            id="soAmtInWords"
            className="formControl"
          />
        </form>
      </div>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default OrderCardCRUD;
