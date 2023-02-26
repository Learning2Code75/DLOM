import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Subscription from "./components/Subscription/Subscription";
import DlomClient from "./components/DlomClient/DlomClient";
import Tracking from "./components/Tracking/Tracking";
import Billing from "./components/Billing/Billing";
import { createContext, useState } from "react";
import Analytics from "./components/Analytics/Analytics";
export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <div
            id={theme}
            style={{
              minHeight: "100vh",
            }}
          >
            <Header />

            <div className="mainContainer">
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

                {/* Analytics */}
                <Route path="/analytics" element={<Analytics />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
