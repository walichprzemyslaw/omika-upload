import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkmodeContext";

const Navbar = () => {
  const { dispatchMode } = useContext(DarkModeContext);
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
            <ShoppingCartIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
