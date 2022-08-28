import { useState } from "react";

import { useMutation } from "@apollo/client";

import { GET_ORDER } from "../queries/ordersQueries";
import { UPDATE_ORDER } from "../mutations/orderMutations";
const EditOrderForm = ({ order }) => {
  const [name, setName] = useState(order.name);
  const [description, setDescription] = useState(order.description);
  const [status, setStatus] = useState("");
  const [updateOrder] = useMutation(UPDATE_ORDER, {
    variables: { id: order.id, name, description, status },
    refetchQueries: [{ query: GET_ORDER, variables: { id: order.id } }],
  });
  const updateOrderSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("fill all form inputs");
    }

    updateOrder(name, description, status);
  };
  return (
    <div>
      <h2>Update Order Details</h2>
      <form onSubmit={updateOrderSubmit}>
        <div className="formLabel">Name</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          className="formControl"
        />
        <div className="formLabel">Description</div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          className="formControl"
        />
        <div className="formLabel">Status</div>
        <p>Previous status : {order.status}</p>
        <select
          id="status"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="new">Not Started</option>

          <option value="progress">In Progress</option>

          <option value="completed">Completed</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <>{JSON.stringify({ name, description, status }, null, "\n")}</>
    </div>
  );
};

export default EditOrderForm;
