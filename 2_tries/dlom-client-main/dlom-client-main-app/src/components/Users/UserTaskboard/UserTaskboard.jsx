import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createTask, getTasks, updateTask } from "../../../redux/actions/tasks";
import { createOp } from "../../../redux/actions/users";
import AddResponse from "./AddResponse";
import AddSuggestion from "./AddSuggestion";
import { TiArrowLeftThick } from "react-icons/ti";
import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { useContext } from "react";
import { ThemeContext } from "../../../App";
import { BsArrowBarRight } from "react-icons/bs";
import moment from "moment/moment";
import ChatDropdown from "./ChatDropdown";
import { FaArrowRight } from "react-icons/fa";

const status_options = {
  todo: ["done"],
  toBeApproved: ["approved"],
  approved: ["done"],
};

const UserTaskboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const tc = useContext(ThemeContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const tasks = useSelector((state) => state.tasks);
  const user = useSelector((state) => state?.auth?.authData?.result);
  const users = useSelector((state) => state?.users);
  const [openDialog, setOpenDialog] = useState(false);
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/users"
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
        <h2>User Taskboard</h2>
      </div>

      <h3>Tasks CRUD</h3>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          onClick={() => {
            dispatch(getTasks());
          }}
          className="openStylesButton1"
        >
          Fetch latest
        </div>
      </div>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

      <div className="dialogOpenContainer">
        <div className="openStylesButton1" onClick={() => setOpenDialog(true)}>
          Create Task
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
        <div className="css5Form">
          <div className="FlexBetween">
            <h2> Add Task</h2>

            <IconButton
              onClick={() => {
                clearState();
                setOpenDialog(false);
              }}
              style={{
                background: tc.theme === "dark" ? "lightgrey" : "transparent",
                padding: ".25rem",
              }}
            >
              <GrClose />
            </IconButton>
          </div>
          <input
            placeholder="operation type name"
            value={state.operation_type.name}
            disabled={true}
            className="formControl"
          />
          <div className="formLabel">Operation Type Name</div>
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
            className="btn1"
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
            <option value="/product/productsInventory">
              Product Inventory
            </option>
            <option value="/product/productsCatelog">Product Catelog</option>
            <option value="/product/inventoryLogs">Inventory logs</option>
            <option value="/">Other</option>
          </select>

          <div className="formLabel">Task Description</div>
          <input
            value={state.description}
            placeholder="Task description"
            onChange={(e) => {
              setState({ ...state, description: e.target.value });
            }}
            className="formControl"
          />

          <div className="formLabel">Status</div>
          <div className="formControl">{state.status}</div>

          {/* if not manager/root :add response */}
          {/* if manager/root: add suggestion */}
          {/* if manager/root : add users */}

          {user?.userRole === "manager" ||
            (user?.userRole === "root" && (
              <>
                <div className="formLabel">Assign task to users</div>
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
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        className="formControl"
                      >
                        {u.name}[{u.userRole}]
                        {/* <pre>{JSON.stringify(u, null, 2)}</pre> */}
                        <span
                          style={{
                            display: "flex",
                          }}
                        >
                          <div
                            className="btn1"
                            style={{
                              margin: "0",
                              padding: ".3em",
                              fontSize: ".8em",
                            }}
                            onClick={() => assignUser(u._id)}
                          >
                            Assign
                          </div>
                          <div
                            className="btn1"
                            style={{
                              margin: "0",
                              padding: ".3em",
                              fontSize: ".8em",
                              marginLeft: ".4em",
                            }}
                            onClick={() => removeUser(u._id)}
                          >
                            Unassign
                          </div>
                        </span>
                      </div>
                    ))}
                </div>
              </>
            ))}
          <div
            onClick={() => {
              dispatch(
                createOp({
                  dlom_client: { _id: user?.dlom_client },
                  operation_type: "task create",
                })
              );
              dispatch(createTask(state));
              setOpenDialog(false);
              clearState();
            }}
            className="btn2"
          >
            Create Task
          </div>
        </div>
      </Dialog>
      <h3>Tasks</h3>
      {(user?.userRole === "manager" || user?.userRole === "root") && (
        <div
          style={{
            margin: ".5rem",
            marginBottom: "5rem",
          }}
          className="css9BasicGrid"
        >
          {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
          {tasks.map((t) => (
            <div className="css1Card">
              <div className="css1ContentBx">
                <div className="css9BasicGrid1">
                  <div className="tag">Operation type</div>
                  <div className="info">
                    <Link
                      to={t.operation_type.link}
                      style={{
                        textDecoration: "none",
                        color: "cyan",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      {t.operation_type.name}
                      <BsArrowBarRight />
                    </Link>
                  </div>
                  <div className="tag">Description</div>
                  <div className="info">{t.description}</div>
                  <div className="tag">Status</div>
                  <div className="info">{t.status}</div>
                  <div className="tag">Created</div>
                  <div className="info">
                    {new Date(t.createdAt).toDateString() + " "} [
                    {new Date(t.createdAt).toTimeString().split(" ")[0]}]
                  </div>
                  <div className="tag">Assigned to</div>
                  <div className="info">
                    {t.task_assigned_to
                      .map((u) => `${u.name}[${u.userRole}]`)
                      .join(",")}
                  </div>

                  <ChatDropdown data={t?.suggestions} />
                  <ChatDropdown data={t?.responses} resp={true} />
                </div>
              </div>
              {/* <pre>{JSON.stringify(t, null, 2)}</pre> */}
              {t.status !== "done" && (
                <div>
                  <AddSuggestion user={user} task={t} />
                </div>
              )}
              <div>
                {t.status === "todo" && (
                  <div
                    onClick={() => {
                      dispatch(updateTask(t._id, { ...t, status: "done" }));
                    }}
                    className="btn1"
                    style={{
                      fontSize: ".8em",
                      padding: ".5em",
                    }}
                  >
                    todo{" "}
                    <FaArrowRight
                      style={{
                        margin: "0 .2rem",
                      }}
                    />{" "}
                    done
                  </div>
                )}

                {t.status === "toBeApproved" && (
                  <div
                    onClick={() => {
                      dispatch(updateTask(t._id, { ...t, status: "approved" }));
                    }}
                    className="btn1"
                    style={{
                      fontSize: ".8em",
                      padding: ".5em",
                    }}
                  >
                    to be approved{" "}
                    <FaArrowRight
                      style={{
                        margin: "0 .2rem",
                      }}
                    />{" "}
                    approved
                  </div>
                )}

                {t.status === "approved" && (
                  <div
                    onClick={() => {
                      dispatch(updateTask(t._id, { ...t, status: "done" }));
                    }}
                    className="btn1"
                    style={{
                      fontSize: ".8em",
                      padding: ".5em",
                    }}
                  >
                    approved{" "}
                    <FaArrowRight
                      style={{
                        margin: "0 .2rem",
                      }}
                    />{" "}
                    done
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {user?.userRole !== "manager" && user?.userRole !== "root" && (
        <div
          style={{
            margin: ".5rem",
            marginBottom: "5rem",
          }}
          className="css9BasicGrid"
        >
          {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
          {tasks
            .filter((t) => findUserInTask(t))
            .map((t) => (
              <div>
                <div className="css1Card">
                  <div className="css1ContentBx">
                    <div className="css9BasicGrid1">
                      <div className="tag">Operation type</div>
                      <div className="info">
                        <Link
                          to={t.operation_type.link}
                          style={{
                            textDecoration: "none",
                            color: "cyan",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          {t.operation_type.name}
                          <BsArrowBarRight />
                        </Link>
                      </div>
                      <div className="tag">Description</div>
                      <div className="info">{t.description}</div>
                      <div className="tag">Status</div>
                      <div className="info">{t.status}</div>
                      <div className="tag">Created</div>
                      <div className="info">
                        {new Date(t.createdAt).toDateString() + " "} [
                        {new Date(t.createdAt).toTimeString().split(" ")[0]}]
                      </div>
                      <div className="tag">Assigned to</div>
                      <div className="info">
                        {t.task_assigned_to
                          .map((u) => `${u.name}[${u.userRole}]`)
                          .join(",")}
                      </div>

                      <ChatDropdown data={t?.suggestions} />
                      <ChatDropdown data={t?.responses} resp={true} />
                    </div>
                  </div>
                  {/* <pre>{JSON.stringify(t, null, 2)}</pre> */}
                  {t.status !== "done" && (
                    <div>
                      <AddResponse task={t} user={user} />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserTaskboard;
