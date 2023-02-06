import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import { GET_ORDERS } from "../../../queries/dlomOrderQueries";
import Spinner from "../../Spinner";
import PaymentCSV from "./PaymentCSV";

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
  console.log(data1);
  return (
    <div>
      Payments
      <Link to="/client">Client</Link>
      <PaymentCSV orderData={data} clientData={data1} />
    </div>
  );
};

export default Payments;
