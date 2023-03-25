import logo from "./assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import decode from "jwt-decode";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { GiHumanTarget } from "react-icons/gi";
import { RiBillLine } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { DiGhostSmall } from "react-icons/di";
import { SiGoogleanalytics } from "react-icons/si";
import {
  MdClose,
  MdDarkMode,
  MdDashboard,
  MdOutlineLightMode,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { useMediaQuery } from "@mui/material";
const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [active, setActive] = useState(0);
  const [gridNav, setGridNav] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    // history.push("/auth");
    navigate("/auth");
    localStorage.clear();
    setUser(null);
  };
  useEffect(() => {
    // dispatch({ type: "LOGOUT" });
    setUser(JSON.parse(localStorage.getItem("profile"))?.result);
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location]);
  useEffect(() => {
    let url = window.location.href;
    let txt = url.split("/")[url.split("/").length - 1];
    if (txt === "subscription") {
      setActive(3);
    } else if (txt === "dlomclient") {
      setActive(1);
    } else if (txt === "tracking") {
      setActive(4);
    } else if (txt === "billing") {
      setActive(2);
    } else if (txt === "analytics") {
      setActive(5);
    } else if (txt === "") {
      setActive(0);
    }
  }, [window.location.href]);
  return (
    <nav className="navbar">
      <div className="appbar">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              // padding: "0 1rem",
            }}
          >
            <div className="switch">
              {/* <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} /> */}
              <div
                className="btn1"
                style={{
                  margin: "0 0 0 .4em",
                  padding: ".4rem",
                }}
                onClick={toggleTheme}
              >
                {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
              </div>
              {/* <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label> */}
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        {!isSmallScreen ? (
          <ul className="sidebarNav">
            <li className="logo" onClick={() => setActive(0)}>
              <Link to="/" className="navLink">
                <span className="linkText">DLOMB</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-right-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z" />
                </svg>
              </Link>
            </li>

            <li
              className={`navItem ${active === 0 ? "active" : ""}`}
              onClick={() => setActive(0)}
            >
              <Link to="/" className="navLink">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-grid icon"
                  viewBox="0 0 16 16"
                  className="icon"
                >
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                </svg> */}
                <MdDashboard />
                <span className="linkText">Dashboard</span>
              </Link>
            </li>
            <li
              className={`navItem ${active === 3 ? "active" : ""}`}
              onClick={() => setActive(3)}
            >
              <Link to="/subscription" className="navLink">
                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-grid"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
              </svg> */}
                <MdProductionQuantityLimits />
                <span className="linkText">Subscription</span>
              </Link>
            </li>
            <li
              className={`navItem ${active === 1 ? "active" : ""}`}
              onClick={() => setActive(1)}
            >
              <Link to="/dlomclient" className="navLink">
                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-grid"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
              </svg> */}
                <GiHumanTarget />
                <span className="linkText">Clients</span>
              </Link>
            </li>
            <li
              className={`navItem ${active === 4 ? "active" : ""}`}
              onClick={() => setActive(4)}
            >
              <Link to="/tracking" className="navLink">
                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-grid"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
              </svg> */}
                <BsPeopleFill />
                <span className="linkText">Tracking</span>
              </Link>
            </li>
            <li
              className={`navItem ${active === 2 ? "active" : ""}`}
              onClick={() => setActive(2)}
            >
              <Link to="/billing" className="navLink">
                <RiBillLine />

                <span className="linkText">Billings</span>
              </Link>
            </li>
            <li
              className={`navItem ${active === 5 ? "active" : ""}`}
              onClick={() => setActive(5)}
            >
              <Link to="/analytics" className="navLink">
                <SiGoogleanalytics />

                <span className="linkText">Analytics</span>
              </Link>
            </li>
            <li className="navItem">
              <a
                href="https://github.com/Learning2Code75"
                target="__blank"
                className="navLink"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>

                <span className="linkText l2c">Learning2Code75</span>
              </a>
            </li>
          </ul>
        ) : (
          <ul className="smallSidebarNav">
            <li
              className={` ${active === 0 ? "active" : ""}`}
              onClick={() => setActive(0)}
            >
              <Link to="/">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-grid"
                  viewBox="0 0 16 16"
                  className="icon"
                >
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                </svg> */}

                <MdDashboard className="icon" />

                <span className="linkText">Dash</span>
              </Link>
            </li>
            <li
              className={`${active === 3 ? "active" : ""}`}
              onClick={() => setActive(3)}
            >
              <Link to="/subscription">
                <MdProductionQuantityLimits className="icon" />
                <span className="linkText">Subscription</span>
              </Link>
            </li>
            <li
              className={`${active === 1 ? "active" : ""}`}
              onClick={() => setActive(1)}
            >
              <Link to="/dlomclient">
                <GiHumanTarget className="icon" />
                <span className="linkText">Clients</span>
              </Link>
            </li>
            <li
              className={`${active === 4 ? "active" : ""}`}
              onClick={() => setActive(4)}
            >
              <Link to="/tracking">
                <BsPeopleFill className="icon" />
                <span className="linkText">Tracking</span>
              </Link>
            </li>
            {/* <li
              className={` ${active === 2 ? "active" : ""}`}
              onClick={() => setActive(2)}
            >
              <Link to="/billing">
                <RiBillLine className="icon" />

                <span className="linkText">Billings</span>
              </Link>
            </li> */}
            <li onClick={() => setGridNav(true)}>
              <a
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <DiGhostSmall className="icon" />
                <span className="linkText">All</span>
              </a>
            </li>
          </ul>
        )}

        {gridNav && (
          <div
            className={gridNav ? "nav__menu show-menu" : "nav__menu"}
            style={{
              background: theme === "light" && "#ebecf0",
            }}
          >
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                marginLeft: "1.4rem",
                paddingBottom: "1rem",
              }}
              className="nav__list grid"
            >
              <li
                className={` ${active === 0 ? "active" : ""}`}
                onClick={() => {
                  setActive(0);
                  setGridNav(false);
                }}
              >
                <Link to="/">
                  <MdDashboard className="icon" />

                  <span className="linkText">Dash</span>
                </Link>
              </li>
              <li
                className={`${active === 3 ? "active" : ""}`}
                onClick={() => {
                  setActive(3);
                  setGridNav(false);
                }}
              >
                <Link to="/subscription">
                  <MdProductionQuantityLimits className="icon" />
                  <span className="linkText">Subscription</span>
                </Link>
              </li>
              <li
                className={`${active === 1 ? "active" : ""}`}
                onClick={() => {
                  setActive(1);
                  setGridNav(false);
                }}
              >
                <Link to="/dlomclient">
                  <GiHumanTarget className="icon" />
                  <span className="linkText">Clients</span>
                </Link>
              </li>
              <li
                className={`${active === 4 ? "active" : ""}`}
                onClick={() => {
                  setActive(4);
                  setGridNav(false);
                }}
              >
                <Link to="/tracking">
                  <BsPeopleFill className="icon" />
                  <span className="linkText">Tracking</span>
                </Link>
              </li>
              <li
                className={` ${active === 2 ? "active" : ""}`}
                onClick={() => {
                  setActive(2);
                  setGridNav(false);
                }}
              >
                <Link to="/billing">
                  <RiBillLine className="icon" />

                  <span className="linkText">Billings</span>
                </Link>
              </li>
              <li
                className={` ${active === 5 ? "active" : ""}`}
                onClick={() => {
                  setActive(5);
                  setGridNav(false);
                }}
              >
                <Link to="/analytics">
                  <SiGoogleanalytics className="icon" />

                  <span className="linkText">Analytics</span>
                </Link>
              </li>

              <li
                className="nav__item "
                onClick={() => {
                  setGridNav(false);
                }}
              >
                <a
                  href="https://github.com/Learning2Code75"
                  target="__blank"
                  className="nav__link"
                  style={{
                    color: theme === "light" && "blue",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-github"
                    viewBox="0 0 16 16"
                    className="nav__icon"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  L2C75
                </a>
              </li>

              <li
                onClick={() => {
                  setGridNav(false);
                }}
              >
                <Link to="#">
                  <MdClose className="icon" />
                  <span className="linkText">Close</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
