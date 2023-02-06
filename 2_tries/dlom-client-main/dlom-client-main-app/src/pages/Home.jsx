import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddClientModal from "../components/AddClientModal";
import AddOrderModal from "../components/AddOrderModal";

import Clients from "../components/Clients";
import Dashboard from "../components/Dashboard/Dashboard";
import Orders from "../components/Orders";
import { getDlomCli } from "../redux/actions/users";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.authData?.result);

  useEffect(() => {
    dispatch(getDlomCli(user?.dlom_client));
  }, [dispatch]);
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
