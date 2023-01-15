import React from "react";
import AddClientModal from "../components/AddClientModal";
import AddOrderModal from "../components/AddOrderModal";

import Clients from "../components/Clients";
import Dashboard from "../components/Dashboard/Dashboard";
import Orders from "../components/Orders";

const Home = () => {
  return (
    <>
      <Dashboard />

      {/* <AddClientModal />
      <AddOrderModal />
      <Orders />
      <Clients /> */}
    </>
  );
};

export default Home;
