import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import { GET_ORDERS } from "../../../queries/dlomOrderQueries";
import Spinner from "../../Spinner";
import PaymentCSV from "./PaymentCSV";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../../App";

const Payments = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const tc = useContext(ThemeContext);
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
          className="openStylesButton1"
          style={{
            marginRight: "1rem",
            borderRadius: ".64rem",
            padding: ".6rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: tc.theme === "light" ? "#232427" : "#ebecf0",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h2>Payments</h2>
      </div>
      <PaymentCSV orderData={data} clientData={data1} />
    </div>
  );
};

export default Payments;
