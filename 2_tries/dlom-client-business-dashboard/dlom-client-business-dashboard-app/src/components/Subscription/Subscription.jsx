import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  updateSubscription,
} from "../../redux/actions/subscriptions";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.subscriptions);

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
  };

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  return (
    <>
      <div>Subscriptions</div>
      <Link to="/">Dashboard</Link>

      <h5>Create Sub</h5>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div>
        <div>Operation Limits</div>
        <div>Client Operations</div>
        <input
          value={state.tracking.CliOps}
          onChange={(e) => {
            let new_state = { ...state };
            new_state.tracking.CliOps = e.target.value;
            setState(new_state);
          }}
        />
        <div>Tracking Operations</div>

        <input
          value={state.tracking.UserOps}
          onChange={(e) => {
            let new_state = { ...state };
            new_state.tracking.UserOps = e.target.value;
            setState(new_state);
          }}
        />
        <div>Product Operations</div>
        <input
          value={state.tracking.ProdOps}
          onChange={(e) => {
            let new_state = { ...state };
            new_state.tracking.ProdOps = e.target.value;
            setState(new_state);
          }}
        />
        <div>Order Operations</div>
        <input
          value={state.tracking.OrderOps}
          onChange={(e) => {
            let new_state = { ...state };
            new_state.tracking.OrderOps = e.target.value;
            setState(new_state);
          }}
        />
        <div>Task Operations</div>
        <input
          value={state.tracking.TaskOps}
          onChange={(e) => {
            let new_state = { ...state };
            new_state.tracking.TaskOps = e.target.value;
            setState(new_state);
          }}
        />

        <input
          placeholder="Cost"
          value={state.cost}
          onChange={(e) => {
            setState({ ...state, cost: e.target.value });
          }}
        />

        <select
          placeholder="Cost Per"
          value={state.costPer}
          onChange={(e) => {
            setState({ ...state, costPer: e.target.value });
          }}
        >
          <option value="--">select cost per</option>
          <option value="operation">Operation</option>
        </select>

        <input
          placeholder="Subscription Name"
          value={state.name}
          onChange={(e) => {
            setState({ ...state, name: e.target.value });
          }}
        />

        <input
          placeholder="Description"
          value={state.description}
          onChange={(e) => {
            setState({ ...state, description: e.target.value });
          }}
        />

        {isUpdate ? (
          <button
            onClick={() => {
              dispatch(updateSubscription(state._id, state));
              clearState();
              setIsUpdate(false);
            }}
          >
            Edit Subscription
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(createSubscription(state));
              clearState();
            }}
          >
            Add Subscription
          </button>
        )}
      </div>

      <div>View Subs </div>
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
        {subs.map((s) => (
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
                  dispatch(deleteSubscription(s._id));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Subscriptions;
