import React, { useState } from "react";
import Input from "./Input";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const handleSubmit = () => {};
  const handleChange = () => {};
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
            <Input
              name="cpassword"
              placeholder="Confirm Password"
              handleChange={handleChange}
              autoFocus={false}
              type="password"
            />
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
    </div>
  );
};

export default Auth;
