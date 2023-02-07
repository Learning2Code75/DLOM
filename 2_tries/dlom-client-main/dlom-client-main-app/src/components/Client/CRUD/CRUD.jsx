import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientSocialMediaInput from "./ClientSocialMediaInput";
import { GrFormAdd } from "react-icons/gr";
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

const CRUD = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.authData?.result);

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
          className="dashboardLink"
          style={{
            marginRight: "1rem",
            fontSize: "2em",
            color: "white",
            boxShadow:
              " inset 5px 5px 5px rgba(0,0,0,0.2),inset -5px -5px 15px rgba(255,255,255,0.1), 5px 5px 15px rgba(0,0,0,0.3),  -5px -5px 15px rgba(255,255,255,0.2)",
            borderRadius: ".64rem",
            padding: ".4rem .6rem",
            cursor: "pointer",
          }}
        >
          <TiArrowLeftThick
            style={{
              margin: "0",
              padding: "0",
            }}
          />
        </Link>
        <h1>Manage Clients</h1>
      </div>

      {(user?.userRole === "manager" ||
        user?.userRole === "root" ||
        user?.userRole === "salesperson" ||
        user?.userRole === "finance") && (
        <div>
          <h1>Client CRUD</h1>
          <pre>{JSON.stringify(state, null, 2)}</pre>
          <pre>{JSON.stringify(isUpdate, null, 2)}</pre>

          <form>
            <div className="formLabel">Company Name</div>
            <input
              type="text"
              value={state.companyName}
              onChange={(e) =>
                setState({ ...state, companyName: e.target.value })
              }
              id="companyName"
              className="formControl"
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
            />

            <div className="formLabel">Address</div>
            <input
              type="text"
              value={state.address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
              id="address"
              className="formControl"
            />

            <div className="formLabel">GST No.</div>
            <input
              type="text"
              value={state.gst}
              onChange={(e) => setState({ ...state, gst: e.target.value })}
              id="gst"
              className="formControl"
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
            />

            <div className="formLabel">Type of Customer</div>

            <select
              value={state.typeOfCustomer}
              onChange={(e) =>
                setState({ ...state, typeOfCustomer: e.target.value })
              }
            >
              <option value={"permanent"}>Permanent</option>
              <option value={"potential"}>Potential</option>
            </select>

            <div className="formLabel">
              Client Social Media{" "}
              <span>
                <button onClick={addClientSocial}>+</button>
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

            <button
              onClick={
                isUpdate
                  ? (e) => {
                      updateClientSubmit(e);
                    }
                  : (e) => addClientSubmit(e)
              }
            >
              {isUpdate ? "Update Client" : "Add Client"}
            </button>
            {isUpdate && (
              <button onClick={(e) => clearCurrClient(e)}>Cancel</button>
            )}
          </form>
        </div>
      )}
      <div>
        <h2>Clients</h2>
        <ViewClients
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
