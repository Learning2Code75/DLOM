import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UPDATE_CLIENT_CRM } from "../../../mutations/dlomClientMutation";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import ViewClientsCRM from "./ViewClientsCRM";

const CRM = () => {
  const [state, setState] = useState({
    date: "",
    time: "",
    msg: "msg1",
    type: "client",
    timestamp: "",
  });
  const [currClient, setCurrClient] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const clear = () => {
    setState({
      date: "",
      time: "",
      msg: "msg1",
      type: "client",
      timestamp: "",
    });
    setCurrClient({});
    setIsUpdate(false);
  };
  const [updateClientCRM, { data, loading, error }] = useMutation(
    UPDATE_CLIENT_CRM,
    {
      variables: {
        id: currClient.id,
        crm: currClient.crm,
      },
      onCompleted: () => clear(),
      refetchQueries: [
        { query: GET_CLIENTS, variables: { id: currClient.id } },
      ],
    }
  );
  const updateCRM = () => {
    console.log(currClient);
    // updateClientCRM()
  };
  useEffect(() => {
    console.log(error);
  }, [error]);
  const addChat = (e) => {
    e.preventDefault();
    let new_client = { ...currClient };
    let new_chat = {
      msg: state.msg,
      personType: state.type,
      timestamp: state.timestamp,
    };
    new_client.crm = [...new_client.crm, new_chat];
    new_client.crm = new_client.crm.map((c) => ({
      msg: c.msg,
      personType: c.personType,
      timestamp: c.timestamp,
    }));
    setCurrClient(new_client);
    // updateClientCRM(currClient.id, currClient.crm);
    // updateCRM();
    console.log(new_client.crm, currClient.id);
    // updateClientCRM(currClient.id, currClient.crm);
  };
  const updateChat = (e) => {
    e.preventDefault();
    let new_client = { ...currClient };
    let new_chat = {
      msg: state.msg,
      personType: state.type,
      timestamp: state.timestamp,
    };
    new_client.crm = new_client.crm.map((c, index) => {
      if (index === state.index) {
        return new_chat;
      } else {
        return {
          msg: c.msg,
          personType: c.personType,
          timestamp: c.timestamp,
        };
      }
    });
    setCurrClient(new_client);
  };
  const deleteItem = (client, index) => {
    let new_client = { ...client };
    new_client.crm = new_client.crm.filter((c, idx) => idx !== index);
    new_client.crm = new_client.crm.map((c, index) => {
      return {
        msg: c.msg,
        personType: c.personType,
        timestamp: c.timestamp,
      };
    });
    setCurrClient(new_client);
    // setTimeout(() => {
    //   // updateClientCRM(currClient.id, currClient.crm);
    //   console.log(currClient);
    // }, 100);
  };
  const deleteItemAPI = () => {
    updateClientCRM(currClient.id, currClient.crm);
  };
  return (
    <div>
      <Link to="/client">Client</Link>
      <h1>CRM</h1>
      <pre>{JSON.stringify(currClient, null, 2)}</pre>
      <div>
        <form>
          <h2>Chat Modal</h2>

          <div className="formLabel">Date</div>
          <input
            type="date"
            value={state.date}
            onChange={(e) =>
              setState({
                ...state,
                date: e.target.value,
                timestamp: ` ${e.target.value} ${state.time}`,
              })
            }
            id="date"
            className="formControl"
          />
          <div className="formLabel">Time</div>
          <input
            type="time"
            value={state.time}
            onChange={(e) =>
              setState({
                ...state,
                time: e.target.value,
                timestamp: `${state.date} ${e.target.value}`,
              })
            }
            id="time"
            className="formControl"
          />

          <div className="formLabel">Message</div>
          <input
            type="text"
            value={state.msg}
            onChange={(e) =>
              setState({
                ...state,
                msg: e.target.value,
              })
            }
            id="msg"
            className="formControl"
          />

          <div className="formLabel">Message written by</div>
          <select
            type="text"
            value={state.type}
            onChange={(e) =>
              setState({
                ...state,
                type: e.target.value,
              })
            }
            id="type"
            className="formControl"
          >
            <option value={"client"}>Client</option>
            <option value={"sp"}>Salesperson</option>
          </select>
          <div>
            <button
              onClick={isUpdate ? (e) => updateChat(e) : (e) => addChat(e)}
            >
              {isUpdate ? "Update Chat" : "Add Chat"}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                updateClientCRM(currClient.id, currClient.crm);
              }}
            >
              {"Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <div>
        <ViewClientsCRM
          currClient={currClient}
          setCurrClient={setCurrClient}
          currChat={state}
          setCurrChat={setState}
          setIsUpdate={setIsUpdate}
          deleteItem={deleteItem}
          deleteItemAPI={deleteItemAPI}
        />
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(isUpdate, null, 2)}</pre>
      <pre>{JSON.stringify(currClient, null, 2)}</pre>
    </div>
  );
};

export default CRM;
