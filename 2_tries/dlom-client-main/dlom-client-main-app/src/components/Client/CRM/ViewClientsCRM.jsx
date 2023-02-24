import { useMutation, useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { BsArrowDownSquare, BsChatRight } from "react-icons/bs";
import { FiDelete, FiEdit } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";
import { ThemeContext } from "../../../App";
import { UPDATE_CLIENT } from "../../../mutations/dlomClientMutation";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import Spinner from "../../Spinner";
import CRMCSV from "./CRMCSV";
import ViewChatsAccordion from "./ViewChatsAccordion";
const ViewClientsCRM = ({
  currClient,
  setCurrClient,
  setCurrChat,
  setIsUpdate,
  deleteItem,
  deleteItemAPI,
  setOpenDialog,
}) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const tc = useContext(ThemeContext);

  const [state, setState] = useState({ id: "", typeOfCustomer: "permanent" });
  const [delChatState, setDelChatState] = useState({ id: "" });
  const [delDialog, setDelDialog] = useState(false);
  const [convertDialog, setConvertDialog] = useState(false);

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
            {/* {state.id && (
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
            )} */}

            <Dialog
              open={convertDialog}
              fullWidth={true}
              // maxWidth={}
              onClose={(e, r) => {
                if (r === "backdropClick") {
                  setState({ ...state, id: "" });
                  setConvertDialog(!convertDialog);
                } else {
                  setState({ ...state, id: "" });
                  setConvertDialog(!convertDialog);
                }
              }}
              // PaperComponent={}
              PaperProps={{
                sx: {
                  minHeight: "6rem",
                  borderRadius: "1rem",
                  background: tc.theme === "light" ? "#ebecf0" : "#232427",
                  color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
                },
              }}
              scroll={"body"}
              id={tc.theme}
            >
              <div
                className="css5Form "
                style={{
                  padding: "1rem",
                }}
              >
                <h6
                  style={{
                    textAlign: "center",
                    fontSize: "1rem",
                    marginBottom: ".5rem",
                  }}
                >
                  Are you sure you want to convert the potential client to
                  permanent?
                </h6>
                <div className="FlexAround">
                  <div
                    onClick={() => {
                      updateClientConvert(state.id, state.typeOfCustomer);
                      setState({ ...state, id: "" });
                      setConvertDialog(false);
                    }}
                    className="btn1"
                    style={{
                      fontSize: ".6rem",
                      padding: ".6rem .4rem",
                      margin: "0",
                      width: "30%",
                    }}
                  >
                    Convert
                  </div>
                  <div
                    onClick={() => {
                      setConvertDialog(false);
                      setState({ ...state, id: "" });
                    }}
                    className="btn3"
                    style={{
                      fontSize: ".6rem",
                      padding: ".6rem .4rem",
                      margin: "0",
                      width: "30%",
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </Dialog>

            {/* {delChatState.id && (
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
            )} */}

            <Dialog
              open={delDialog}
              fullWidth={true}
              // maxWidth={}
              onClose={(e, r) => {
                if (r === "backdropClick") {
                  setDelChatState({ ...delChatState, id: "" });
                  setCurrClient({});
                  setDelDialog(!delDialog);
                } else {
                  setDelChatState({ ...delChatState, id: "" });
                  setCurrClient({});
                  setDelDialog(!delDialog);
                }
              }}
              // PaperComponent={}
              PaperProps={{
                sx: {
                  minHeight: "6rem",
                  borderRadius: "1rem",
                  background: tc.theme === "light" ? "#ebecf0" : "#232427",
                  color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
                },
              }}
              scroll={"body"}
              id={tc.theme}
            >
              <div
                className="css5Form "
                style={{
                  padding: "1rem",
                }}
              >
                <h6
                  style={{
                    textAlign: "center",
                    fontSize: "1rem",
                    marginBottom: ".5rem",
                  }}
                >
                  Delete the chat?
                </h6>
                <div className="FlexAround">
                  <div
                    onClick={() => {
                      deleteItemAPI();
                      setDelChatState({ ...delChatState, id: "" });
                      setCurrClient({});
                      setDelDialog(false);
                    }}
                    className="btn3"
                    style={{
                      fontSize: ".6rem",
                      padding: ".6rem .4rem",
                      margin: "0",
                      width: "30%",
                    }}
                  >
                    Delete
                  </div>
                  <div
                    onClick={() => {
                      setDelDialog(false);
                      setDelChatState({ ...delChatState, id: "" });
                      setCurrClient({});
                    }}
                    className="btn1"
                    style={{
                      fontSize: ".6rem",
                      padding: ".6rem .4rem",
                      margin: "0",
                      width: "30%",
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
          <div
            style={{
              margin: ".5rem",
              marginBottom: "5rem",
            }}
            className="css9BasicGrid"
          >
            {data.clients.map((client, i) => (
              <div className="css1Card" key={client.id}>
                <div className="FlexBetween">
                  <div
                    className="css1Btn"
                    onClick={() => {
                      settingCurrClient(client);
                      setOpenDialog(true);
                    }}
                  >
                    Add Chat
                  </div>
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
                    <div
                      className="css1Btn"
                      onClick={() => {
                        setState({ ...state, id: client.id });
                        setConvertDialog(true);
                      }}
                    >
                      Convert
                    </div>
                  )}
                </div>
                <div className="css1ContentBx">
                  <div className="css9BasicGrid1">
                    <div className="tag">Client Details</div>
                    <div className="info">
                      <div>{client.companyName}</div>
                      <div>{client.contactPersonName}</div>
                      <div>{client.address}</div>
                      <div>{client.phoneNumber}</div>
                      <div>{client.salesPersonAssigned}</div>
                      <div>{client.typeOfCustomer}</div>
                      {client.clientSocialMedia.map((cs) => (
                        <div>
                          <h3>{cs.title}</h3>
                          <a
                            style={{
                              color: "cyan",
                            }}
                            href={cs.link}
                            target="__blank"
                          >
                            {cs.link}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <CRMCSV
                      crmData={client?.crm}
                      fileTitle={client?.companyName}
                    />
                  </div>

                  <ViewChatsAccordion
                    client={client}
                    setOpenDialog={setOpenDialog}
                    settingCurrClient={settingCurrClient}
                    setCurrChat={setCurrChat}
                    setIsUpdate={setIsUpdate}
                    setDelDialog={setDelDialog}
                    setDelChatState={setDelChatState}
                    delChatState={delChatState}
                    deleteItem={deleteItem}
                    tc={tc}
                  />
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
