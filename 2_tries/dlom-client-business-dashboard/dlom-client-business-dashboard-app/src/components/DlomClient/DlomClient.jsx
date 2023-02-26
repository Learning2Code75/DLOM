import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { TiArrowLeftThick } from "react-icons/ti";
import { GrAdd, GrClose, GrFormAdd } from "react-icons/gr";

import { createBilling } from "../../redux/actions/billings";
import {
  createDlomClient,
  deleteDlomClient,
  getDlomClients,
  updateDlomClient,
} from "../../redux/actions/dlomclients";

const DlomClient = () => {
  const dispatch = useDispatch();
  const dlomclients = useSelector((state) => state.dlomclients);
  // console.log(dlomclients);
  const subs = useSelector((state) => state.subscriptions);
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);
  const [openSubDialog, setOpenSubDialog] = useState(false);
  const [state, setState] = useState({
    tracking: {
      CliOps: 0,
      UserOps: 0,
      ProdOps: 0,
      OrderOps: 0,
      TaskOps: 0,
    },
    carryForward: {
      CliOps: 0,
      UserOps: 0,
      ProdOps: 0,
      OrderOps: 0,
      TaskOps: 0,
    },
    companyName: "",
    locationPin: "",
    state: "",
    cin: "",
    gst: "",
    address: "",
    phone: "",
    desc: "",
    operations: {
      CliOps: "allowed",
      UserOps: "allowed",
      ProdOps: "allowed",
      OrderOps: "allowed",
      TaskOps: "allowed",
    },
    subscription: {},
  });
  const [addSubState, setAddSubState] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAddSub, setIsAddSub] = useState(false);

  const clearState = () => {
    setState({
      tracking: {
        CliOps: 0,
        UserOps: 0,
        ProdOps: 0,
        OrderOps: 0,
        TaskOps: 0,
      },
      carryForward: {
        CliOps: 0,
        UserOps: 0,
        ProdOps: 0,
        OrderOps: 0,
        TaskOps: 0,
      },
      companyName: "",
      locationPin: "",
      state: "",
      cin: "",
      gst: "",
      address: "",
      phone: "",
      desc: "",
      operations: {
        CliOps: "allowed",
        UserOps: "allowed",
        ProdOps: "allowed",
        OrderOps: "allowed",
        TaskOps: "allowed",
      },
      subscription: {},
    });
    setIsUpdate(false);
    setAddSubState({});
  };

  const terminateDlomClient = (s) => {
    let new_s = { ...s };
    let temp = new_s.status;
    if (temp === "active") {
      new_s.status = "inactive";
    } else {
      new_s.status = "active";
    }
    // console.log(new_s);
    dispatch(updateDlomClient(new_s._id, new_s));
  };

  useEffect(() => {
    dispatch(getDlomClients());
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
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
        <h2>Dashboard</h2>
      </div>

      <div className="dialogOpenContainer">
        <div className="openStylesButton1" onClick={() => setOpenDialog(true)}>
          Create Dlom Client
        </div>
      </div>

      {/* <h5>Create Dlom client</h5> */}
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <Dialog
        open={openDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            clearState();
            setOpenDialog(!openDialog);
          } else {
            clearState();
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
        <form className="css5Form">
          <div className="FlexBetween">
            <h2> {isUpdate ? "Update Client" : "Add Client"}</h2>
            <IconButton
              onClick={() => {
                setOpenDialog(false);
                clearState();
              }}
              style={{
                background: tc.theme === "dark" ? "lightgrey" : "transparent",
                padding: ".25rem",
              }}
            >
              <GrClose />
            </IconButton>
          </div>
          <div className="formLabel">Company Name</div>
          <input
            placeholder="Company Name"
            value={state.companyName}
            onChange={(e) => {
              setState({ ...state, companyName: e.target.value });
            }}
            className="formControl"
          />
          <div className="formLabel">Location Pin</div>
          <input
            placeholder="Location Pin"
            value={state.locationPin}
            onChange={(e) => {
              setState({ ...state, locationPin: e.target.value });
            }}
            className="formControl"
          />
          <div className="formLabel">State</div>
          <input
            placeholder="State"
            value={state.state}
            onChange={(e) => {
              setState({ ...state, state: e.target.value });
            }}
            className="formControl"
          />
          <div className="formLabel">Cin</div>
          <input
            placeholder="Cin"
            value={state.cin}
            onChange={(e) => {
              setState({ ...state, cin: e.target.value });
            }}
            className="formControl"
          />
          <div className="formLabel">GST</div>
          <input
            placeholder="GST"
            value={state.gst}
            onChange={(e) => {
              setState({ ...state, gst: e.target.value });
            }}
            className="formControl"
          />
          <div className="formLabel">Address</div>
          <input
            placeholder="Address"
            value={state.address}
            onChange={(e) => {
              setState({ ...state, address: e.target.value });
            }}
            className="formControl"
          />
          <div className="formLabel">Phone</div>
          <input
            placeholder="Phone"
            value={state.phone}
            onChange={(e) => {
              setState({ ...state, phone: e.target.value });
            }}
            className="formControl"
          />
          <div className="formLabel">Description </div>
          <input
            placeholder="Description"
            value={state.desc}
            onChange={(e) => {
              setState({ ...state, desc: e.target.value });
            }}
            className="formControl"
          />

          {isUpdate ? (
            <div
              onClick={() => {
                dispatch(updateDlomClient(state._id, state));
                clearState();
                setIsUpdate(false);
                setOpenDialog(false);
              }}
              className="btn2"
            >
              Edit Dlom client
            </div>
          ) : (
            <div
              onClick={() => {
                dispatch(createDlomClient(state));
                clearState();
                setOpenDialog(false);
              }}
              className="btn2"
            >
              Add Dlom client
            </div>
          )}
        </form>
      </Dialog>

      <Dialog
        open={openSubDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            clearState();
            setOpenSubDialog(false);
          } else {
            clearState();
            setOpenSubDialog(false);
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
        {isAddSub && (
          <div className="css5Form">
            <div className="FlexBetween">
              <h2> Client Subscription Update/Add</h2>
              <IconButton
                onClick={() => {
                  setOpenSubDialog(false);
                  clearState();
                }}
                style={{
                  background: tc.theme === "dark" ? "lightgrey" : "transparent",
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
            </div>

            <div className="formLabel">Add Subscription</div>
            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

            <select
              value={state?.subscription?._id}
              onChange={(e) => {
                setState({ ...state, subscription: { _id: e.target.value } });
              }}
              className="btn1"
            >
              <option value="--">Select Subscription</option>
              {subs.map((s) => (
                <option value={s._id}>
                  {s.name} [cliops : {s.tracking.CliOps} | userops :
                  {s.tracking.UserOps} | prodops : {s.tracking.ProdOps} |
                  orderops:
                  {s.tracking.OrderOps} | taskops : {s.tracking.TaskOps}]
                </option>
              ))}
            </select>
            <div
              className="btn2"
              onClick={() => {
                let new_state = { ...state };
                // console.log(new_state);
                let old_state = { ...addSubState };

                if (old_state.subscription.tracking !== undefined) {
                  let new_cli_ops =
                    old_state.carryForward.CliOps +
                    (old_state.subscription.tracking.CliOps -
                      old_state.tracking.CliOps);
                  let new_user_ops =
                    old_state.carryForward.UserOps +
                    (old_state.subscription.tracking.UserOps -
                      old_state.tracking.UserOps);
                  let new_prod_ops =
                    old_state.carryForward.ProdOps +
                    (old_state.subscription.tracking.ProdOps -
                      old_state.tracking.ProdOps);
                  let new_order_ops =
                    old_state.carryForward.OrderOps +
                    (old_state.subscription.tracking.OrderOps -
                      old_state.tracking.OrderOps);
                  let new_task_ops =
                    old_state.carryForward.TaskOps +
                    (old_state.subscription.tracking.TaskOps -
                      old_state.tracking.TaskOps);

                  // console.log(new_cli_ops);

                  new_state.carryForward = {
                    CliOps: new_cli_ops,
                    UserOps: new_user_ops,
                    ProdOps: new_prod_ops,
                    OrderOps: new_order_ops,
                    TaskOps: new_task_ops,
                  };
                }
                // console.log(new_state);

                // console.log(new_state.carryForward);
                let new_bill = {
                  dlom_client: { _id: new_state._id },
                  subscription: { _id: new_state.subscription._id },
                  timestamp: new Date().toISOString(),
                  payments: [],
                };

                new_state.tracking = {
                  CliOps: 0,
                  UserOps: 0,
                  ProdOps: 0,
                  OrderOps: 0,
                  TaskOps: 0,
                };
                new_state.operations = {
                  CliOps: "allowed",
                  UserOps: "allowed",
                  ProdOps: "allowed",
                  OrderOps: "allowed",
                  TaskOps: "allowed",
                };

                dispatch(createBilling(new_bill));

                dispatch(updateDlomClient(new_state._id, new_state));
                setIsAddSub(false);
                setOpenSubDialog(false);
              }}
            >
              Add/Edit Subscription
            </div>
            <pre>{JSON.stringify(addSubState, null, 2)}</pre>
          </div>
        )}
      </Dialog>

      <h2>Dlomclients </h2>
      <div
        style={{
          margin: ".5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        {dlomclients?.map((s) => (
          <div className="css1Card">
            <div>
              <div className="FlexBetween">
                <div
                  className="css1Btn"
                  onClick={() => {
                    setIsUpdate(true);
                    setState(s);
                    setOpenDialog(true);
                  }}
                >
                  Edit
                </div>
                <div
                  onClick={() => {
                    setIsAddSub(true);
                    setAddSubState(s);
                    setState(s);
                    setOpenSubDialog(true);
                    // console.log(s);
                  }}
                  className="css1Btn"
                >
                  Add/Edit Subscription
                </div>
              </div>
              <div
                className="FlexBetween"
                style={{
                  marginTop: "1rem",
                }}
              >
                <div
                  onClick={() => {
                    dispatch(deleteDlomClient(s._id));
                  }}
                  className="css1Btn"
                >
                  Delete
                </div>
                <div
                  onClick={() => {
                    terminateDlomClient(s);
                  }}
                  className="css1Btn"
                >
                  Terminate /Restart client
                </div>
              </div>
            </div>

            <div className="css1ContentBx">
              <div className="css9BasicGrid1">
                <div className="tag">Tracking</div>
                <div className="info">
                  <div>CliOps:{s?.tracking?.CliOps}</div>
                  <div>UserOps:{s?.tracking?.UserOps}</div>
                  <div>ProdOps:{s?.tracking?.ProdOps}</div>
                  <div>OrderOps:{s?.tracking?.OrderOps}</div>
                  <div>TaskOps:{s?.tracking?.TaskOps}</div>
                </div>
                <div className="tag">Carry Forward</div>
                <div className="info">
                  <div>CliOps:{s?.carryForward.CliOps}</div>
                  <div>UserOps:{s?.carryForward.UserOps}</div>
                  <div>ProdOps:{s?.carryForward.ProdOps}</div>
                  <div>OrderOps:{s?.carryForward.OrderOps}</div>
                  <div>TaskOps:{s?.carryForward.TaskOps}</div>
                </div>

                <div className="tag">Operations</div>
                <div className="info">
                  <div>CliOps:{s.operations.CliOps}</div>
                  <div>UserOps:{s.operations.UserOps}</div>
                  <div>ProdOps:{s.operations.ProdOps}</div>
                  <div>OrderOps:{s.operations.OrderOps}</div>
                  <div>TaskOps:{s.operations.TaskOps}</div>
                </div>

                <div className="tag">Client Details</div>
                <div className="info">
                  <div>Company Name: {s.companyName}</div>
                  <div>Location Pin: {s.locationPin}</div>
                  <div>State: {s.state}</div>
                  <div>Cin: {s.cin}</div>
                  <div>GST: {s.gst}</div>
                  <div>Address: {s.address}</div>
                  <div>Phone: {s.phone}</div>
                  <div>Desc: {s.desc}</div>
                </div>

                <div className="tag">Subscription Details</div>
                <div className="info">
                  <div>Name: {s?.subscription?.name}</div>
                  <div>Desc :{s?.subscription?.description}</div>
                  <div>Cost :{s?.subscription?.cost}</div>
                  Allowed Limits
                  <div>CliOps:{s?.subscription?.tracking?.CliOps}</div>
                  <div>UserOps:{s?.subscription?.tracking?.UserOps}</div>
                  <div>ProdOps:{s?.subscription?.tracking?.ProdOps}</div>
                  <div>OrderOps:{s?.subscription?.tracking?.OrderOps}</div>
                  <div>TaskOps:{s?.subscription?.tracking?.TaskOps}</div>
                </div>

                <div className="tag">Status</div>
                <div className="info">{s.status}</div>

                <div className="tag">Operations left</div>
                <div className="info">
                  <div>
                    CliOps:
                    {s?.subscription?.tracking?.CliOps +
                      s?.carryForward.CliOps -
                      s?.tracking.CliOps}
                  </div>
                  <div>
                    UserOps:
                    {s?.subscription?.tracking?.UserOps +
                      s?.carryForward?.UserOps -
                      s?.tracking?.UserOps}
                  </div>
                  <div>
                    ProdOps:
                    {s?.subscription?.tracking?.ProdOps +
                      s?.carryForward?.ProdOps -
                      s?.tracking?.ProdOps}
                  </div>
                  <div>
                    OrderOps:
                    {s?.subscription?.tracking?.OrderOps +
                      s?.carryForward?.OrderOps -
                      s?.tracking?.OrderOps}
                  </div>
                  <div>
                    TaskOps:
                    {s?.subscription?.tracking?.TaskOps +
                      s?.carryForward?.TaskOps -
                      s?.tracking?.TaskOps}
                  </div>
                </div>
              </div>
            </div>

            {/* <pre>{JSON.stringify(s, null, 2)}</pre> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default DlomClient;
