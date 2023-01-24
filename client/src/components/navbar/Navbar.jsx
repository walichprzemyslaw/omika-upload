import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/DarkmodeContext";
import Cart from "../cart/Cart";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);  

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
          <div className="item" onClick={(e)=>setOpenCart(!openCart)}>
            <ShoppingCartIcon className="icon" />
            <span>0</span>
          </div>
        </div>
      </div>
      {openCart && <Cart closeCart={setOpenCart}/>}
    </div>
  );
};

export default Navbar;
