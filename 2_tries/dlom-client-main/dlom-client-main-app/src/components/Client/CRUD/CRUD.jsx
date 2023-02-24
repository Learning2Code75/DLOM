import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientSocialMediaInput from "./ClientSocialMediaInput";
import { GrAdd, GrClose, GrFormAdd } from "react-icons/gr";
import { FiSave } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { TiArrowLeftThick } from "react-icons/ti";

import {
  ADD_CLIENT,
  UPDATE_CLIENT,
} from "../../../mutations/dlomClientMutation";
import { GET_CLIENTS } from "../../../queries/dlomClientQueries";
import ViewClients from "./ViewClients";
import { useDispatch, useSelector } from "react-redux";
import { createOp } from "../../../redux/actions/users";
import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { FaCross } from "react-icons/fa";
import { ThemeContext } from "../../../App";

const CRUD = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useSelector((state) => state?.auth?.authData?.result);
  const tc = useContext(ThemeContext);

  const [state, setState] = useState({
    companyName: "",
    clientSocialMedia: [{ title: "", link: "" }],
    contactPersonName: "",
    address: "",
    gst: "",
    phoneNumber: "",
    discountRate: "",
    salesPersonAssigned: "",
    typeOfCustomer: "permanent",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      companyName: state.companyName,
      contactPersonName: state.contactPersonName,
      address: state.address,
      gst: state.gst,
      phoneNumber: state.phoneNumber,
      discountRate: state.discountRate,
      salesPersonAssigned: state.salesPersonAssigned,
      clientSocialMedia: state.clientSocialMedia,
      typeOfCustomer: state.typeOfCustomer,
    },
    onCompleted: () => clearCurrClient(),
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const [updateClient, { data, loading, error }] = useMutation(UPDATE_CLIENT, {
    variables: {
      id: state.id,
      companyName: state.companyName,
      contactPersonName: state.contactPersonName,
      address: state.address,
      gst: state.gst,
      phoneNumber: state.phoneNumber,
      discountRate: state.discountRate,
      salesPersonAssigned: state.salesPersonAssigned,
      clientSocialMedia: state.clientSocialMedia,
      typeOfCustomer: state.typeOfCustomer,
    },
    onCompleted: () => clearCurrClient(),
    refetchQueries: [{ query: GET_CLIENTS, variables: { id: state.id } }],
  });

  const addClientSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOp({
        dlom_client: { _id: user?.dlom_client },
        operation_type: "client create",
      })
    );
    addClient(
      state.companyName,
      state.contactPersonName,
      state.address,
      state.gst,
      state.phoneNumber,
      state.discountRate,
      state.salesPersonAssigned,
      state.clientSocialMedia,
      state.typeOfCustomer
    );
    setOpenDialog(false);
  };

  const updateClientSubmit = (e) => {
    e.preventDefault();
    updateClient(
      state.id,
      state.companyName,
      state.contactPersonName,
      state.address,
      state.gst,
      state.phoneNumber,
      state.discountRate,
      state.salesPersonAssigned,
      state.clientSocialMedia,
      state.typeOfCustomer
    );
    setOpenDialog(false);
  };

  const addClientSocial = (e) => {
    e.preventDefault();
    let new_cli_soc_media = { ...state };
    let new_cli = { title: "", link: "" };
    new_cli_soc_media.clientSocialMedia = [
      ...new_cli_soc_media.clientSocialMedia,
      new_cli,
    ];
    setState(new_cli_soc_media);
  };

  const clearCurrClient = (e) => {
    // e.preventDefault();
    setState({
      companyName: "",
      clientSocialMedia: [{ title: "", link: "" }],
      contactPersonName: "",
      address: "",
      gst: "",
      phoneNumber: "",
      discountRate: "",
      salesPersonAssigned: "",
      typeOfCustomer: "permanent",
    });
    setIsUpdate(false);
  };

  return (
    <div>
      {/* <Link to="/client">Client</Link> */}
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
        <h2>Manage Clients</h2>
      </div>

      {(user?.userRole === "manager" ||
        user?.userRole === "root" ||
        user?.userRole === "salesperson" ||
        user?.userRole === "finance") && (
        <div>
          {/* <h1>Client CRUD</h1> */}

          <div className="dialogOpenContainer">
            <div
              className="openStylesButton1"
              onClick={() => setOpenDialog(true)}
            >
              Add Client
            </div>
          </div>

          <Dialog
            open={openDialog}
            fullWidth={true}
            fullScreen={fullScreen}
            // maxWidth={}
            onClose={(e, r) => {
              if (r === "backdropClick") {
                clearCurrClient();
                setOpenDialog(!openDialog);
              } else {
                clearCurrClient();
                setOpenDialog(!openDialog);
              }
            }}
            // PaperComponent={<PaperC />}
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
            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(isUpdate, null, 2)}</pre> */}
            <form className="css5Form">
              <div className="FlexBetween">
                <h2> {isUpdate ? "Update Client" : "Add Client"}</h2>
                <IconButton
                  onClick={() => {
                    setOpenDialog(false);
                    clearCurrClient();
                  }}
                  style={{
                    background:
                      tc.theme === "dark" ? "lightgrey" : "transparent",
                    padding: ".25rem",
                  }}
                >
                  <GrClose />
                </IconButton>
              </div>
              <div className="formLabel">Company Name</div>
              <input
                type="text"
                value={state.companyName}
                onChange={(e) =>
                  setState({ ...state, companyName: e.target.value })
                }
                // id="companyName"
                className="formControl"
                placeholder="Company Name"
              />

              <div className="formLabel">Contact Person Name</div>
              <input
                type="text"
                value={state.contactPersonName}
                onChange={(e) =>
                  setState({ ...state, contactPersonName: e.target.value })
                }
                id="contactPersonName"
                className="formControl"
                placeholder="Contact person"
              />

              <div className="formLabel">Address</div>
              <input
                type="text"
                value={state.address}
                onChange={(e) =>
                  setState({ ...state, address: e.target.value })
                }
                id="address"
                className="formControl"
                placeholder="Address"
              />

              <div className="formLabel">GST No.</div>
              <input
                type="text"
                value={state.gst}
                onChange={(e) => setState({ ...state, gst: e.target.value })}
                id="gst"
                className="formControl"
                placeholder="GSTN."
              />

              <div className="formLabel">Phone Number</div>
              <input
                type="text"
                value={state.phoneNumber}
                onChange={(e) =>
                  setState({ ...state, phoneNumber: e.target.value })
                }
                id="phoneNumber"
                className="formControl"
                placeholder="Phone No."
              />

              <div className="formLabel">Discount Rate</div>
              <input
                type="text"
                value={state.discountRate}
                onChange={(e) =>
                  setState({ ...state, discountRate: e.target.value })
                }
                id="discountRate"
                className="formControl"
                placeholder="Discount Rate"
              />

              <div className="formLabel">Sales Person Assigned</div>
              <input
                type="text"
                value={state.salesPersonAssigned}
                onChange={(e) =>
                  setState({ ...state, salesPersonAssigned: e.target.value })
                }
                id="salesPersonAssigned"
                className="formControl"
                placeholder="Salesperson Assigned"
              />

              <div className="formLabel">Type of Customer</div>

              <select
                value={state.typeOfCustomer}
                onChange={(e) =>
                  setState({ ...state, typeOfCustomer: e.target.value })
                }
                className="btn1"
              >
                <option value={"permanent"}>Permanent</option>
                <option value={"potential"}>Potential</option>
              </select>

              <div className="formLabel">
                Client Social Media{" "}
                <span>
                  <button
                    className="btn1"
                    style={{
                      width: "10%",
                      marginLeft: "0",
                      fontSize: "1.3em",
                      padding: ".6rem",
                    }}
                    onClick={addClientSocial}
                  >
                    +
                  </button>
                </span>
              </div>
              {state.clientSocialMedia.map((csm, index) => (
                <ClientSocialMediaInput
                  state={state}
                  setState={setState}
                  index={index}
                  csm={csm}
                  isUpdate={isUpdate}
                />
              ))}

              <div
                onClick={
                  isUpdate
                    ? (e) => {
                        updateClientSubmit(e);
                        clearCurrClient(e);
                      }
                    : (e) => addClientSubmit(e)
                }
                className="btn2"
              >
                {isUpdate ? "Update Client" : "Add Client"}
              </div>
              {isUpdate && (
                <div
                  onClick={(e) => {
                    clearCurrClient(e);
                    setOpenDialog(false);
                  }}
                  className="btn1"
                >
                  Cancel
                </div>
              )}
            </form>
          </Dialog>
        </div>
      )}
      <div>
        <h2>Clients</h2>
        <ViewClients
          setOpenDialog={setOpenDialog}
          currClient={state}
          setCurrClient={setState}
          setUpdate={setIsUpdate}
          clearCurrClient={clearCurrClient}
        />
      </div>
    </div>
  );
};

export default CRUD;
