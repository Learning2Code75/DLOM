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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <button
                  className="btn"
                  onClick={() => {
                    let new_state = { ...order };
                    delete new_state.client;
                    delete new_state.__typename;
                    setState(new_state);
                  }}
                >
                  Invoice
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setState(order);
                  }}
                >
                  Warehouse Receipt
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setState(order);
                  }}
                >
                  Sales Receipt
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setState(order);
                  }}
                >
                  Order Delivery
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setState(order);
                  }}
                >
                  Order Payment
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setState(order);
                  }}
                >
                  Cancel Order
                </button>
              </div>

              <div>{order.invoice.distributorName}</div>
              <pre>{JSON.stringify(order, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewOrders;
