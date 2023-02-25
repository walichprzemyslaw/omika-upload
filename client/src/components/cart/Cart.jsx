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

  const handleSwitchMedium = (e) => {
    switch (e.name) {
      case "nuggetsy":
        return "5 sztuk ";
      case "sosy":
        return "25g ";
      case "napoje":
        return "0,33L ";
      case "frytki":
        return "";
      default:
        return "⌀30cm ";
    }
  };

  const handleSwitchLarge = (e) => {
    switch (e.name) {
      case "nuggetsy":
        return "10 sztuk ";
      case "sosy":
        return "100g ";
      case "napoje":
        return "0,5L ";
      case "frytki":
        return "";
      default:
        return "⌀40cm ";
    }
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
              <li
                className="cartItem"
                key={
                  cartItem.id +
                  cartItem.addedIngredients +
                  cartItem.excludedIngredients +
                  cartItem.size +
                  cartItem.taste +
                  cartItem.crust
                }
              >
                <div className="itemLeft">
                  <img src={cartItem.img} alt="" />
                  <div className="details">
                    <h1>
                      {(cartItem.category === "pizza" ||
                        cartItem.category === "dodatki") &&
                        (cartItem.size === "xlarge"
                          ? "0,85L "
                          : cartItem.size === "large"
                          ? handleSwitchLarge(cartItem)
                          : handleSwitchMedium(cartItem))}
                      {cartItem.name}
                    </h1>
                    <div className="cartDetails">
                      {cartItem.crust.length > 0 && (
                        <p>Ciasto: {cartItem.crust}</p>
                      )}
                      {cartItem.firstHalf && (
                        <>
                          <h5>Pierwsza połowa: {cartItem.firstHalf.name}</h5>
                          {cartItem.firstHalf.addedIngredients.length > 0 && (
                            <p>
                              Dodatki:
                              {cartItem.firstHalf.addedIngredients.join(", ")}
                            </p>
                          )}
                          {cartItem.firstHalf.excludedIngredients.length >
                            0 && (
                            <p>
                              Minus:
                              {cartItem.firstHalf.excludedIngredients.join(
                                ", "
                              )}
                            </p>
                          )}
                        </>
                      )}
                      {cartItem.secondHalf && (
                        <>
                          <h5>Druga połowa: {cartItem.secondHalf.name}</h5>
                          {cartItem.secondHalf.addedIngredients2.length > 0 && (
                            <p>
                              Dodatki:
                              {cartItem.secondHalf.addedIngredients2.join(", ")}
                            </p>
                          )}
                          {cartItem.secondHalf.excludedIngredients2.length >
                            0 && (
                            <p>
                              Minus:
                              {cartItem.secondHalf.excludedIngredients2.join(
                                ", "
                              )}
                            </p>
                          )}
                        </>
                      )}
                      {cartItem.addedIngredients.length > 0 && (
                        <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                      )}
                      {cartItem.excludedIngredients.length > 0 && (
                        <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                      )}
                      {cartItem.taste.length > 0 && (
                        <p>Smak: {cartItem.taste}</p>
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
                          taste: cartItem.taste,
                          crust: cartItem.crust,
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
