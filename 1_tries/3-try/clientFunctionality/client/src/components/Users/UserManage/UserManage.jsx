import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../../redux/actions/Auth";
import { getUsers, updateUser } from "../../../redux/actions/users";
import ViewUsers from "./ViewUsers";

const UserManage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.authData?.result);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    userRole: "",
  });
  const [currUser, setCurrUser] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      let new_state = { ...state };
      if (user.userRole !== "root") {
        delete new_state.password;
        delete new_state.cpassword;
      }

      dispatch(updateUser(state._id, new_state));
    } else {
      dispatch(signup(state));
    }

    setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
      userRole: "",
    });
    setIsUpdate(false);
    setCurrUser({});
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <Link to="/users">Users</Link>

      <h1>User Manage</h1>
      <pre>state:{JSON.stringify(state, null, 2)}</pre>
      <pre>currUser:{JSON.stringify(currUser, null, 2)}</pre>

      <form onSubmit={handleSubmit} autoComplete="nope">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <h3>Add User</h3>

          <div></div>

          <input
            name={"firstName"}
            onChange={handleChange}
            autoFocus={true}
            type={"text"}
            placeholder={"First Name"}
            value={state.firstName}
            autoComplete="nope"
          />
          <input
            name={"lastName"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Last Name"}
            value={state.lastName}
            autoComplete="nope"
          />
          <input
            name={"email"}
            onChange={handleChange}
            type={"email"}
            placeholder={"Email"}
            value={state.email}
            autoComplete="nope"
          />
          {(user?.userRole === "root" || !isUpdate) && (
            <div>
              <label htmlFor="password">
                {isUpdate ? "New Password" : "Password"}
              </label>
              <input
                name={"password"}
                onChange={handleChange}
                type={"password"}
                placeholder={isUpdate ? "New Password" : "Password"}
                value={state.password}
                autoComplete="nope"
              />
            </div>
          )}

          {(user?.userRole === "root" || !isUpdate) && (
            <input
              name={"cpassword"}
              onChange={handleChange}
              type={"password"}
              placeholder={"Confirm Password"}
              value={state.cpassword}
              autoComplete="nope"
            />
          )}

          <select
            name="userRole"
            onChange={handleChange}
            value={state.userRole}
          >
            <option>Select Role of User</option>
            <option value="root">Root</option>
            <option value="manager">Manager</option>
            <option value="salesperson">Salesperson</option>
            <option value="finance">Finance</option>
            <option value="warehouse">Warehouse</option>
          </select>

          <div>
            <button type="submit">
              {isUpdate ? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </form>

      <div>
        <h3>Users</h3>
        <ViewUsers
          setIsUpdate={setIsUpdate}
          setState={setState}
          currUser={currUser}
          setCurrUser={setCurrUser}
        />
      </div>
    </div>
  );
};

export default UserManage;
