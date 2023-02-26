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
import SoTableEntryNew from "./SoTableEntryNew";
import InvTableEntry from "./InvTableEntry";
import WarehouseReceiptEntry from "./WarehouseReceiptEntry";
import SrTableEntry from "./SrTableEntry";
import OrderDeliveryEntry from "./OrderDeliveryEntry";
import OrderPaymentEntry from "./OrderPaymentEntry";
import { useDispatch, useSelector } from "react-redux";
import { createOrderlog } from "../../../redux/actions/orderlogs";
import { createOp, getUsers } from "../../../redux/actions/users";
import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { useContext } from "react";
import { ThemeContext } from "../../../App";

const OrderCardCRUD = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const tc = useContext(ThemeContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const user = useSelector((state) => state?.auth?.authData?.result);
  const users = useSelector((state) => state?.users);
  const [openDialog, setOpenDialog] = useState(false);
  const [invDialog, setInvDialog] = useState(false);
  const [srDialog, setSrDialog] = useState(false);
  const [wrDialog, setWrDialog] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [deliveryDialog, setDeliveryDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);

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

  const clientIds = useQuery(GET_CLIENT_IDS);

  const distribDetails = useQuery(GET_DISTRIBUTOR_DETAILS_ORD);

  const calcTotalQty = (soTable) => {
    let qty = 0;
    for (let i = 0; i < soTable.length; i++) {
      qty = parseFloat(qty) + parseFloat(soTable[i]?.qty);
    }

    return qty;
  };
  const calcTotalAmount = (soTable) => {
    let amt = 0;
    for (let i = 0; i < soTable.length; i++) {
      amt = parseFloat(amt) + parseFloat(soTable[i].amount);
    }

    return amt;
  };

  const calcNumWords = (a) => {
    let amt = "";
    let r_a = a.toFixed();
    amt = numWords(r_a) + " only";
    return amt;
  };

  const addOrderSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOp({
        dlom_client: { _id: user?.dlom_client },
        operation_type: "order create",
      })
    );
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
    setOpenDialog(false);
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
    setOpenDialog(false);
  };

  const calcSalesOrderFields = (soTable) => {
    let totQty = calcTotalQty(soTable);
    let totAmt = calcTotalAmount(soTable);
    let amtInWords = calcNumWords(totAmt);

    return {
      totalQty: totQty,
      totalAmt: totAmt,
      amtInWords,
    };
  };

  const clearState = () => {
    setState({
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
    setIsUpdate(false);
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
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <h2> Order Card </h2>
      {/* {console.log(distribDetails)} */}
      <div className="dialogOpenContainer">
        <div className="openStylesButton1" onClick={() => setOpenDialog(true)}>
          Create Order
        </div>
      </div>
      <Dialog
        open={openDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            clearState();
            setOpenDialog(!openDialog);
          } else {
            clearState();
            setOpenDialog(!openDialog);
          }
        }}
        // PaperComponent={<PaperC />}
        PaperProps={{
          sx: {
            borderRadius: "1rem",
            background: tc.theme === "light" ? "#ebecf0" : "#232427",
            color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
          },
        }}
        scroll={"body"}
        id={tc.theme}
      >
        <div>
          <form className="css5Form">
            <div className="FlexBetween">
              <h2>{isUpdate ? "Update" : "Add"} Order</h2>
              <IconButton
                onClick={() => {
                  setOpenDialog(false);
                  clearState();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
            </div>

            <div className="formLabel">Client name</div>
            <select
              value={state.clientId}
              onChange={(e) => setState({ ...state, clientId: e.target.value })}
              className="btn1"
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

            {/* <input
              type="text"
              value={state.salesperson}
              onChange={(e) =>
                setState({ ...state, salesperson: e.target.value })
              }
              id="salesperson"
              placeholder="salesperson"
              className="formControl"
            /> */}
            <select
              value={state.salesperson}
              onChange={(e) =>
                setState({ ...state, salesperson: e.target.value })
              }
              id="salesperson"
              placeholder="salesperson"
              className="btn1"
            >
              <option value="--">Select salesperson</option>

              {users?.map((u) => (
                <option value={u._id}>
                  {u.name}: [{u.userRole}]
                </option>
              ))}

              {/* <option value="636672f7d649e0c2f9cc53e9">com1 : cp1</option>
            <option value="63667316d649e0c2f9cc53ed">com2 : cp2</option> */}
            </select>

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
              placeholder="distributor name"
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
              placeholder="distributor details"
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
              placeholder="voucher no."
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
              placeholder="mode/terms of payment"
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
              placeholder="buyer ref/ orderno."
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
              placeholder="other ref"
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
              placeholder="invoice to"
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
              placeholder="desptach through"
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
              placeholder="destination"
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
              placeholder="terms of delivery"
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
              placeholder=" total qty"
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
              placeholder="total amount"
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
              placeholder="amount in words"
              id="soAmtInWords"
              className="formControl"
            />

            <div className="formLabel">
              <span>SO Table</span>{" "}
              <button
                className="btn1"
                onClick={(e) => {
                  e.preventDefault();
                  let new_sales_order = { ...state.salesOrder };
                  new_sales_order.soTable = [
                    ...new_sales_order.soTable,
                    {
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
                style={{
                  width: "10%",
                  marginLeft: "0",
                  fontSize: "1.3em",
                  padding: ".6rem",
                }}
              >
                +
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <div>Si</div> */}
              <div>Description</div>
              <div>Due on</div>
              <div>Qty</div>
              <div>Rate</div>
              <div>Per</div>
              <div>Amount</div>
              <div>{""}</div>
              <div>{""}</div>
            </div>
            {/* {state.salesOrder.soTable.map((soEntry, idx) => (
            <SoTableEntry
              idx={idx}
              setOrder={setState}
              order={state}
              soEntry={soEntry}
              calcSalesOrderFields={calcSalesOrderFields}
            />
          ))} */}

            {state.salesOrder.soTable.map((soTableEntry, idx) => (
              <SoTableEntryNew
                state={state}
                setState={setState}
                index={idx}
                soTableEntry={soTableEntry}
                calcSalesOrderFields={calcSalesOrderFields}
              />
            ))}

            <div className="formLabel">
              <div
                className="btn2"
                onClick={(e) => {
                  if (isUpdate) {
                    updateOrderSubmit(e);
                    dispatch(
                      createOrderlog({
                        order: { ...state },
                        operation: "so update",
                      })
                    );
                  } else {
                    addOrderSubmit(e);
                    dispatch(
                      createOrderlog({
                        order: { ...state },
                        operation: "so create",
                      })
                    );
                  }
                  setIsUpdate(false);
                  clearState();
                }}
              >
                {isUpdate ? "Edit" : "Save"} Sales Order
              </div>
            </div>
          </form>
        </div>
      </Dialog>

      <ViewOrders
        currOrder={currOrder}
        setCurrOrder={setCurrOrder}
        state={state}
        setState={setState}
        setIsUpdate={setIsUpdate}
        setOpenDialog={setOpenDialog}
        setInvDialog={setInvDialog}
        setWrDialog={setWrDialog}
        setSrDialog={setSrDialog}
        setPaymentDialog={setPaymentDialog}
        setDeliveryDialog={setDeliveryDialog}
        setCancelDialog={setCancelDialog}
      />
      <div>
        <Dialog
          open={invDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clearState();
              setInvDialog(false);
            } else {
              clearState();
              setInvDialog(false);
            }
          }}
          // PaperComponent={<PaperC />}
          PaperProps={{
            sx: {
              borderRadius: "1rem",
              background: tc.theme === "light" ? "#ebecf0" : "#232427",
              color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
            },
          }}
          scroll={"body"}
          id={tc.theme}
        >
          <form className="css5Form">
            <div className="FlexBetween">
              <h2>Invoice </h2>
              <IconButton
                onClick={() => {
                  setInvDialog(false);
                  clearState();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
            </div>
            <div>{/* <p>{currOrder}</p> */}</div>
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
              placeholder="distributor name"
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
              placeholder="distributor details"
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
              placeholder="invoice no."
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
              placeholder="delivery note"
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
              placeholder="supplier ref"
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
              placeholder="other ref"
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
              placeholder="client"
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
              placeholder="despatch doc no."
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
              placeholder="delivery note date"
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
              placeholder="despatched through"
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
              placeholder="destination"
              className="formControl"
            />

            <div className="formLabel">Invoice Table</div>
            <button
              className="btn1"
              style={{
                width: "10%",
                marginLeft: "0",
                fontSize: "1.3em",
                padding: ".6rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                let new_invoice = { ...state.invoice };
                new_invoice.invTable = [
                  ...new_invoice.invTable,
                  {
                    siNo: 0,
                    descriptionOfGoods: "",
                    hsnSAC: "",
                    GSTRate: "",
                    qty: 0,
                    rate: "",
                    per: "unit",
                    amount: "",
                  },
                ];
                setState({ ...state, invoice: new_invoice });
              }}
            >
              +
            </button>
            {state.invoice.invTable.map((invTEntry, index) => (
              <InvTableEntry state={state} setState={setState} index={index} />
            ))}

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
              placeholder="total qty"
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
              placeholder="total amount"
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
              placeholder="amt in words"
              className="formControl"
            />

            <div className="formLabel">Invoice Tax Table</div>
            <table
              style={{
                border: "1px solid lightgrey",
              }}
            >
              <thead
                style={{
                  borderBottom: "2px solid white",
                }}
              >
                <tr>
                  <td>HSN SAC</td>
                  <td>Taxable value</td>
                  <td>central tax rate</td>
                  <td>central tax amt</td>
                  <td>state tax rate</td>
                  <td>state tax amt</td>
                </tr>
              </thead>

              {state.invoice.invTaxTable.map((i) => (
                <tr>
                  <td>{i.hsnSAC}</td>
                  <td>{i.taxableValue}</td>
                  <td>{i.centralTaxRate}</td>
                  <td>{i.centralTaxAmt}</td>
                  <td>{i.stateTaxRate}</td>
                  <td>{i.stateTaxAmt}</td>
                </tr>
              ))}
            </table>

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
              placeholder="total taxable value"
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
              placeholder="total central tax amt"
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
              placeholder="total state tax amt"
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
              placeholder="tax amt in words"
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
              placeholder="company PAN no."
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
              placeholder="bank name"
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
              placeholder="A/C no."
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
              placeholder="branch IFSC Code"
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
              placeholder="invoice for"
              id="invfor"
              className="formControl"
            />

            <div className="formLabel">
              <div
                onClick={(e) => {
                  updateOrderSubmit(e);
                  dispatch(
                    createOrderlog({
                      order: { ...state },
                      operation: "invoice",
                    })
                  );
                  clearState();
                  setInvDialog(false);
                }}
                className="btn2"
              >
                Save Invoice
              </div>
            </div>
          </form>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={wrDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clearState();
              setWrDialog(false);
            } else {
              clearState();
              setWrDialog(false);
            }
          }}
          // PaperComponent={<PaperC />}
          PaperProps={{
            sx: {
              borderRadius: "1rem",
              background: tc.theme === "light" ? "#ebecf0" : "#232427",
              color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
            },
          }}
          scroll={"body"}
          id={tc.theme}
        >
          <form className="css5Form">
            <div className="FlexBetween">
              <h2>Warehouse Receipt </h2>
              <IconButton
                onClick={() => {
                  setWrDialog(false);
                  clearState();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
            </div>
            <div className="formLabel">Img Upload table</div>
            <button
              className="btn1"
              style={{
                width: "10%",
                marginLeft: "0",
                fontSize: "1.3em",
                padding: ".6rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                let new_whr = [...state.wareHouseReceipt];
                new_whr = [
                  ...new_whr,
                  {
                    imgString: "",
                  },
                ];
                setState({ ...state, wareHouseReceipt: new_whr });
              }}
            >
              +
            </button>
            {state.wareHouseReceipt.map((item, index) => (
              <WarehouseReceiptEntry
                state={state}
                setState={setState}
                index={index}
              />
            ))}

            <div className="formLabel">
              <div
                className="btn2"
                onClick={(e) => {
                  updateOrderSubmit(e);
                  dispatch(
                    createOrderlog({
                      order: { ...state },
                      operation: "warehouse receipt",
                    })
                  );
                  clearState();
                  setWrDialog(false);
                }}
              >
                Save Warehouse Receipt
              </div>
            </div>
          </form>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={srDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clearState();
              setSrDialog(false);
            } else {
              clearState();
              setSrDialog(false);
            }
          }}
          // PaperComponent={<PaperC />}
          PaperProps={{
            sx: {
              borderRadius: "1rem",
              background: tc.theme === "light" ? "#ebecf0" : "#232427",
              color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
            },
          }}
          scroll={"body"}
          id={tc.theme}
        >
          <form className="css5Form">
            <div className="FlexBetween">
              <h2>Sales Receipt </h2>
              <IconButton
                onClick={() => {
                  setSrDialog(false);
                  clearState();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
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
              placeholder="distributor name"
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
              placeholder="distributor details"
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
              placeholder="sold by"
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
              placeholder="name "
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
              placeholder="address"
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
              placeholder="mode "
              className="formControl"
            />

            <div className="formLabel">Sales Receipt table</div>
            <button
              className="btn1"
              style={{
                width: "10%",
                marginLeft: "0",
                fontSize: "1.3em",
                padding: ".6rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                let new_sales_receipt = { ...state.salesReceipt };
                new_sales_receipt.srTable = [
                  ...new_sales_receipt.srTable,
                  {
                    qty: 0,
                    details: "",
                    price: "",
                    amount: "",
                  },
                ];
                setState({ ...state, salesReceipt: new_sales_receipt });
              }}
            >
              +
            </button>
            {state.salesReceipt.srTable.map((item, index) => (
              <SrTableEntry state={state} setState={setState} index={index} />
            ))}

            <div className="formLabel">
              <div
                onClick={(e) => {
                  updateOrderSubmit(e);
                  dispatch(
                    createOrderlog({
                      order: { ...state },
                      operation: "sales receipt",
                    })
                  );
                  clearState();
                  setSrDialog(false);
                }}
                className="btn2"
              >
                Save Sales Receipt
              </div>
            </div>
          </form>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={deliveryDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clearState();
              setDeliveryDialog(false);
            } else {
              clearState();
              setDeliveryDialog(false);
            }
          }}
          // PaperComponent={<PaperC />}
          PaperProps={{
            sx: {
              borderRadius: "1rem",
              background: tc.theme === "light" ? "#ebecf0" : "#232427",
              color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
            },
          }}
          scroll={"body"}
          id={tc.theme}
        >
          <form className="css5Form">
            <div className="FlexBetween">
              <h2>Order Delivery </h2>
              <IconButton
                onClick={() => {
                  setDeliveryDialog(false);
                  clearState();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
            </div>
            <div className="formLabel">History table</div>
            <button
              className="btn1"
              style={{
                width: "10%",
                marginLeft: "0",
                fontSize: "1.3em",
                padding: ".6rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                let new_order_delivery = { ...state.orderDelivery };
                new_order_delivery.history = [
                  ...new_order_delivery.history,
                  {
                    timeStamp: "",
                    status: "",
                  },
                ];
                setState({ ...state, orderDelivery: new_order_delivery });
              }}
            >
              +
            </button>
            {state.orderDelivery.history.map((item, index) => (
              <OrderDeliveryEntry
                state={state}
                setState={setState}
                index={index}
              />
            ))}

            <div className="formLabel">
              <div
                className="btn2"
                onClick={(e) => {
                  updateOrderSubmit(e);
                  dispatch(
                    createOrderlog({
                      order: { ...state },
                      operation: "delivery entry",
                    })
                  );
                  clearState();
                  setDeliveryDialog(false);
                }}
              >
                Save Order Delivery entry
              </div>
            </div>
          </form>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={paymentDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clearState();
              setPaymentDialog(false);
            } else {
              clearState();
              setPaymentDialog(false);
            }
          }}
          // PaperComponent={<PaperC />}
          PaperProps={{
            sx: {
              borderRadius: "1rem",
              background: tc.theme === "light" ? "#ebecf0" : "#232427",
              color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
            },
          }}
          scroll={"body"}
          id={tc.theme}
        >
          <form className="css5Form">
            <div className="FlexBetween">
              <h2>Order Payment </h2>
              <IconButton
                onClick={() => {
                  setPaymentDialog(false);
                  clearState();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
            </div>

            <div className="formLabel">History table</div>
            <button
              className="btn1"
              style={{
                width: "10%",
                marginLeft: "0",
                fontSize: "1.3em",
                padding: ".6rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                let new_order_payment = { ...state.orderPayment };
                new_order_payment.history = [
                  ...new_order_payment.history,
                  {
                    timeStamp: "",
                    amount: "",
                    method: "",
                    description: "",
                  },
                ];
                setState({ ...state, orderPayment: new_order_payment });
              }}
            >
              +
            </button>
            {state.orderPayment.history.map((item, index) => (
              <OrderPaymentEntry
                state={state}
                setState={setState}
                index={index}
              />
            ))}

            <div className="formLabel">
              <div
                className="btn2"
                onClick={(e) => {
                  updateOrderSubmit(e);
                  dispatch(
                    createOrderlog({
                      order: { ...state },
                      operation: "payment entry",
                    })
                  );
                  clearState();
                  setPaymentDialog(false);
                }}
              >
                Save Order Payment entry
              </div>
            </div>
          </form>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={cancelDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clearState();
              setCancelDialog(false);
            } else {
              clearState();
              setCancelDialog(false);
            }
          }}
          // PaperComponent={<PaperC />}
          PaperProps={{
            sx: {
              borderRadius: "1rem",
              background: tc.theme === "light" ? "#ebecf0" : "#232427",
              color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
            },
          }}
          scroll={"body"}
          id={tc.theme}
        >
          <form className="css5Form">
            <div className="FlexBetween">
              <h2>Order Cancel </h2>
              <IconButton
                onClick={() => {
                  setCancelDialog(false);
                  clearState();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
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
              placeholder="reason for cancellation"
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
              placeholder="reason description"
              className="formControl"
            />

            <div className="formLabel">
              <div
                onClick={(e) => {
                  updateOrderSubmit(e);
                  dispatch(
                    createOrderlog({
                      order: { ...state },
                      operation: "order cancel",
                    })
                  );
                  clearState();
                  setCancelDialog(false);
                }}
                className="btn2"
              >
                Cancel Order
              </div>
            </div>
          </form>
        </Dialog>
      </div>

      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
};

export default OrderCardCRUD;
