import "./navbar.scss";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { DarkModeContext } from "../../context/DarkmodeContext";
import Cart from "../cart/Cart";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);  

  const products = useSelector((state) => state.cart.products);

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
            <span>{products.length}</span>
          </div>
        </div>
      </div>
      {openCart && <Cart closeCart={setOpenCart}/>}
    </div>
  );
};

export default Navbar;
