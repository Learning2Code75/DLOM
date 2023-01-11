import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ORDERS } from "../../../queries/dlomOrderQueries";
import Spinner from "../../Spinner";

const ViewOrders = ({ currOrder, setCurrOrder, state, setState }) => {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
    return <p>Something went wrong , check console...</p>;
  }
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
              <button
                className="btn"
                onClick={() => {
                  setState({ ...state, id: order.id });
                  setCurrOrder(order.id);
                  //   setState({
                  //     clientId: order.clientId,
                  //     salesperson: order.salesperson,
                  //     salesOrder: order.salesOrder,
                  //     invoice: order.invoice,
                  //     wareHouseReceipt: order.wareHouseReceipt,
                  //     salesReceipt: order.salesReceipt,
                  //     orderDelivery: order.orderDelivery,
                  //     orderCancel: order.orderCancel,
                  //     orderPayment: order.orderPayment,
                  //   });
                }}
              >
                Invoice
              </button>
              <div>{order.invoice.distributorName}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewOrders;
