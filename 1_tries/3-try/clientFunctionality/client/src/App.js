import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import OrderI from "./pages/Order";

import Order from "./components/Order/Order";
import Client from "./components/Client/Client";
import ClientsCRUD from "./components/Client/CRUD/CRUD";
import ClientsCRM from "./components/Client/CRM/CRM";
import ClientsPayments from "./components/Client/Payments/Payments";

import ProductsCRUD from "./components/Product/CRUD/CRUD";
import ProductsInventory from "./components/Product/Inventory/Inventory";
import ProductsCatelog from "./components/Product/Catelog/Catelog";

import Product from "./components/Product/Product";
import Auth from "./pages/Auth/Auth";
import Logs from "./components/Product/Logs/Logs";
import OrderLogs from "./components/Order/OrderLogs";
import Users from "./components/Users/Users";
import UserManage from "./components/Users/UserManage/UserManage";
import UserTaskboard from "./components/Users/UserTaskboard/UserTaskboard";
import { useSelector } from "react-redux";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        orders: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// const client = new ApolloClient({
//   uri: "http://localhost:5001/graphql",
//   cache,
// });

const dlomClient = new ApolloClient({
  uri: "http://localhost:5002/graphql",
  cache,
});

// const dlomClient = new ApolloClient({
//   uri: "http://localhost:8000/graphql/graph",
//   cache,
// });

function App() {
  const user = useSelector((state) => state?.auth?.authData?.result);
  return (
    <>
      <ApolloProvider
        // client={client}
        client={dlomClient}
      >
        <Router>
          <Header />

          <div className="container">
            <Routes>
              <Route path="/" element={user?._id ? <Home /> : <Auth />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/users" element={user?._id ? <Users /> : <Auth />} />
              <Route
                path="users/userManage"
                element={user?._id ? <UserManage /> : <Auth />}
              />
              <Route
                path="users/userTaskboard"
                element={user?._id ? <UserTaskboard /> : <Auth />}
              />

              {/* <Route path="/orders/:id" element={<OrderI />} /> */}

              <Route
                path="/client"
                element={user?._id ? <Client /> : <Auth />}
              />
              <Route
                path="client/clientsCRUD"
                element={user?._id ? <ClientsCRUD /> : <Auth />}
              />
              <Route
                path="client/clientsCRM"
                element={user?._id ? <ClientsCRM /> : <Auth />}
              />
              <Route
                path="client/clientsPayments"
                element={user?._id ? <ClientsPayments /> : <Auth />}
              />

              <Route path="/order" element={user?._id ? <Order /> : <Auth />} />
              <Route
                path="/orderlogs"
                element={user?._id ? <OrderLogs /> : <Auth />}
              />

              <Route
                path="/product"
                element={user?._id ? <Product /> : <Auth />}
              />
              <Route
                path="/product/productsCRUD"
                element={user?._id ? <ProductsCRUD /> : <Auth />}
              />
              <Route
                path="/product/productsInventory"
                element={user?._id ? <ProductsInventory /> : <Auth />}
              />
              <Route
                path="/product/productsCatelog"
                element={user?._id ? <ProductsCatelog /> : <Auth />}
              />
              <Route
                path="/product/inventoryLogs"
                element={user?._id ? <Logs /> : <Auth />}
              />

              <Route path="*" element={user?._id ? <NotFound /> : <Auth />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
