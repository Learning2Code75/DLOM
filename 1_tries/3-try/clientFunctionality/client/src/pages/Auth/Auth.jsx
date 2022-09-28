import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { signup, signin } from "../../redux/actions/Auth";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    userRole: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

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
    <div>
      <h1>Auth</h1>
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {isSignup && (
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
          )}
          <Input
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
          />
          {isSignup && (
            <>
              <Input
                name="cpassword"
                placeholder="Confirm Password"
                handleChange={handleChange}
                autoFocus={false}
                type="password"
              />
            </>
          )}
          {isSignup && (
            <select name="userRole" onChange={handleChange}>
              <option>Select Role of User</option>
              <option value="root">Root</option>
              <option value="manager">Manager</option>
              <option value="salesperson">Salesperson</option>
              <option value="finance">Finance</option>
              <option value="warehouse">Warehouse</option>
            </select>
          )}
        </div>
        <div>
          <button type="submit">{isSignup ? "SignUp" : "SignIn"}</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSignup(!isSignup);
            }}
          >
            {isSignup ? "Have Account?Login" : "Don't have Account?Signup"}
          </button>
        </div>
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default Auth;
