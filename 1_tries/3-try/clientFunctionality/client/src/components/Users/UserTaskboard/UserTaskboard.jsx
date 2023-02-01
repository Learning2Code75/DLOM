import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTasks } from "../../../redux/actions/tasks";

const status_options = {
  todo: ["done"],
  toBeApproved: ["approved"],
  approved: ["done"],
};

const UserTaskboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const user = useSelector((state) => state?.auth?.authData?.result);

  const [state, setState] = useState({
    operation_type: {
      name: "",
      link: "",
    },
    description: "",
    status:
      user?.userRole === "manager" || user?.userRole === "root"
        ? "todo"
        : "toBeApproved",
    responses: [],
    suggestions: [],
    task_assigned_to: [],
  });

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <div>
      <Link to="/users">Users</Link>

      <h1>User Taskboard</h1>

      <h3>Tasks CRUD</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div>
        <input
          placeholder="operation type name"
          value={state.operation_type.name}
          disabled={true}
        />
        <div>Operation type name</div>
        <select
          value={state.operation_type.link}
          onChange={(e) => {
            let new_state = { ...state };
            let n_l = e.target.value;
            new_state.operation_type.link = e.target.value;
            switch (n_l) {
              case "/order":
                new_state.operation_type.name = "Order";
                break;
              case "/orderlogs":
                new_state.operation_type.name = "Orderlogs";
                break;

              case "/client":
                new_state.operation_type.name = "Client";
                break;

              case "/client/clientsCRUD":
                new_state.operation_type.name = "Client Manage";
                break;

              case "/client/clientsCRM":
                new_state.operation_type.name = "Client CRM";
                break;

              case "/client/clientsPayments":
                new_state.operation_type.name = "Client Payment";
                break;

              case "/product":
                new_state.operation_type.name = "Product";
                break;

              case "/product/productsCRUD":
                new_state.operation_type.name = "Product Manage";
                break;

              case "/product/productsInventory":
                new_state.operation_type.name = "Product Inventory";
                break;

              case "/product/productsCatelog":
                new_state.operation_type.name = "Product Catelog";
                break;

              case "/product/inventoryLogs":
                new_state.operation_type.name = "Product Logs";
                break;

              default:
                new_state.operation_type.name = "";
            }

            setState(new_state);
          }}
        >
          <option value="--">Select Operation type</option>

          <option value="/order">Order</option>
          <option value="/orderlogs">Orderlogs</option>
          <option value="/client">Client</option>
          <option value="/client/clientsCRUD">Manage Clients</option>
          <option value="/client/clientsCRM">CRM</option>
          <option value="/client/clientsPayments">Client Payments</option>
          <option value="/product">Product</option>
          <option value="/product/productsCRUD">Manage Products</option>
          <option value="/product/productsInventory">Product Inventory</option>
          <option value="/product/productsCatelog">Product Catelog</option>
          <option value="/product/inventoryLogs">Inventory logs</option>
        </select>

        <input
          value={state.description}
          placeholder="Task description"
          onChange={(e) => {
            setState({ ...state, description: e.target.value });
          }}
        />

        <div>{state.status}</div>

        {state.status === "todo" && (
          <button onClick={(e) => setState({ ...state, status: "done" })}>
            todo {"-->"} done
          </button>
        )}

        {state.status === "toBeApproved" && (
          <button onClick={(e) => setState({ ...state, status: "approved" })}>
            to be approved {"-->"} approved
          </button>
        )}

        {state.status === "approved" && (
          <button onClick={(e) => setState({ ...state, status: "done" })}>
            approved {"-->"} done
          </button>
        )}

        {/* if not manager/root :add response */}
        {/* if manager/root: add suggestion */}
        {/* if manager/root : add users */}
      </div>

      <h3>Tasks</h3>
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
        {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
        {tasks.map((t) => (
          <div
            style={{
              border: "1px solid black",
              overflowY: "scroll",
            }}
          >
            <pre>{JSON.stringify(t, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTaskboard;
