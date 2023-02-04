import { useState } from "react";
import "./cart.scss";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Checkout from "../checkout/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";

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
          <ul className="cartItems">
            {products?.map((cartItem) => (
              <li className="cartItem" key={cartItem.id+cartItem.addedIngredients+cartItem.excludedIngredients}>
                <div className="itemLeft">
                  <img src={cartItem.img} alt="" />
                  <div className="details">
                    <h1>
                      {cartItem.category === "pizza" &&
                        (cartItem.size === "large" ? "⌀40cm " : "⌀30cm ")}
                      {cartItem.name}
                    </h1>
                    <div className="cartDetails">
                      {cartItem.addedIngredients.length > 0 && (
                        <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                      )}
                      {cartItem.excludedIngredients.length > 0 && (
                        <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                      )}
                    </div>
                    <div className="price">
                      {cartItem.quantity}x {cartItem.price.toFixed(2)}zł
                    </div>
                  </div>
                </div>
                <div className="itemRight">
                  <DeleteForeverOutlinedIcon
                    className="cartDelete"
                    onClick={() =>
                      dispatch(
                        removeItem({
                          id: cartItem.id,
                          addedIngredients: cartItem.addedIngredients,
                          excludedIngredients: cartItem.excludedIngredients,
                          size: cartItem.size,
                        })
                      )
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
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
