import logo from "./assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import decode from "jwt-decode";
const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    // history.push("/auth");
    navigate("/auth");

    setUser(null);
  };
  useEffect(() => {
    // dispatch({ type: "LOGOUT" });
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location]);
  return (
    <nav className="navbar">
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <a className="navbarBrand">
          <div className="logoContainer">
            <img
              src={logo}
              alt="logo"
              className="logo"
              height={150}
              width={150}
            />
            {/* <div>Clients Functionality</div> */}
          </div>
        </a>
        <div>
          {JSON.parse(localStorage.getItem("profile"))?.result.name}[
          {JSON.parse(localStorage.getItem("profile"))?.result.userRole}]
        </div>
        <div>{user && <button onClick={() => logout()}>Logout</button>}</div>
      </div>
    </nav>
  );
};

export default Header;
