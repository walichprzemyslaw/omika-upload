import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Sidebar = () => {
  const [openPower, setOpenPower] = useState(false);

  const navigate = useNavigate();

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleLogout = async (e) =>{
    e.preventDefault();
    if (user){
      const res = await axios.put("/auth/logout");
      if (res.data) {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        setOpenPower(false);
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Something went wrong" },
        });
      }
    }else{
      navigate("/login");
    }
  }

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
            <div className="item" onClick={()=>setOpenPower(!openPower)}>
              <li>
                <PowerSettingsNewIcon className="icon" />
              </li>
            </div>
        </ul>
      </div>
      {openPower && <div className="power"><span onClick={handleLogout}>{user ? "Wyloguj" : "Zaloguj"}</span></div>}
    </div>
  );
};

export default Sidebar;
