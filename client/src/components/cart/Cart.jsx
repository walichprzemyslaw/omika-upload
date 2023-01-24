import { useState } from "react";
import "./cart.scss";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Checkout from "../checkout/Checkout";

const Cart = ({ closeCart }) => {
  const [openCheckout, setOpenCheckout] = useState(false);

  //temporary data
  const cartItems = [
    {
      id: 1,
      name: "pepperoni",
      img: "https://www.seekpng.com/png/full/924-9241545_circle-pizza-clip-art.png",
    },
    {
      id: 2,
      name: "rimini",
      img: "https://www.seekpng.com/png/full/924-9241545_circle-pizza-clip-art.png",
    },
    {
      id: 3,
      name: "vesuvio",
      img: "https://www.seekpng.com/png/full/924-9241545_circle-pizza-clip-art.png",
    },
    {
      id: 4,
      name: "salami",
      img: "https://www.seekpng.com/png/full/924-9241545_circle-pizza-clip-art.png",
    },
  ];

  return (
    <div className="cart">
      <div className="cartBackdrop" onClick={() => closeCart(false)}></div>
      <div className="cartContainer">
        <div className="cartTop">
          <div className="cartHeader">
            <div className="cartHeaderLeft">
              <h1>Twój koszyk</h1>
              <DeleteForeverOutlinedIcon className="cartDelete" />
            </div>
            <div className="cartHeaderRight">
              <button className="closeButton" onClick={() => closeCart(false)}>
                &times;
              </button>
            </div>
          </div>
          <hr />
          <ul className="cartItems">
            {cartItems?.map((cartItem) => (
              <li className="cartItem" key={cartItem.id}>
                <div className="itemLeft">
                  <img src={cartItem.img} alt="" />
                  <div className="details">
                    <h1>{cartItem.name}</h1>
                    <p className="cartDetailsSize">Medium</p>
                    <div className="price">34.95zł</div>
                  </div>
                </div>
                <div className="itemRight">
                  <DeleteForeverOutlinedIcon className="cartDelete" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="cartBottom">
          <hr />
          <div className="total">
            <span>Łącznie do zapłaty:</span>
            <span>104.85zł</span>
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
