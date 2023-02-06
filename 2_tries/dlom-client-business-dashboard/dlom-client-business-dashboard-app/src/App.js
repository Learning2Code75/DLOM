import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Subscription from "./components/Subscription/Subscription";
import DlomClient from "./components/DlomClient/DlomClient";
import Tracking from "./components/Tracking/Tracking";
import Billing from "./components/Billing/Billing";

function App() {
  return (
    <>
      <Router>
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Subscription */}
            <Route path="/subscription" element={<Subscription />} />

            {/* Dlom client */}
            <Route path="/dlomclient" element={<DlomClient />} />

            {/* Tracking */}
            <Route path="/tracking" element={<Tracking />} />

            {/* Billing */}
            <Route path="/billing" element={<Billing />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
