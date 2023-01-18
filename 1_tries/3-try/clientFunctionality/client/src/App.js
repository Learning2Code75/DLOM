import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
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
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />

              <Route path="/orders/:id" element={<OrderI />} />

              <Route path="/client" element={<Client />} />
              <Route path="client/clientsCRUD" element={<ClientsCRUD />} />
              <Route path="client/clientsCRM" element={<ClientsCRM />} />
              <Route
                path="client/clientsPayments"
                element={<ClientsPayments />}
              />

              <Route path="/order" element={<Order />} />
              <Route path="/orderlogs" element={<OrderLogs />} />

              <Route path="/product" element={<Product />} />
              <Route path="/product/productsCRUD" element={<ProductsCRUD />} />
              <Route
                path="/product/productsInventory"
                element={<ProductsInventory />}
              />
              <Route
                path="/product/productsCatelog"
                element={<ProductsCatelog />}
              />
              <Route path="/product/inventoryLogs" element={<Logs />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
