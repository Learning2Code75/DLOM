import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import { GET_ORDERS } from "../../../queries/dlomOrderQueries";
import Spinner from "../../Spinner";
import PaymentCSV from "./PaymentCSV";
import { TiArrowLeftThick } from "react-icons/ti";

const Payments = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const {
    loading: loading1,
    error: error1,
    data: data1,
  } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
    return <p>Something went wrong , check console...</p>;
  }
  // console.log(data);
  // console.log(data1);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/client"
          className="dashboardLink"
          style={{
            marginRight: "1rem",
            fontSize: "2em",
            color: "white",
            boxShadow:
              " inset 5px 5px 5px rgba(0,0,0,0.2),inset -5px -5px 15px rgba(255,255,255,0.1), 5px 5px 15px rgba(0,0,0,0.3),  -5px -5px 15px rgba(255,255,255,0.2)",
            borderRadius: ".64rem",
            padding: ".4rem .6rem",
            cursor: "pointer",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h1>Payments</h1>
      </div>
      <PaymentCSV orderData={data} clientData={data1} />
    </div>
  );
};

export default Payments;
