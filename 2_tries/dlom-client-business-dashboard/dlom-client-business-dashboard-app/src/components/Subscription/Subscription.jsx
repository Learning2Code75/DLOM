import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrAdd, GrClose, GrFormAdd } from "react-icons/gr";

import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  updateSubscription,
} from "../../redux/actions/subscriptions";
import { TiArrowLeftThick } from "react-icons/ti";
import { ThemeContext } from "../../App";
import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.subscriptions);
  const tc = useContext(ThemeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDialog, setOpenDialog] = useState(false);

  const [state, setState] = useState({
    tracking: {
      CliOps: 0,
      UserOps: 0,
      ProdOps: 0,
      OrderOps: 0,
      TaskOps: 0,
    },
    cost: "",
    costPer: "",
    status: "active",
    name: "",
    description: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const clearState = () => {
    setState({
      tracking: {
        CliOps: 0,
        UserOps: 0,
        ProdOps: 0,
        OrderOps: 0,
        TaskOps: 0,
      },
      cost: "",
      costPer: "",
      status: "active",
      name: "",
      description: "",
    });
    setIsUpdate(false);
  };

  useEffect(() => {
    dispatch(getSubscriptions());
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

      <h2>Subscriptions</h2>

      <div className="dialogOpenContainer">
        <div className="openStylesButton1" onClick={() => setOpenDialog(true)}>
          Create Sub
        </div>
      </div>

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
            <h2> {isUpdate ? "Update Sub" : "Add Sub"}</h2>
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
          <h4>Operation Limits</h4>
          <div className="formLabel">Client Operations</div>
          <input
            value={state.tracking.CliOps}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.tracking.CliOps = e.target.value;
              setState(new_state);
            }}
            className="formControl"
          />
          <div className="formLabel">Tracking Operations</div>

          <input
            value={state.tracking.UserOps}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.tracking.UserOps = e.target.value;
              setState(new_state);
            }}
            className="formControl"
          />
          <div className="formLabel">Product Operations</div>
          <input
            value={state.tracking.ProdOps}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.tracking.ProdOps = e.target.value;
              setState(new_state);
            }}
            className="formControl"
          />
          <div className="formLabel">Order Operations</div>
          <input
            value={state.tracking.OrderOps}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.tracking.OrderOps = e.target.value;
              setState(new_state);
            }}
            className="formControl"
          />
          <div className="formLabel">Task Operations</div>
          <input
            value={state.tracking.TaskOps}
            onChange={(e) => {
              let new_state = { ...state };
              new_state.tracking.TaskOps = e.target.value;
              setState(new_state);
            }}
            className="formControl"
          />
          <div className="formLabel">Cost</div>
          <input
            placeholder="Cost"
            value={state.cost}
            onChange={(e) => {
              setState({ ...state, cost: e.target.value });
            }}
            className="formControl"
          />

          <div className="formLabel">Cost per</div>
          <select
            placeholder="Cost Per"
            value={state.costPer}
            onChange={(e) => {
              setState({ ...state, costPer: e.target.value });
            }}
            className="btn1"
          >
            <option value="--">select cost per</option>
            <option value="operation">Operation</option>
          </select>

          <div className="formLabel">Subscription Name</div>
          <input
            placeholder="Subscription Name"
            value={state.name}
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
            className="formControl"
          />
          <div className="formLabel">Subscription Description</div>
          <input
            placeholder="Description"
            value={state.description}
            onChange={(e) => {
              setState({ ...state, description: e.target.value });
            }}
            className="formControl"
          />

          {isUpdate ? (
            <div
              className="btn2"
              onClick={() => {
                dispatch(updateSubscription(state._id, state));
                clearState();
                setIsUpdate(false);
                setOpenDialog(false);
              }}
            >
              Edit Subscription
            </div>
          ) : (
            <div
              className="btn2"
              onClick={() => {
                dispatch(createSubscription(state));
                clearState();
                setOpenDialog(false);
              }}
            >
              Add Subscription
            </div>
          )}
        </form>
      </Dialog>

      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

      <h2>View Subs </h2>
      <div
        style={{
          margin: ".5rem",
          marginBottom: "5rem",
        }}
        className="css9BasicGrid"
      >
        {subs.map((s) => (
          <div className="css1Card">
            <div>
              <div className="FlexBetween">
                <div
                  onClick={() => {
                    setOpenDialog(true);
                    setIsUpdate(true);
                    setState(s);
                  }}
                  className="css1Btn"
                >
                  Edit
                </div>
                <div
                  onClick={() => {
                    dispatch(deleteSubscription(s._id));
                  }}
                  className="css1Btn"
                >
                  Delete
                </div>
              </div>
              <div className="css1ContentBx">
                <div className="css9BasicGrid1">
                  <div className="tag">Name</div>
                  <div className="info">
                    <div>{s.name}</div>
                  </div>
                  <div className="tag">Description</div>
                  <div className="info">
                    <div>{s.description}</div>
                  </div>
                  <div className="tag">CliOps</div>
                  <div className="info">
                    <div>{s.tracking.CliOps}</div>
                  </div>
                  <div className="tag">UserOps</div>
                  <div className="info">
                    <div>{s.tracking.UserOps}</div>
                  </div>
                  <div className="tag">ProdOps</div>
                  <div className="info">
                    <div>{s.tracking.ProdOps}</div>
                  </div>
                  <div className="tag">OrderOps</div>
                  <div className="info">
                    <div>{s.tracking.OrderOps}</div>
                  </div>
                  <div className="tag">TaskOps</div>
                  <div className="info">
                    <div>{s.tracking.TaskOps}</div>
                  </div>
                  <div className="tag">Cost</div>
                  <div className="info">
                    <div>₹{s.cost}</div>
                  </div>
                  <div className="tag">Cost per</div>
                  <div className="info">
                    <div>{s.costPer}</div>
                  </div>
                  <div className="tag">Status</div>
                  <div className="info">
                    <div>{s.status}</div>
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

export default Subscriptions;
