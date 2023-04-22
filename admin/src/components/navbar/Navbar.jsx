import React from "react";
import "./navbar.scss";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { dispatchMode } = useContext(DarkModeContext);
  const { admin } = useContext(AuthContext);
  console.log(admin);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatchMode({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            {/* <img
              src={user.img}
              alt=""
              className="avatar"
            /> */}
            <div className="details">
              <span className="name">{admin.firstName} {admin.lastName}</span>
              {/* <span className="position">{user.isAdmin ? "Administrator" : "Pracownik"}</span> */}
              <span className="position">Administrator</span>
            </div>
          </div>
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
