import React, { useState } from "react";
import SoTableEntry from "./SoTableEntry";
import uuid from "react-uuid";
import { useEffect } from "react";
import numWords from "num-words";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ORDER, UPDATE_ORDER } from "../../../mutations/dlomOrderMutation";
import { GET_ORDERS } from "../../../queries/dlomOrderQueries";
import { GET_CLIENT_IDS } from "../../../queries/dlomClientQueries";
import { GET_DISTRIBUTOR_DETAILS_ORD } from "../../../queries/distributorQueries";
import ViewOrders from "./ViewOrders";

const OrderCardCRUD = () => {
  // const [state, setState] = useState({
  //   id: "",
  //   clientId: "636672f7d649e0c2f9cc53e9",
  //   salesperson: "sp1",
  //   salesOrder: {
  //     distributorName: "dname1",
  //     distributorDetails: "daddr dno",
  //     voucherNo: "vno1",
  //     dated: "2022-12-02",
  //     modeTermsOfPayment: "cash",
  //     buyerRefOrderNo: "bron123",
  //     otherRef: "or123",
  //     invoiceTo: "buyer1",
  //     despatchThrough: "fed x",
  //     destination: "Kolkata",
  //     termsOfDelivery: "30 day payment",
  //     soTable: [
  //       {
  //         siNo: 1,
  //         descriptionOfGoods: "prod1",
  //         dueOn: "2022-12-20",
  //         qty: 2,
  //         rate: "500",
  //         per: "unit",
  //         amount: "1000",
  //       },
  //       {
  //         siNo: 2,
  //         descriptionOfGoods: "prod2",
  //         dueOn: "2022-12-20",
  //         qty: 2,
  //         rate: "1000",
  //         per: "unit",
  //         amount: "2000",
  //       },
  //       {
  //         siNo: 3,
  //         descriptionOfGoods: "prod3",
  //         dueOn: "2022-12-20",
  //         qty: 1,
  //         rate: "100",
  //         per: "unit",
  //         amount: "100",
  //       },
  //     ],
  //     totalQty: 5,
  //     totalAmt: "3100",
  //     amtInWords: "Three Thousand One Hundred Only",
  //   },
  //   invoice: {
  //     distributorName: "dname1",
  //     distributorDetails: "daddr dno",
  //     invoiceNo: "inv1",
  //     dated: "2/12/22",
  //     deliveryNote: "del note1",
  //     supplierRef: "sr1",
  //     otherRef: "or1",
  //     client: "cli1",
  //     despatchDocNo: "ddoc1",
  //     deliveryNoteDate: "13/12/22",
  //     despatchedThrough: "fed x",
  //     destination: "Kolkata",
  //     invTable: [
  //       {
  //         siNo: 1,
  //         descriptionOfGoods: "prod1",
  //         hsnSAC: "1243",
  //         GSTRate: "18",
  //         qty: 2,
  //         rate: "500",
  //         per: "unit",
  //         amount: "1000",
  //       },
  //       {
  //         siNo: 2,
  //         descriptionOfGoods: "prod2",
  //         hsnSAC: "1243",
  //         GSTRate: "18",
  //         qty: 2,
  //         rate: "1000",
  //         per: "unit",
  //         amount: "2000",
  //       },
  //       {
  //         siNo: 3,
  //         descriptionOfGoods: "prod3",
  //         hsnSAC: "1244",
  //         GSTRate: "18",
  //         qty: 1,
  //         rate: "100",
  //         per: "unit",
  //         amount: "100",
  //       },
  //     ],
  //     totalQty: 4,
  //     totalAmount: "3100",
  //     amtChargableInWords: "Three Thousand Only",
  //     invTaxTable: [
  //       {
  //         hsnSAC: "1243",
  //         taxableValue: "3000",
  //         centralTaxRate: "9",
  //         centralTaxAmt: "270",
  //         stateTaxRate: "9",
  //         stateTaxAmt: "270",
  //       },
  //       {
  //         hsnSAC: "1244",
  //         taxableValue: "100",
  //         centralTaxRate: "9",
  //         centralTaxAmt: "9",
  //         stateTaxRate: "9",
  //         stateTaxAmt: "9",
  //       },
  //     ],
  //     totalTaxableValue: "3100",
  //     totalCentralTaxAmt: "279",
  //     totalStateTaxAmt: "279",
  //     taxAmtInWords: "Two Hundred and Seventy Nine Only",
  //     companyPAN: "123456789",
  //     companyBankDetails: {
  //       bankName: "bank1",
  //       acNo: "321564798",
  //       BranchIFSCode: "bk12354",
  //     },
  //     for: "dname1",
  //   },
  //   wareHouseReceipt: [
  //     {
  //       imgString: "https://daf.adsa.com",
  //     },
  //   ],
  //   salesReceipt: {
  //     distributorName: "dname1",
  //     distributorDetails: "daddr dno",
  //     soldBy: "dname 1",
  //     date: "4/12/22",
  //     name: "company1",
  //     address: "addr1",
  //     mode: "cash",
  //     srTable: [
  //       {
  //         qty: 2,
  //         details: "prod1",
  //         price: "500",
  //         amount: "1000",
  //       },
  //       {
  //         qty: 2,
  //         details: "prod2",
  //         price: "1000",
  //         amount: "2000",
  //       },
  //       {
  //         qty: 1,
  //         details: "prod3",
  //         price: "100",
  //         amount: "100",
  //       },
  //     ],
  //   },
  //   orderDelivery: {
  //     history: [
  //       {
  //         timeStamp: "time1",
  //         status: "Ordered",
  //       },
  //       {
  //         timeStamp: "time2",
  //         status: "Dispatched",
  //       },
  //       {
  //         timeStamp: "time3",
  //         status: "Delivered",
  //       },
  //     ],
  //   },
  //   orderCancel: {
  //     timeStamp: "",
  //     state: "",
  //     desc: "",
  //   },
  //   orderPayment: {
  //     history: [
  //       {
  //         timeStamp: "time1",
  //         amount: "2000",
  //         method: "cash",
  //         description: "payment 1",
  //       },
  //       {
  //         timeStamp: "time2",
  //         amount: "1379",
  //         method: "cash",
  //         description: "payment 2",
  //       },
  //     ],
  //   },
  // });

  const [state, setState] = useState({
    id: "",
    clientId: "",
    salesperson: "",
    salesOrder: {
      distributorName: "",
      distributorDetails: "",
      voucherNo: "",
      dated: "",
      modeTermsOfPayment: "",
      buyerRefOrderNo: "",
      otherRef: "",
      invoiceTo: "",
      despatchThrough: "",
      destination: "",
      termsOfDelivery: "",
      soTable: [],
      totalQty: 0,
      totalAmt: "",
      amtInWords: "",
    },
    invoice: {
      distributorName: "",
      distributorDetails: "",
      invoiceNo: "",
      dated: "",
      deliveryNote: "",
      supplierRef: "",
      otherRef: "",
      client: "",
      despatchDocNo: "",
      deliveryNoteDate: "",
      despatchedThrough: "",
      destination: "",
      invTable: [],
      totalQty: 0,
      totalAmount: "",
      amtChargableInWords: "",
      invTaxTable: [],
      totalTaxableValue: "",
      totalCentralTaxAmt: "",
      totalStateTaxAmt: "",
      taxAmtInWords: "",
      companyPAN: "",
      companyBankDetails: {
        bankName: "",
        acNo: "",
        BranchIFSCode: "",
      },
      for: "",
    },
    wareHouseReceipt: [
      {
        imgString: "",
      },
    ],
    salesReceipt: {
      distributorName: "",
      distributorDetails: "",
      soldBy: "",
      date: "",
      name: "",
      address: "",
      mode: "",
      srTable: [],
    },
    orderDelivery: {
      history: [],
    },
    orderCancel: {
      timeStamp: new Date().toISOString(),
      state: "",
      desc: "",
    },
    orderPayment: {
      history: [],
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

  const clientIds = useQuery(GET_CLIENT_IDS);

  const distribDetails = useQuery(GET_DISTRIBUTOR_DETAILS_ORD);

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

  const calcSalesOrderFields = () => {
    let totQty = calcTotalQty();
    let totAmt = calcTotalAmount();
    let new_sales_order = { ...state.salesOrder };
    new_sales_order.amtInWords = calcNumWords(totAmt);
    new_sales_order.totalQty = totQty;
    new_sales_order.totalAmt = totAmt;
    setState({ ...state, salesOrder: new_sales_order });
  };

  useEffect(() => {
    let new_clientId = state.clientId;
    let new_client_addr = "";
    for (let i = 0; i < clientIds?.data?.clients?.length; i++) {
      if (clientIds?.data.clients[i]?.id === new_clientId) {
        new_client_addr = clientIds?.data?.clients[i]?.address;
      }
    }
    let new_state = { ...state };
    // new_state.salesOrder.invoiceTo = new_client_addr;
    new_state.salesOrder = {
      ...new_state.salesOrder,
      invoiceTo: new_client_addr,
    };

    setState(new_state);
  }, [state.clientId]);

  useEffect(() => {
    let new_state = { ...state };
    new_state.salesOrder = {
      ...new_state.salesOrder,
      distributorName: distribDetails?.data?.distributor[0]?.companyName,
    };

    new_state.salesOrder = {
      ...new_state.salesOrder,
      distributorDetails: distribDetails?.data?.distributor[0]?.address,
    };

    new_state.invoice = {
      ...new_state.invoice,
      distributorName: distribDetails?.data?.distributor[0]?.companyName,
    };
    new_state.invoice = {
      ...new_state.invoice,
      distributorDetails: distribDetails?.data?.distributor[0]?.address,
    };

    new_state.salesReceipt = {
      ...new_state.salesReceipt,
      distributorName: distribDetails?.data?.distributor[0]?.companyName,
    };

    new_state.salesReceipt = {
      ...new_state.salesReceipt,
      distributorDetails: distribDetails?.data?.distributor[0]?.address,
    };

    setState(new_state);
  }, [distribDetails.loading, state.id]);

  return (
    <div>
      <h1> OrderCard CRUD</h1>
      {/* {console.log(distribDetails)} */}
      <div>
        <form>
          <div className="formLabel">Client name</div>
          <select
            value={state.clientId}
            onChange={(e) => setState({ ...state, clientId: e.target.value })}
            className="formControl"
            id="clientid"
          >
            <option value="--">Select client</option>
            {clientIds?.data?.clients?.map((cid) => (
              <option value={cid.id}>
                {cid.companyName}: {cid.contactPersonName}
              </option>
            ))}

            {/* <option value="636672f7d649e0c2f9cc53e9">com1 : cp1</option>
            <option value="63667316d649e0c2f9cc53ed">com2 : cp2</option> */}
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

          {/* <div className="formLabel">Invoice To</div>
          <select
            value={state.salesOrder.invoiceTo}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesOrder.invoiceTo = e.target.value;
              setState(new_state);
            }}
            className="formControl"
            id="soInvoiceToSelect"
          >
            <option value="--">Select client addr</option>
            {clientIds?.data?.clients?.map((cid) => (
              <option value={cid.address}>{cid.address}</option>
            ))}
          </select> */}

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
            disabled={true}
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
            disabled={true}
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
              calcSalesOrderFields={calcSalesOrderFields}
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

          <div className="formLabel">Distributor details</div>
          <input
            type="text"
            value={state.invoice.distributorDetails}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                distributorDetails: e.target.value,
              };
              setState(new_state);
            }}
            id="invDistributorDetails"
            className="formControl"
          />

          <div className="formLabel">Invoice No.</div>
          <input
            type="text"
            value={state.invoice.invoiceNo}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                invoiceNo: e.target.value,
              };
              setState(new_state);
            }}
            id="invInvNo"
            className="formControl"
          />

          <div className="formLabel">Dated</div>
          <input
            type="date"
            value={state.invoice.dated}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                dated: e.target.value,
              };
              setState(new_state);
            }}
            id="invDated"
            className="formControl"
          />

          <div className="formLabel">Delivery Note</div>
          <input
            type="text"
            value={state.invoice.deliveryNote}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                deliveryNote: e.target.value,
              };
              setState(new_state);
            }}
            id="invDeliveryNote"
            className="formControl"
          />

          <div className="formLabel">Supplier Ref.</div>
          <input
            type="text"
            value={state.invoice.supplierRef}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                supplierRef: e.target.value,
              };
              setState(new_state);
            }}
            id="invSupplierRef"
            className="formControl"
          />

          <div className="formLabel">Other Ref.</div>
          <input
            type="text"
            value={state.invoice.otherRef}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                otherRef: e.target.value,
              };
              setState(new_state);
            }}
            id="invotherRef"
            className="formControl"
          />

          <div className="formLabel">Client</div>
          <input
            type="text"
            value={state.invoice.client}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                client: e.target.value,
              };
              setState(new_state);
            }}
            id="invClient"
            className="formControl"
          />

          <div className="formLabel">Despatch Doc No</div>
          <input
            type="text"
            value={state.invoice.despatchDocNo}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                despatchDocNo: e.target.value,
              };
              setState(new_state);
            }}
            id="invdespatchDocNo"
            className="formControl"
          />

          <div className="formLabel">Delivery Note Date</div>
          <input
            type="date"
            value={state.invoice.deliveryNoteDate}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                deliveryNoteDate: e.target.value,
              };
              setState(new_state);
            }}
            id="invdeliveryNoteDate"
            className="formControl"
          />

          <div className="formLabel">Despatch Through</div>
          <input
            type="text"
            value={state.invoice.despatchedThrough}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                despatchedThrough: e.target.value,
              };
              setState(new_state);
            }}
            id="invdespatchedThrough"
            className="formControl"
          />

          <div className="formLabel">Destination</div>
          <input
            type="text"
            value={state.invoice.destination}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                destination: e.target.value,
              };
              setState(new_state);
            }}
            id="invdestination"
            className="formControl"
          />

          <div className="formLabel">Invoice Table</div>

          <div className="formLabel">Total Qty</div>
          <input
            type="number"
            value={state.invoice.totalQty}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                totalQty: e.target.value,
              };
              setState(new_state);
            }}
            id="invtotalQty"
            className="formControl"
            disabled={true}
          />

          <div className="formLabel">Total Amount</div>
          <input
            type="text"
            value={state.invoice.totalAmount}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                totalAmount: e.target.value,
              };
              setState(new_state);
            }}
            id="invtotalAmount"
            className="formControl"
            disabled={true}
          />

          <div className="formLabel">Amount in words</div>
          <input
            type="text"
            value={state.invoice.amtChargableInWords}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                amtChargableInWords: e.target.value,
              };
              setState(new_state);
            }}
            id="invamtChargableInWords"
            className="formControl"
          />

          <div className="formLabel">Invoice Tax Table</div>

          <div className="formLabel">Total Taxable Value</div>
          <input
            type="text"
            value={state.invoice.totalTaxableValue}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                totalTaxableValue: e.target.value,
              };
              setState(new_state);
            }}
            id="invtotalTaxableValue"
            className="formControl"
            disabled={true}
          />

          <div className="formLabel">Total Central Tax Amount</div>
          <input
            type="text"
            value={state.invoice.totalCentralTaxAmt}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                totalCentralTaxAmt: e.target.value,
              };
              setState(new_state);
            }}
            id="invtotalCentralTaxAmt"
            className="formControl"
            disabled={true}
          />

          <div className="formLabel">Total State Tax Amount</div>
          <input
            type="text"
            value={state.invoice.totalStateTaxAmt}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                totalStateTaxAmt: e.target.value,
              };
              setState(new_state);
            }}
            id="invtotalStateTaxAmt"
            className="formControl"
            disabled={true}
          />

          <div className="formLabel">Tax Amount In Words</div>
          <input
            type="text"
            value={state.invoice.taxAmtInWords}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                taxAmtInWords: e.target.value,
              };
              setState(new_state);
            }}
            id="invtaxAmtInWords"
            className="formControl"
          />

          <div className="formLabel">Company PAN</div>
          <input
            type="text"
            value={state.invoice.companyPAN}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                companyPAN: e.target.value,
              };
              setState(new_state);
            }}
            id="invcompanyPAN"
            className="formControl"
          />

          <h4>Company Bank Details</h4>
          <div className="formLabel">Bank Name</div>
          <input
            type="text"
            value={state.invoice.companyBankDetails.bankName}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice.companyBankDetails = {
                ...new_state.invoice.companyBankDetails,
                bankName: e.target.value,
              };
              setState(new_state);
            }}
            id="invbankName"
            className="formControl"
          />

          <div className="formLabel">A/C No.</div>
          <input
            type="text"
            value={state.invoice.companyBankDetails.acNo}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice.companyBankDetails = {
                ...new_state.invoice.companyBankDetails,
                acNo: e.target.value,
              };
              setState(new_state);
            }}
            id="invacNo"
            className="formControl"
          />

          <div className="formLabel">BranchIFSCode</div>
          <input
            type="text"
            value={state.invoice.companyBankDetails.BranchIFSCode}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice.companyBankDetails = {
                ...new_state.invoice.companyBankDetails,
                BranchIFSCode: e.target.value,
              };
              setState(new_state);
            }}
            id="invBranchIFSCode"
            className="formControl"
          />

          <div className="formLabel">For</div>
          <input
            type="text"
            value={state.invoice.for}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.invoice = {
                ...new_state.invoice,
                for: e.target.value,
              };
              setState(new_state);
            }}
            id="invfor"
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

      <div>
        <form>
          <div>
            <h2>Warehouse Receipt </h2>
          </div>
          <div className="formLabel">Img Upload table</div>

          <div className="formLabel">
            <button
              onClick={(e) => {
                updateOrderSubmit(e);
              }}
            >
              Save Warehouse Receipt
            </button>
          </div>
        </form>
      </div>

      <div>
        <form>
          <div>
            <h2>Sales Receipt </h2>
          </div>
          <div className="formLabel">Distributor Name</div>
          <input
            type="text"
            value={state.salesReceipt.distributorName}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesReceipt = {
                ...new_state.salesReceipt,
                distributorName: e.target.value,
              };
              setState(new_state);
            }}
            id="srdistributorName"
            className="formControl"
          />

          <div className="formLabel">Distributor Details</div>
          <input
            type="text"
            value={state.salesReceipt.distributorDetails}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesReceipt = {
                ...new_state.salesReceipt,
                distributorDetails: e.target.value,
              };
              setState(new_state);
            }}
            id="srdistributorDetails"
            className="formControl"
          />

          <div className="formLabel">Sold By </div>
          <input
            type="text"
            value={state.salesReceipt.soldBy}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesReceipt = {
                ...new_state.salesReceipt,
                soldBy: e.target.value,
              };
              setState(new_state);
            }}
            id="srsoldBy"
            className="formControl"
          />

          <div className="formLabel">Date</div>
          <input
            type="date"
            value={state.salesReceipt.date}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesReceipt = {
                ...new_state.salesReceipt,
                date: e.target.value,
              };
              setState(new_state);
            }}
            id="srdate"
            className="formControl"
          />

          <div className="formLabel">Name</div>
          <input
            type="text"
            value={state.salesReceipt.name}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesReceipt = {
                ...new_state.salesReceipt,
                name: e.target.value,
              };
              setState(new_state);
            }}
            id="srname"
            className="formControl"
          />

          <div className="formLabel">Address</div>
          <input
            type="text"
            value={state.salesReceipt.address}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesReceipt = {
                ...new_state.salesReceipt,
                address: e.target.value,
              };
              setState(new_state);
            }}
            id="sraddress"
            className="formControl"
          />

          <div className="formLabel">Mode</div>
          <input
            type="text"
            value={state.salesReceipt.mode}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.salesReceipt = {
                ...new_state.salesReceipt,
                mode: e.target.value,
              };
              setState(new_state);
            }}
            id="srmode"
            className="formControl"
          />

          <div className="formLabel">Sales Receipt table</div>

          <div className="formLabel">
            <button
              onClick={(e) => {
                updateOrderSubmit(e);
              }}
            >
              Save Sales Receipt
            </button>
          </div>
        </form>
      </div>

      <div>
        <form>
          <div>
            <h2>Order Delivery </h2>
          </div>
          <div className="formLabel">History table</div>

          <div className="formLabel">
            <button
              onClick={(e) => {
                updateOrderSubmit(e);
              }}
            >
              Save Order Delivery entry
            </button>
          </div>
        </form>
      </div>

      <div>
        <form>
          <div>
            <h2>Order Payment </h2>
            <div className="formLabel">History table</div>

            <div className="formLabel">
              <button
                onClick={(e) => {
                  updateOrderSubmit(e);
                }}
              >
                Save Order Payment entry
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <form>
          <div>
            <h2>Order Cancel </h2>
          </div>

          <div className="formLabel">Reason for cancel</div>
          <input
            type="text"
            value={state.orderCancel.state}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.orderCancel = {
                ...new_state.orderCancel,
                state: e.target.value,
              };
              setState(new_state);
            }}
            id="srstate"
            className="formControl"
          />
          <div className="formLabel">Description</div>
          <input
            type="text"
            value={state.orderCancel.desc}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.orderCancel = {
                ...new_state.orderCancel,
                desc: e.target.value,
              };
              setState(new_state);
            }}
            id="srdesc"
            className="formControl"
          />

          <div className="formLabel">
            <button
              onClick={(e) => {
                updateOrderSubmit(e);
              }}
            >
              Cancel Order
            </button>
          </div>
        </form>
      </div>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default OrderCardCRUD;
