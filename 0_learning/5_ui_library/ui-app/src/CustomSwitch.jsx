import React, { useContext } from "react";
import ReactSwitch from "react-switch";
import { ThemeContext } from "./App";
const CustomSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="switch">
      <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
      <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
    </div>
  );
};

export default CustomSwitch;
