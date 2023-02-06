import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ORDERS } from "../queries/ordersQueries";
import { GET_CLIENTS } from "../queries/clientsQueries";
import { ADD_ORDER } from "../mutations/orderMutations";
import Spinner from "./Spinner";
const AddOrderModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");
  const [addOrder] = useMutation(ADD_ORDER, {
    variables: {
      name,
      description,
      clientId,
      status,
    },
    update(cache, { data: { addOrder } }) {
      const { orders } = cache.readQuery({ query: GET_ORDERS });
      cache.writeQuery({
        query: GET_ORDERS,
        data: { orders: [...orders, addOrder] },
      });
    }
  });
  // getting clients for select input : client id :
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const addOrderSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, email, phone });
    if (name === "" || description === "" || status === "" || clientId === "") {
      return alert("fill all fields");
    }
    addOrder(name, description, clientId, status);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return <Spinner />;

  if (error) return <div>{`error : ${error.message}`}</div>;

  return (
    <>
      {!loading && !error && (
        <>
          <button>Open Add Order modal</button>
          <div className="addClientModal">
            <form onSubmit={addOrderSubmit}>
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
              <div className="formLabel">Client </div>

              <select
                id="clientId"
                className="form-select"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                {data.clients.map((c) => (
                  <option value={c.id}>{c.name + "|" + c.email}</option>
                ))}
              </select>

              <button type="submit">Submit</button>
            </form>

            <>
              {JSON.stringify(
                { name, description, status, clientId },
                null,
                "\n"
              )}
            </>
          </div>
        </>
      )}
    </>
  );
};

export default AddOrderModal;
