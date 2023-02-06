import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_ORDERS } from "../queries/ordersQueries";
import { DELETE_ORDER } from "../mutations/orderMutations";
import { useMutation } from "@apollo/client";
const DeleteOrderButton = ({ orderId }) => {
  const navigate = useNavigate();

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    variables: {
      id: orderId,
    },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_ORDERS }],
  });

  return (
    <>
      <button onClick={deleteOrder}>
        Delete Order
        <FaTrash />
      </button>
    </>
  );
};

export default DeleteOrderButton;
