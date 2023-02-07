import React from "react";
import "./sidebar.scss";

// import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { dispatchMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          {/* <LocalPizzaIcon className="logoIcon" /> */}
          <span className="logo">OMIKA ADMIN</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">GŁÓWNE</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">ZARZĄDZAJ</p>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Zamówienia</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <FastfoodIcon className="icon" />
              <span>Produkty</span>
            </li>
          </Link>
          <Link to="/employees" style={{ textDecoration: "none" }}>
            <li>
              <BadgeIcon className="icon" />
              <span>Pracownicy</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Użytkownicy</span>
            </li>
          </Link>
          <p className="title">ZAPLECZE</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Raporty</span>
          </li>
          <li>
            <StoreIcon className="icon" />
            <span>Magazyn</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Strefy dostaw</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Ustawienia</span>
          </li>
          <p className="title">UŻYTKOWNIK</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={() => dispatch({ type: "LOGOUT" })}>Wyloguj</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatchMode({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatchMode({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
