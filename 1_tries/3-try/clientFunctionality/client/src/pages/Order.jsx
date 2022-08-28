import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import { GET_ORDER } from "../queries/ordersQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteOrderButton from "../components/DeleteOrderButton";
import EditOrderForm from "../components/EditOrderForm";

const Order = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { id },
  });
  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      {!loading && !error && (
        <div>
          <Link to="/">Back</Link>
          <h5>{data.order.id}</h5>
          <h2>{data.order.name}</h2>
          <p>{data.order.description}</p>
          <h6>{data.order.status}</h6>

          <ClientInfo client={data.order.client} />

          <EditOrderForm order={data.order} />

          <DeleteOrderButton orderId={data.order.id} />
        </div>
      )}
    </>
  );
};

export default Order;
