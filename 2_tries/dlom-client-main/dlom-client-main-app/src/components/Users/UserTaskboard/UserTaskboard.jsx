import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createTask, getTasks, updateTask } from "../../../redux/actions/tasks";
import { createOp } from "../../../redux/actions/users";
import AddResponse from "./AddResponse";
import AddSuggestion from "./AddSuggestion";

const status_options = {
  todo: ["done"],
  toBeApproved: ["approved"],
  approved: ["done"],
};

const UserTaskboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const user = useSelector((state) => state?.auth?.authData?.result);
  const users = useSelector((state) => state?.users);
  const default_suggestion = [
    {
      user_data: { _id: user?._id },
      description: "task to be done",
      timestamp: new Date().toISOString(),
    },
  ];
  const default_response = [
    {
      user_data: { _id: user?._id },
      description: "task to be approved",
      timestamp: new Date().toISOString(),
    },
  ];
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
    responses:
      user?.userRole !== "manager" && user?.userRole !== "root"
        ? default_response
        : [],
    suggestions:
      user?.userRole === "manager" || user?.userRole === "root"
        ? default_suggestion
        : [],
    task_assigned_to: [],
  });

  const clearState = () => {
    setState({
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
      suggestions:
        user?.userRole === "manager" || user?.userRole === "root"
          ? default_suggestion
          : [],
      task_assigned_to: [],
    });
  };
  const [isUpdate, setIsUpdate] = useState(false);

  const assignUser = (id) => {
    let new_state = { ...state };
    let new_t_a_t = new_state.task_assigned_to;
    let is_duplicate = false;

    for (let i = 0; i < new_t_a_t.length; i++) {
      if (new_t_a_t[i]._id === id) {
        is_duplicate = true;
      }
    }

    if (!is_duplicate) {
      new_t_a_t.push({
        _id: id,
      });
    }

    new_state.task_assigned_to = new_t_a_t;
    setState(new_state);
  };

  const removeUser = (id) => {
    let new_state = { ...state };
    let new_t_a_t = new_state.task_assigned_to;

    new_t_a_t = new_t_a_t.filter((n) => n._id !== id);

    new_state.task_assigned_to = new_t_a_t;
    setState(new_state);
  };

  const findUser = (id) => {
    let new_state = { ...state };
    let new_t_a_t = new_state.task_assigned_to;
    let found = false;

    for (let i = 0; i < new_t_a_t.length; i++) {
      if (new_t_a_t[i]._id === id) {
        found = true;
        break;
      }
    }

    return found;
  };

  const findUserInTask = (t) => {
    console.log(t);
    for (let i = 0; i < t?.task_assigned_to?.length; i++) {
      if (t?.task_assigned_to[i]?._id === user?._id) {
        return true;
      }
    }
    if (t?.responses[0]?.user_data?._id === user?._id) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <div>
      <Link to="/users">Users</Link>

      <h1>User Taskboard</h1>

      <h3>Tasks CRUD</h3>
      <div>
        <button
          onClick={() => {
            dispatch(getTasks());
          }}
        >
          Fetch latest
        </button>
      </div>
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
                new_state.operation_type.name = "Other";
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
          <option value="/">Other</option>
        </select>

        <input
          value={state.description}
          placeholder="Task description"
          onChange={(e) => {
            setState({ ...state, description: e.target.value });
          }}
        />

        <div>{state.status}</div>

        {/* if not manager/root :add response */}
        {/* if manager/root: add suggestion */}
        {/* if manager/root : add users */}

        {user?.userRole === "manager" ||
          (user?.userRole === "root" && (
            <>
              <div>Assign task to users</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {users
                  ?.filter(
                    (u) => u.userRole !== "manager" && u.userRole !== "root"
                  )
                  .map((u) => (
                    <div
                      style={{
                        border: "1px solid lightgrey",
                        borderRadius: ".5rem",
                        padding: ".5rem",
                        background: findUser(u._id) ? "black" : "white",
                        color: findUser(u._id) ? "white" : "black",
                      }}
                    >
                      {u.name}[{u.userRole}]
                      {/* <pre>{JSON.stringify(u, null, 2)}</pre> */}
                      <span>
                        <button onClick={() => assignUser(u._id)}>
                          Assign
                        </button>
                        <button onClick={() => removeUser(u._id)}>
                          Unassign
                        </button>
                      </span>
                    </div>
                  ))}
              </div>
            </>
          ))}
        <button
          onClick={() => {
            dispatch(
              createOp({
                dlom_client: { _id: user?.dlom_client },
                operation_type: "task create",
              })
            );
            dispatch(createTask(state));
            clearState();
          }}
        >
          Create Task
        </button>
      </div>

      <h3>Tasks</h3>
      {(user?.userRole === "manager" || user?.userRole === "root") && (
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
              {t.status !== "done" && (
                <div>
                  <AddSuggestion user={user} task={t} />
                </div>
              )}
              <div>
                {t.status === "todo" && (
                  <button
                    onClick={() => {
                      dispatch(updateTask(t._id, { ...t, status: "done" }));
                    }}
                  >
                    todo {"-->"} done
                  </button>
                )}

                {t.status === "toBeApproved" && (
                  <button
                    onClick={() => {
                      dispatch(updateTask(t._id, { ...t, status: "approved" }));
                    }}
                  >
                    to be approved {"-->"} approved
                  </button>
                )}

                {t.status === "approved" && (
                  <button
                    onClick={() => {
                      dispatch(updateTask(t._id, { ...t, status: "done" }));
                    }}
                  >
                    approved {"-->"} done
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {user?.userRole !== "manager" && user?.userRole !== "root" && (
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
          {tasks
            .filter((t) => findUserInTask(t))
            .map((t) => (
              <div
                style={{
                  border: "1px solid black",
                  overflowY: "scroll",
                }}
              >
                <pre>{JSON.stringify(t, null, 2)}</pre>
                {t.status !== "done" && (
                  <div>
                    <AddResponse task={t} user={user} />
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserTaskboard;
