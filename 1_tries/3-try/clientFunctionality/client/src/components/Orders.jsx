import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../queries/ordersQueries";
import Spinner from "./Spinner";
import OrderCard from "./OrderCard";

const Orders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      {data.orders.length > 0 ? (
        <div style={{ display: "flex" }}>
          {data.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>No orders!</p>
      )}
    </>
  );
};

export default Orders;
