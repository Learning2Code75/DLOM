import { useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
import { GET_ORDERS } from "../../../queries/dlomOrderQueries";
import Spinner from "../../Spinner";
import DeliveryCSV from "./DeliveryCSV";
import InvPrint from "./InvPrint";
import PaymentCSV from "./PaymentCSV";
import SoPrint from "./SoPrint";
import SrPrint from "./SrPrint";

const ViewOrders = ({
  currOrder,
  setCurrOrder,
  state,
  setState,
  setIsUpdate,
}) => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const user = useSelector((state) => state?.auth?.authData?.result);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
    return <p>Something went wrong , check console...</p>;
  }

  const settingOrder = (order) => {
    let new_so_table = [];
    for (let i = 0; i < order.salesOrder.soTable.length; i++) {
      new_so_table.push({
        siNo: order.salesOrder.soTable[i].siNo,
        descriptionOfGoods: order.salesOrder.soTable[i].descriptionOfGoods,
        dueOn: order.salesOrder.soTable[i].dueOn,
        qty: order.salesOrder.soTable[i].qty,
        rate: order.salesOrder.soTable[i].rate,
        per: order.salesOrder.soTable[i].per,
        amount: order.salesOrder.soTable[i].amount,
      });
    }

    let new_sales_order = {
      distributorName: order.salesOrder.distributorName,
      distributorDetails: order.salesOrder.distributorDetails,
      voucherNo: order.salesOrder.voucherNo,
      dated: order.salesOrder.dated,
      modeTermsOfPayment: order.salesOrder.modeTermsOfPayment,
      buyerRefOrderNo: order.salesOrder.buyerRefOrderNo,
      otherRef: order.salesOrder.otherRef,
      invoiceTo: order.salesOrder.invoiceTo,
      despatchThrough: order.salesOrder.despatchThrough,
      destination: order.salesOrder.destination,
      termsOfDelivery: order.salesOrder.termsOfDelivery,
      soTable: new_so_table,
      totalQty: order.salesOrder.totalQty,
      totalAmt: order.salesOrder.totalAmt,
      amtInWords: order.salesOrder.amtInWords,
    };

    let new_invoice_table = [];
    for (let i = 0; i < order.invoice.invTable.length; i++) {
      new_invoice_table.push({
        siNo: order.invoice.invTable[i].siNo,
        descriptionOfGoods: order.invoice.invTable[i].descriptionOfGoods,
        hsnSAC: order.invoice.invTable[i].hsnSAC,
        GSTRate: order.invoice.invTable[i].GSTRate,
        qty: order.invoice.invTable[i].qty,
        rate: order.invoice.invTable[i].rate,
        per: order.invoice.invTable[i].per,
        amount: order.invoice.invTable[i].amount,
      });
    }

    let new_invoice_tax_table = [];
    for (let i = 0; i < order.invoice.invTaxTable.length; i++) {
      new_invoice_tax_table.push({
        hsnSAC: order.invoice.invTaxTable[i].hsnSAC,
        taxableValue: order.invoice.invTaxTable[i].taxableValue,
        centralTaxRate: order.invoice.invTaxTable[i].centralTaxRate,
        centralTaxAmt: order.invoice.invTaxTable[i].centralTaxAmt,
        stateTaxRate: order.invoice.invTaxTable[i].stateTaxRate,
        stateTaxAmt: order.invoice.invTaxTable[i].stateTaxAmt,
      });
    }

    let new_invoice = {
      distributorName: order.invoice.distributorName,
      distributorDetails: order.invoice.distributorDetails,
      invoiceNo: order.invoice.invoiceNo,
      dated: order.invoice.dated,
      deliveryNote: order.invoice.deliveryNote,
      supplierRef: order.invoice.supplierRef,
      otherRef: order.invoice.otherRef,
      client: order.invoice.client,
      despatchDocNo: order.invoice.despatchDocNo,
      deliveryNoteDate: order.invoice.deliveryNoteDate,
      despatchedThrough: order.invoice.despatchedThrough,
      destination: order.invoice.destination,
      invTable: new_invoice_table,
      totalQty: order.invoice.totalQty,
      totalAmount: order.invoice.totalAmount,
      amtChargableInWords: order.invoice.amtChargableInWords,
      invTaxTable: new_invoice_tax_table,
      totalTaxableValue: order.invoice.totalTaxableValue,
      totalCentralTaxAmt: order.invoice.totalCentralTaxAmt,
      totalStateTaxAmt: order.invoice.totalStateTaxAmt,
      taxAmtInWords: order.invoice.taxAmtInWords,
      companyPAN: order.invoice.companyPAN,
      companyBankDetails: {
        bankName: order.invoice.companyBankDetails.bankName,
        acNo: order.invoice.companyBankDetails.acNo,
        BranchIFSCode: order.invoice.companyBankDetails.BranchIFSCode,
      },
      for: order.invoice.for,
    };

    let new_warehouse_receipt = [];
    for (let i = 0; i < order.wareHouseReceipt.length; i++) {
      new_warehouse_receipt.push({
        imgString: order.wareHouseReceipt[i].imgString,
      });
    }

    let new_sr_table = [];
    for (let i = 0; i < order.salesReceipt.srTable.length; i++) {
      new_sr_table.push({
        qty: order.salesReceipt.srTable[i].qty,
        details: order.salesReceipt.srTable[i].details,
        price: order.salesReceipt.srTable[i].price,
        amount: order.salesReceipt.srTable[i].amount,
      });
    }

    let new_sales_receipt = {
      distributorName: order.salesReceipt.distributorName,
      distributorDetails: order.salesReceipt.distributorDetails,
      soldBy: order.salesReceipt.soldBy,
      date: order.salesReceipt.date,
      name: order.salesReceipt.name,
      address: order.salesReceipt.address,
      mode: order.salesReceipt.mode,
      srTable: new_sr_table,
    };

    let new_order_delivery_history = [];
    for (let i = 0; i < order.orderDelivery.history.length; i++) {
      new_order_delivery_history.push({
        timeStamp: order.orderDelivery.history[i].timeStamp,
        status: order.orderDelivery.history[i].status,
      });
    }

    let new_order_delivery = {
      history: new_order_delivery_history,
    };
    let new_order_cancel = {
      timeStamp: order.orderCancel.timeStamp,
      state: order.orderCancel.state,
      desc: order.orderCancel.desc,
    };

    let new_order_payment_history = [];
    for (let i = 0; i < order.orderPayment.history.length; i++) {
      new_order_payment_history.push({
        timeStamp: order.orderPayment.history[i].timeStamp,
        amount: order.orderPayment.history[i].amount,
        method: order.orderPayment.history[i].method,
        description: order.orderPayment.history[i].description,
      });
    }
    let new_order_payment = {
      history: new_order_payment_history,
    };
    let new_state = {
      id: order.id,
      client: {
        id: order.client.id,
        companyName: order.client.companyName,
        contactPersonName: order.client.contactPersonName,
      },
      clientId: order.client.id,
      salesperson: order.salesperson,
      salesOrder: new_sales_order,
      invoice: new_invoice,
      wareHouseReceipt: new_warehouse_receipt,
      salesReceipt: new_sales_receipt,
      orderDelivery: new_order_delivery,
      orderCancel: new_order_cancel,
      orderPayment: new_order_payment,
    };

    console.log(new_state);

    setState(new_state);
  };

  return (
    <>
      {!loading && !error && (
        <div
          style={{
            margin: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gridGap: "1rem",
          }}
        >
          {data.orders.map((order) => (
            <div
              style={{
                border: "1px solid lightgrey",
                borderRadius: "1rem",
                marginBottom: "1rem",
                padding: "1rem",
              }}
              key={order.id}
            >
              <div>{order.id}</div>
              <div>{order.salesperson}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <button
                  className="btn"
                  onClick={() => {
                    setIsUpdate(true);
                    settingOrder(order);
                  }}
                >
                  Edit Order(Sales Order)
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    settingOrder(order);
                  }}
                >
                  Invoice
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    settingOrder(order);
                  }}
                >
                  Warehouse Receipt
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    settingOrder(order);
                  }}
                >
                  Sales Receipt
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    settingOrder(order);
                  }}
                >
                  Order Delivery
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    settingOrder(order);
                  }}
                >
                  Order Payment
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    settingOrder(order);
                  }}
                >
                  Cancel Order
                </button>
              </div>

              <div>
                <SoPrint data={order?.salesOrder} />
              </div>

              <div>
                <InvPrint data={order?.invoice} />
              </div>

              <div>
                <SrPrint data={order?.salesReceipt} />
              </div>

              <div>
                <DeliveryCSV deliveryData={order?.orderDelivery?.history} />
              </div>

              <div>
                <PaymentCSV paymentData={order?.orderPayment?.history} />
              </div>

              {/* <div>{order.invoice.distributorName}</div> */}
              <pre>{JSON.stringify(order, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewOrders;