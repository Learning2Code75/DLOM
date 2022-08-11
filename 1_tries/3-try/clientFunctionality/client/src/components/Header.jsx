import logo from "./assets/logo.png";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbarBrand">
          <div className="logoContainer">
            <img
              src={logo}
              alt="logo"
              className="logo"
              height={150}
              width={150}
            />
            <div>Clients Functionality</div>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
