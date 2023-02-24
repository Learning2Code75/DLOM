import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UPDATE_CLIENT_CRM } from "../../../mutations/dlomClientMutation";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import CRMCSV from "./CRMCSV";
import ViewClientsCRM from "./ViewClientsCRM";
import { TiArrowLeftThick } from "react-icons/ti";
import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { GrClose, GrFormAdd } from "react-icons/gr";
import { useContext } from "react";
import { ThemeContext } from "../../../App";

const CRM = () => {
  const theme = useTheme();
  const tc = useContext(ThemeContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, setState] = useState({
    date: "",
    time: "",
    msg: "msg1",
    type: "client",
    timestamp: "",
  });
  const [currClient, setCurrClient] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/client"
          className="openStylesButton1"
          style={{
            marginRight: "1rem",
            borderRadius: ".64rem",
            padding: ".6rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: tc.theme === "light" ? "#232427" : "#ebecf0",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h2>CRM</h2>
      </div>
      {/* <pre>{JSON.stringify(currClient, null, 2)}</pre> */}
      <div>
        <Dialog
          open={openDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clear();
              setOpenDialog(!openDialog);
            } else {
              clear();
              setOpenDialog(!openDialog);
            }
          }}
          // PaperComponent={}
          PaperProps={{
            sx: {
              borderRadius: "1rem",
              background: tc.theme === "light" ? "#ebecf0" : "#232427",
              color: tc.theme === "light" ? "#1c1c1c" : "#ebecf0",
            },
          }}
          scroll={"body"}
          id={tc.theme}
        >
          <form className="css5Form">
            <div className="FlexBetween">
              <h2> {isUpdate ? "Edit" : "Add"} Chat</h2>
              <IconButton
                onClick={() => {
                  setOpenDialog(false);
                  clear();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
            </div>
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
              className="btn1"
            >
              <option value={"client"}>Client</option>
              <option value={"sp"}>Salesperson</option>
            </select>
            <div
              className="FlexBetween"
              style={{
                marginTop: "1rem",
              }}
            >
              <div
                className="btn2"
                onClick={isUpdate ? (e) => updateChat(e) : (e) => addChat(e)}
                style={{
                  margin: "0",
                  width: "40%",
                }}
              >
                {isUpdate ? "Update Chat" : "Add Chat"}
              </div>

              <div
                className="btn2"
                onClick={(e) => {
                  e.preventDefault();
                  updateClientCRM(currClient.id, currClient.crm);
                  setOpenDialog(false);
                }}
                style={{
                  margin: "0",
                  width: "40%",
                  marginLeft: ".5em",
                }}
              >
                {"Save Changes"}
              </div>
              {/* <div
                className="btn2"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialog(false);
                  clear();
                }}
                style={{
                  margin: "0",
                  width: "20%",
                  marginLeft: ".5em",
                }}
              >
                Cancel
              </div> */}
            </div>
          </form>
        </Dialog>
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
          setOpenDialog={setOpenDialog}
        />
      </div>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(isUpdate, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(currClient, null, 2)}</pre> */}
    </div>
  );
};

export default CRM;
