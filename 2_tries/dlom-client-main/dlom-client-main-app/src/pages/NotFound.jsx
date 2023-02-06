import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>404, Page Not Found</div>
      <Link to="/">Go Back</Link>
    </>
  );
};

export default NotFound;
