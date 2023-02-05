import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [openPower, setOpenPower] = useState(false);

  const { user } = useContext(AuthContext);


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
          <Link to={`/settings/${user?._id}`} style={{ textDecoration: "none" }}>
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
                <PowerSettingsNewIcon className="icon" onClick={()=>setOpenPower(!openPower)} />
              </li>
            </div>
          </Link>
        </ul>
      </div>
      {openPower && <div className="power"><span>Wyloguj</span></div>}
    </div>
  );
};

export default Sidebar;
