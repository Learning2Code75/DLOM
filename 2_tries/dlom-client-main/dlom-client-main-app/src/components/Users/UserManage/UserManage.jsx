import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../../redux/actions/Auth";
import { createOp, getUsers, updateUser } from "../../../redux/actions/users";
import ViewUsers from "./ViewUsers";
import { TiArrowLeftThick } from "react-icons/ti";
import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { ThemeContext } from "../../../App";

const UserManage = () => {
  const theme = useTheme();
  const tc = useContext(ThemeContext);
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
  const [openDialog, setOpenDialog] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      let new_state = { ...state };
      if (user.userRole !== "root") {
        delete new_state.password;
        delete new_state.cpassword;
      }
      console.log(state);

      dispatch(updateUser(state._id, new_state));
    } else {
      dispatch(
        createOp({
          dlom_client: { _id: user?.dlom_client },
          operation_type: "user create",
        })
      );
      dispatch(signup(state));
    }
    clear();
    setOpenDialog(false);
  };
  const clear = () => {
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
        <h2>Manage Users</h2>
      </div>
      {/* <pre>state:{JSON.stringify(state, null, 2)}</pre> */}
      {/* <pre>currUser:{JSON.stringify(currUser, null, 2)}</pre> */}

      <div className="dialogOpenContainer">
        <div className="openStylesButton1" onClick={() => setOpenDialog(true)}>
          Create User
        </div>
      </div>

      <Dialog
        open={openDialog}
        fullWidth={true}
        fullScreen={fullScreen}
        // maxWidth={}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            clear();
            setOpenDialog(!openDialog);
          } else {
            clear();
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
        <form autoComplete="nope" className="css5Form">
          <div className="FlexBetween">
            <h3>{isUpdate ? "Edit" : "Add"} User</h3>

            <IconButton
              onClick={() => {
                clear();
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
          <div className="formLabel">First Name</div>

          <input
            name={"firstName"}
            onChange={handleChange}
            autoFocus={true}
            type={"text"}
            placeholder={"First Name"}
            value={state.firstName}
            autoComplete="nope"
            className="formControl"
          />
          <div className="formLabel">Last Name</div>

          <input
            name={"lastName"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Last Name"}
            value={state.lastName}
            autoComplete="nope"
            className="formControl"
          />
          <div className="formLabel">Email</div>

          <input
            name={"email"}
            onChange={handleChange}
            type={"email"}
            placeholder={"Email"}
            value={state.email}
            autoComplete="nope"
            className="formControl"
          />
          {(user?.userRole === "root" || !isUpdate) && (
            <>
              <div className="formLabel">
                {isUpdate ? "New Password" : "Password"}
              </div>

              <input
                name={"password"}
                onChange={handleChange}
                type={"password"}
                placeholder={isUpdate ? "New Password" : "Password"}
                value={state.password}
                autoComplete="nope"
                className="formControl"
              />
            </>
          )}

          {(user?.userRole === "root" || !isUpdate) && (
            <>
              <div className="formLabel">Confirm Password</div>
              <input
                name={"cpassword"}
                onChange={handleChange}
                type={"password"}
                placeholder={"Confirm Password"}
                value={state.cpassword}
                autoComplete="nope"
                className="formControl"
              />
            </>
          )}

          <div className="formLabel">User Role</div>

          <select
            name="userRole"
            onChange={handleChange}
            value={state.userRole}
            className="btn1"
          >
            <option>Select Role of User</option>
            <option value="root">Root</option>
            <option value="manager">Manager</option>
            <option value="salesperson">Salesperson</option>
            <option value="finance">Finance</option>
            <option value="warehouse">Warehouse</option>
          </select>

          <div onClick={handleSubmit} className="btn2">
            {isUpdate ? "Update User" : "Add User"}
          </div>
        </form>
      </Dialog>

      <div>
        <h3>Users</h3>
        <ViewUsers
          setIsUpdate={setIsUpdate}
          setState={setState}
          currUser={currUser}
          setCurrUser={setCurrUser}
          setOpenDialog={setOpenDialog}
        />
      </div>
    </div>
  );
};

export default UserManage;
