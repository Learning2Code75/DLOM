import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  const subs = useSelector((state) => state.subscriptions);
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
  });
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
    });
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
      <div>Dlom Client</div>
      <Link to="/">Dashboard</Link>

      <h5>Create Dlom client</h5>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div>
        <input
          placeholder="Company Name"
          value={state.companyName}
          onChange={(e) => {
            setState({ ...state, companyName: e.target.value });
          }}
        />
        <input
          placeholder="Location Pin"
          value={state.locationPin}
          onChange={(e) => {
            setState({ ...state, locationPin: e.target.value });
          }}
        />
        <input
          placeholder="State"
          value={state.state}
          onChange={(e) => {
            setState({ ...state, state: e.target.value });
          }}
        />
        <input
          placeholder="Cin"
          value={state.cin}
          onChange={(e) => {
            setState({ ...state, cin: e.target.value });
          }}
        />
        <input
          placeholder="GST"
          value={state.gst}
          onChange={(e) => {
            setState({ ...state, gst: e.target.value });
          }}
        />
        <input
          placeholder="Address"
          value={state.address}
          onChange={(e) => {
            setState({ ...state, address: e.target.value });
          }}
        />
        <input
          placeholder="Phone"
          value={state.phone}
          onChange={(e) => {
            setState({ ...state, phone: e.target.value });
          }}
        />
        <input
          placeholder="Description"
          value={state.desc}
          onChange={(e) => {
            setState({ ...state, desc: e.target.value });
          }}
        />

        {isUpdate ? (
          <button
            onClick={() => {
              dispatch(updateDlomClient(state._id, state));
              clearState();
              setIsUpdate(false);
            }}
          >
            Edit Dlom client
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(createDlomClient(state));
              clearState();
            }}
          >
            Add Dlom client
          </button>
        )}
      </div>

      {isAddSub && (
        <>
          <div>Add Subscription</div>
          <pre>{JSON.stringify(state, null, 2)}</pre>
          <select
            value={state?.subscription?._id}
            onChange={(e) => {
              setState({ ...state, subscription: { _id: e.target.value } });
            }}
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
          <button
            onClick={() => {
              let new_state = { ...state };
              if (new_state.subscription.tracking !== undefined) {
                let new_cli_ops =
                  new_state.carryForward.CliOps +
                  (new_state.subscription.tracking.CliOps -
                    new_state.tracking.CliOps);
                let new_user_ops =
                  new_state.carryForward.UserOps +
                  (new_state.subscription.tracking.UserOps -
                    new_state.tracking.UserOps);
                let new_prod_ops =
                  new_state.carryForward.ProdOps +
                  (new_state.subscription.tracking.ProdOps -
                    new_state.tracking.ProdOps);
                let new_order_ops =
                  new_state.carryForward.OrderOps +
                  (new_state.subscription.tracking.OrderOps -
                    new_state.tracking.OrderOps);
                let new_task_ops =
                  new_state.carryForward.TaskOps +
                  (new_state.subscription.tracking.TaskOps -
                    new_state.tracking.TaskOps);

                new_state.carryForward = {
                  CliOps: new_cli_ops,
                  UserOps: new_user_ops,
                  ProdOps: new_prod_ops,
                  OrderOps: new_order_ops,
                  TaskOps: new_task_ops,
                };
              }

              console.log(new_state.carryForward);
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
            }}
          >
            Add/Edit Subscription
          </button>
        </>
      )}

      <div>View Dlomclients </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "10px",
          margin: "0 auto",
          maxWidth: "95vw",
          marginBottom: "2rem",
        }}
      >
        {dlomclients.map((s) => (
          <div
            style={{
              border: "1px solid lightgrey",
              padding: ".5rem",
              borderRadius: ".5rem",
            }}
          >
            <pre>{JSON.stringify(s, null, 2)}</pre>
            <div>
              <button
                onClick={() => {
                  setIsUpdate(true);
                  setState(s);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setIsAddSub(true);
                  setState(s);
                }}
              >
                Add/Edit Subscription
              </button>
              <button
                onClick={() => {
                  dispatch(deleteDlomClient(s._id));
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  terminateDlomClient(s);
                }}
              >
                Terminate /Restart client
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DlomClient;
