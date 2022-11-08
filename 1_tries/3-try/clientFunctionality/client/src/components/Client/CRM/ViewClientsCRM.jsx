import { useQuery } from "@apollo/client";
import React from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import Spinner from "../../Spinner";
const ViewClientsCRM = ({
  setCurrClient,
  setCurrChat,
  setIsUpdate,
  deleteItem,
}) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

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
                <button
                  className="btn"
                  //   onClick={() => {
                  //     settingCurrClient(client);
                  //     deleteClient();
                  //   }}
                >
                  Delete
                </button>
                {client.typeOfCustomer === "potential" && (
                  <button
                    className="btn"
                    //   onClick={() => {
                    //     settingCurrClient(client);
                    //     deleteClient();
                    //   }}
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
      )}
    </div>
  );
};

export default ViewClientsCRM;
