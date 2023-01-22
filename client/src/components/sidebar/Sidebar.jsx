import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar"> 
      <div className="top">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="item">
              <li>
                <HomeIcon className="icon" />
              </li>
              <p className="title">HOME</p>
            </div>
          </Link>
          <Link to="/menu" style={{ textDecoration: "none" }}>
            <div className="item">
              <li>
                <FastfoodIcon className="icon" />
              </li>
              <p className="title">MENU</p>
            </div>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="item">
              <li>
                <LocalPhoneIcon className="icon" />
              </li>
              <p className="title">ZADZWOŃ</p>
            </div>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <ul>
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <div className="item">
              <li>
                <SettingsIcon className="icon" />
              </li>
              <p className="title">KONTO</p>
            </div>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="item">
              <li>
                <PowerSettingsNewIcon className="icon" />
              </li>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
