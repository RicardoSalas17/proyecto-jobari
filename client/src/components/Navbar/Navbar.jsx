import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        {CONSTS.CAPITALIZED_APP}
      </Link>

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link>
            <Link to={PATHS.NEWCUSTUMER} className="authLink">
              Nuevo cliente
            </Link>
            <Link to={PATHS.NEWMP} className="authLink">
              Nueva MP
            </Link>
            <Link to={PATHS.NEWPRODUCT} className="authLink">
              Nuevo Producto
            </Link>
            <Link to={PATHS.NEWPACKAGE} className="authLink">
              Nuevo Empaque
            </Link>
            <Link to={PATHS.NEWORDER} className="authLink">
              Nuevo Pedido
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
