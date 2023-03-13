import "./cart.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/cartReducer";
import Checkout from "../checkout/Checkout";
import OrderItems from "../orderItems/OrderItems";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Cart = ({ closeCart }) => {
  const [openCheckout, setOpenCheckout] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const cartTotal = () => {
    let cartTotal = 0;
    products.forEach((item) => (cartTotal += item.quantity * item.price));
    return cartTotal.toFixed(2);
  };

  const dispatch = useDispatch();

  return (
    <div className="cart">
      <div className="cartBackdrop" onClick={() => closeCart(false)}></div>
      <div className="cartContainer">
        <div className="cartTop">
          <div className="cartHeader">
            <div className="cartHeaderLeft">
              <h1>Twój koszyk</h1>
              <DeleteForeverOutlinedIcon
                className="cartDelete"
                onClick={() => dispatch(resetCart())}
              />
            </div>
            <div className="cartHeaderRight">
              <button className="closeButton" onClick={() => closeCart(false)}>
                &times;
              </button>
            </div>
          </div>
          <hr />
          <OrderItems products={products} editable={true}/>
        </div>
        <div className="cartBottom">
          <hr />
          <div className="total">
            <span>Łącznie do zapłaty:</span>
            <span>{cartTotal()}zł</span>
          </div>
          <div className="button">
            <button
              onClick={(e) => {
                setOpenCheckout(true);
              }}
            >
              POTWIERDŹ ZAMÓWIENIE
            </button>
          </div>
        </div>
      </div>
      {openCheckout && <Checkout closeCheckout={setOpenCheckout} />}
    </div>
  );
};

export default Cart;
