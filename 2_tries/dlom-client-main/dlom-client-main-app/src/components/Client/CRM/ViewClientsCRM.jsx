import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { UPDATE_CLIENT } from "../../../mutations/dlomClientMutation";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import Spinner from "../../Spinner";
import CRMCSV from "./CRMCSV";
const ViewClientsCRM = ({
  currClient,
  setCurrClient,
  setCurrChat,
  setIsUpdate,
  deleteItem,
  deleteItemAPI,
}) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [state, setState] = useState({ id: "", typeOfCustomer: "permanent" });
  const [delChatState, setDelChatState] = useState({ id: "" });

  const [updateClientConvert] = useMutation(UPDATE_CLIENT, {
    variables: {
      id: state.id,
      typeOfCustomer: state.typeOfCustomer,
    },
    refetchQueries: [{ query: GET_CLIENTS, variables: { id: state.id } }],
  });

  // const [updateClientDelChat] = useMutation(UPDATE_CLIENT, {
  //   variables: {
  //     id: delChatState.id,
  //     crm: currClient.crm,
  //   },
  //   refetchQueries: [
  //     { query: GET_CLIENTS, variables: { id: delChatState.id } },
  //   ],
  // });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
    return <p>Something went wrong...</p>;
  }

  const settingCurrClient = (client) => {
    let new_csm = [...client.clientSocialMedia];
    new_csm = new_csm.map((nc) => ({ title: nc.title, link: nc.link }));

    setCurrClient({
      ...client,
      clientSocialMedia: new_csm,
    });
  };

  return (
    <div>
      {!loading && !error && (
        <>
          <div className="partials">
            {state.id && (
              <div>
                <p>
                  Are you sure you want to convert the potential client to
                  permanent?
                </p>
                <button
                  className="btn"
                  onClick={() => {
                    updateClientConvert(state.id, state.typeOfCustomer);
                    setState({ ...state, id: "" });
                  }}
                >
                  Convert
                </button>
                <button
                  className="btn"
                  onClick={() => setState({ ...state, id: "" })}
                >
                  Cancel
                </button>
              </div>
            )}

            {delChatState.id && (
              <div>
                <p>Are you sure you want to delete the message?</p>
                <button
                  className="btn"
                  onClick={() => {
                    deleteItemAPI();
                    setDelChatState({ ...delChatState, id: "" });
                    setCurrClient({});
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setDelChatState({ ...delChatState, id: "" });
                    setCurrClient({});
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div
            style={{
              margin: "1rem",
            }}
          >
            {data.clients.map((client, i) => (
              <div
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "1rem",
                  marginBottom: "1rem",
                }}
                key={client.id}
              >
                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      settingCurrClient(client);
                    }}
                  >
                    Add Chat
                  </button>
                  {/* <button
                  className="btn"
                  //   onClick={() => {
                  //     settingCurrClient(client);
                  //     deleteClient();
                  //   }}
                >
                  Delete
                </button> */}
                  {client.typeOfCustomer === "potential" && (
                    <button
                      className="btn"
                      onClick={() => setState({ ...state, id: client.id })}
                    >
                      Convert
                    </button>
                  )}
                </div>
                <div>
                  <div>{client.companyName}</div>
                  <div>{client.contactPersonName}</div>
                  <div>{client.address}</div>
                  <div>{client.phoneNumber}</div>
                  <div>{client.salesPersonAssigned}</div>
                  <div>{client.typeOfCustomer}</div>
                  <div>
                    <CRMCSV crmData={client?.crm} />
                  </div>
                  {client.clientSocialMedia.map((cs) => (
                    <div>
                      <h3>{cs.title}</h3>
                      <p>{cs.link}</p>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {client.crm.map((c, index) => (
                      <div
                        style={{
                          border: "1px solid lightgrey",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "1rem",
                          alignItems: "flex-start",
                          margin: "1rem",
                          padding: ".5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                          }}
                        >
                          <FiEdit
                            style={{
                              marginRight: ".5rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              settingCurrClient(client);
                              setCurrChat({
                                time: c.timestamp.split(" ")[1],
                                date: c.timestamp.split(" ")[0],
                                msg: c.msg,
                                type: c.personType,
                                timestamp: c.timestamp,
                                index: index,
                              });
                              setIsUpdate(true);
                            }}
                          />
                          <FiDelete
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setDelChatState({
                                ...delChatState,
                                id: client.id,
                              });
                              deleteItem(client, index);
                            }}
                          />
                        </div>
                        <span
                          style={{
                            textDecoration: "underline",
                          }}
                        >
                          {c.personType === "client"
                            ? "client:"
                            : "salesperson:"}
                          {c.personType === "client"
                            ? client.contactPersonName
                            : client.salesPersonAssigned}
                        </span>
                        <h5>{c.msg}</h5>
                        <span>{c.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewClientsCRM;
