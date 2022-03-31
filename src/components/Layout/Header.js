import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import HeaderPhoneButton from "./HeaderPhoneButton";

import classes from "./Header.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = (props) => {
  return (
    <Fragment>
      <div className={classes.header}>
        <div className={classes.divClass}>
          <h1>Universo de Celulares</h1>
        </div>
        <nav className="navbar navbar-light">
          <ul className="navbar-nav">
            <li key={1} className="nav-item">
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : classes.linkClass
                }
                to="/sales"
              >
                Celulares
              </NavLink>
            </li>
            <li key={2}>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : classes.linkClass
                }
                to="/totals"
              >
                Totales
              </NavLink>
            </li>
          </ul>
        </nav>
        <HeaderPhoneButton onShow={props.onShowModal} />
      </div>
    </Fragment>
  );
};

export default Header;
