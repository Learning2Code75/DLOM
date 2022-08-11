import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientsQueries";
const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
    // refetchQueries: [{ query: GET_CLIENTS }],
  });

  const addClientSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, email, phone });
    if (name === "" || email === "" || phone === "") {
      return alert("fill all fields");
    }
    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <>
      <button>Open Add Client modal</button>
      <div className="addClientModal">
        <form onSubmit={addClientSubmit}>
          <div className="formLabel">Name</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="formControl"
          />
          <div className="formLabel">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="name"
            className="formControl"
          />
          <div className="formLabel">Phone</div>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="name"
            className="formControl"
          />
          <button type="submit">Submit</button>
        </form>

        <>{JSON.stringify({ name, email, phone }, null, "\n")}</>
      </div>
    </>
  );
};

export default AddClientModal;
