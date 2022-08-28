import React from "react";

const ClientInfo = ({ client }) => {
  const { id, name, email, phone } = client;
  return (
    <>
      <div>
        <h2>Client Information</h2>
        <h3>Client id:{id}</h3>
        <h4>Client name : {name}</h4>
        <h5>Client email: {email}</h5>
        <h5>Client phone:{phone}</h5>
      </div>
    </>
  );
};

export default ClientInfo;
