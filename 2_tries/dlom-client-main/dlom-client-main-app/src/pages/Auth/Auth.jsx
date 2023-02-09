import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { signup, signin } from "../../redux/actions/Auth";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    // firstName: "",
    // lastName: "",
    email: "",
    password: "",
    // cpassword: "",
    // userRole: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData);

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <form className="loginForm" onSubmit={handleSubmit}>
          {/* {isSignup && (
            <>
              <Input
                name="firstName"
                placeholder="First Name"
                handleChange={handleChange}
                autoFocus={true}
                type="text"
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                handleChange={handleChange}
                autoFocus={false}
                type="text"
              />
            </>
          )} */}
          <h2>DLOM Login</h2>

          {/* <Input
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            autoFocus={false}
            type="email"
          />
          <Input
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            autoFocus={false}
            type="password"
          /> */}
          <div className="loginInputBox">
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              autoFocus={true}
              type="email"
              value={formData.email}
              required
            />
            <span>Email</span>
            <i></i>
          </div>

          <div className="loginInputBox">
            <input
              name="password"
              placeholder="Password"
              onChange={handleChange}
              autoFocus={false}
              type="password"
              value={formData.password}
              required
            />
            <span>Password</span>
            <i></i>
          </div>

          {/* {isSignup && (
            <>
              <Input
                name="cpassword"
                placeholder="Confirm Password"
                handleChange={handleChange}
                autoFocus={false}
                type="password"
              />
            </>
          )} */}
          {/* {isSignup && (
            <select name="userRole" onChange={handleChange}>
              <option>Select Role of User</option>
              <option value="root">Root</option>
              <option value="manager">Manager</option>
              <option value="salesperson">Salesperson</option>
              <option value="finance">Finance</option>
              <option value="warehouse">Warehouse</option>
            </select>
          )} */}

          <button className="loginSubmit" type="submit">
            {isSignup ? "SignUp" : "SignIn"}
          </button>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              setIsSignup(!isSignup);
            }}
          >
            {isSignup ? "Have Account?Login" : "Don't have Account?Signup"}
          </button> */}
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </form>
      </div>
      {/* <div className="loginBox">
        <div className="loginForm">
          <h2>DLOM Login</h2>
          <div className="loginInputBox">
            <input type="email" required="required" />
            <span>Email</span>
            <i></i>
          </div>

          <div className="loginInputBox">
            <input type="password" required="required" />
            <span>Password</span>
            <i></i>
          </div>

          <input className="loginSubmit" type="submit" value="login" />
        </div>
      </div> */}
    </div>
  );
};

export default Auth;
