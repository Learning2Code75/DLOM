import React, { useState } from "react";
import SoTableEntry from "./SoTableEntry";
import uuid from "react-uuid";
import { useEffect } from "react";
import numWords from "num-words";
import { useMutation } from "@apollo/client";
import { ADD_ORDER, UPDATE_ORDER } from "../../../mutations/dlomOrderMutation";
import { GET_ORDERS } from "../../../queries/dlomOrderQueries";
import ViewOrders from "./ViewOrders";

const OrderCardCRUD = () => {
  const [state, setState] = useState({
    id: "",
    clientId: "636672f7d649e0c2f9cc53e9",
    salesperson: "sp1",
    salesOrder: {
      distributorName: "dname1",
      distributorDetails: "daddr dno",
      voucherNo: "vno1",
      dated: "2022-12-02",
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
          dueOn: "2022-12-20",
          qty: 2,
          rate: "500",
          per: "unit",
          amount: "1000",
        },
        {
          siNo: 2,
          descriptionOfGoods: "prod2",
          dueOn: "2022-12-20",
          qty: 2,
          rate: "1000",
          per: "unit",
          amount: "2000",
        },
        {
          siNo: 3,
          descriptionOfGoods: "prod3",
          dueOn: "2022-12-20",
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

  const [currOrder, setCurrOrder] = useState("");

  const [addOrder] = useMutation(ADD_ORDER, {
    variables: {
      clientId: state.clientId,
      salesperson: state.salesperson,
      salesOrder: state.salesOrder,
      invoice: state.invoice,
      wareHouseReceipt: state.wareHouseReceipt,
      salesReceipt: state.salesReceipt,
      orderDelivery: state.orderDelivery,
      orderCancel: state.orderCancel,
      orderPayment: state.orderPayment,
    },
    refetchQueries: [{ query: GET_ORDERS }],
  });

  const [updateOrder, { data, loading, error }] = useMutation(UPDATE_ORDER, {
    variables: {
      id: state.id,
      clientId: state.clientId,
      salesperson: state.salesperson,
      salesOrder: state.salesOrder,
      invoice: state.invoice,
      wareHouseReceipt: state.wareHouseReceipt,
      salesReceipt: state.salesReceipt,
      orderDelivery: state.orderDelivery,
      orderCancel: state.orderCancel,
      orderPayment: state.orderPayment,
    },
    refetchQueries: [
      {
        query: GET_ORDERS,
        variables: { id: state.id },
      },
    ],
  });

  const calcTotalQty = () => {
    let qty = 0;
    for (let i = 0; i < state.salesOrder.soTable.length; i++) {
      qty = parseFloat(qty) + parseFloat(state?.salesOrder?.soTable[i]?.qty);
    }

    return qty;
  };
  const calcTotalAmount = () => {
    let amt = 0;
    for (let i = 0; i < state.salesOrder.soTable.length; i++) {
      amt = parseFloat(amt) + parseFloat(state.salesOrder.soTable[i].amount);
    }

    return amt;
  };

  const calcNumWords = (a) => {
    let amt = "";
    amt = numWords(a) + " only";
    return amt;
  };

  const addOrderSubmit = (e) => {
    e.preventDefault();
    addOrder(
      state.clientId,
      state.salesperson,
      state.salesOrder,
      state.invoice,
      state.wareHouseReceipt,
      state.salesReceipt,
      state.orderDelivery,
      state.orderCancel,
      state.orderPayment
    );
  };

  const updateOrderSubmit = (e) => {
    e.preventDefault();
    updateOrder(
      state.id,
      state.clientId,
      state.salesperson,
      state.salesOrder,
      state.invoice,
      state.wareHouseReceipt,
      state.salesReceipt,
      state.orderDelivery,
      state.orderCancel,
      state.orderPayment
    );
  };

  // useEffect(() => {
  //   let totQty = calcTotalQty();
  //   let totAmt = calcTotalAmount();
  //   let new_sales_order = { ...state.salesOrder };
  //   new_sales_order.amtInWords = calcNumWords(totAmt);
  //   new_sales_order.totalQty = totQty;
  //   new_sales_order.totalAmt = totAmt;
  //   setState({ ...state, salesOrder: new_sales_order });
  // }, [state.salesOrder.soTable]);

  return (
    <div>
      <h1> OrderCard CRUD</h1>
      {/* {console.log(error, data)} */}
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

          <div className="formLabel">
            <span>SO Table</span>{" "}
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                let new_sales_order = { ...state.salesOrder };
                new_sales_order.soTable = [
                  ...new_sales_order.soTable,
                  {
                    _id: uuid(),
                    siNo: "",
                    descriptionOfGoods: "",
                    dueOn: "",
                    qty: "",
                    rate: "",
                    per: "",
                    amount: "",
                  },
                ];
                setState({ ...state, salesOrder: new_sales_order });
              }}
            >
              Add Entry
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Si</div>
            <div>Description</div>
            <div>Due on</div>
            <div>Qty</div>
            <div>Rate</div>
            <div>Per</div>
            <div>Amount</div>
            <div>{""}</div>
            <div>{""}</div>
          </div>
          {state.salesOrder.soTable.map((soEntry, idx) => (
            <SoTableEntry
              idx={idx}
              setOrder={setState}
              order={state}
              soEntry={soEntry}
            />
          ))}

          <div className="formLabel">
            <button
              onClick={(e) => {
                addOrderSubmit(e);
              }}
            >
              Save Sales Order
            </button>
          </div>
        </form>
      </div>

      <ViewOrders
        currOrder={currOrder}
        setCurrOrder={setCurrOrder}
        state={state}
        setState={setState}
      />
      <div>
        <form>
          <div>
            <h2>Invoice </h2>
            <p>{currOrder}</p>
          </div>
          <div className="formLabel">Distributor name</div>
          <input
            type="text"
            value={state.invoice.distributorName}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                distributorName: e.target.value,
              };
              setState(new_state);
            }}
            id="invDistributorName"
            className="formControl"
          />
          <div className="formLabel">
            <button
              onClick={(e) => {
                updateOrderSubmit(e);
              }}
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default OrderCardCRUD;
