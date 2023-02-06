import React from "react";

const Input = ({ name, handleChange, autoFocus, type, placeholder }) => {
  return (
    <div>
      <input
        name={name}
        onChange={handleChange}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
