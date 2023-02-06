import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./checkout.scss";
import { AuthContext } from "../../context/AuthContext";

const Checkout = ({ closeCheckout }) => {
  const { user } = useContext(AuthContext);
  // const [shippingAddress, setShippingAddress] = useState(false);
  const [info, setInfo] = useState({
    customerId: user?._id || undefined,
    firstName: user?.firstName || undefined,
    lastName: user?.lastName || undefined,
    email: user?.email || undefined,
    street: user?.street || undefined,
    homeNumber: user?.homeNumber || undefined,
    city: user?.city || undefined,
    phone: user?.phone || undefined,
    deliveryZone: "A",
    paymentMethod: "cash",
    delivery: true,
    status: "pending",
  });

  const products = useSelector((state) => state.cart.products);

  const cartTotal = () => {
    let cartTotal = 0;
    products.forEach((item) => (cartTotal += item.quantity * item.price));
    return cartTotal.toFixed(2);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const totalPrice = cartTotal();
      const newOrder = {
        ...info,
        totalPrice,
        products,
      };
      console.log(newOrder);
      await axios.post("/orders", newOrder);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="checkout">
      <div className="checkoutContainer">
        <div className="checkoutTop">
          <div className="checkoutHeader">
            <div className="checkoutHeaderLeft">
              <h1>Podsumowanie</h1>
            </div>
            <div className="checkoutHeaderRight">
              <button
                className="closeButton"
                onClick={() => closeCheckout(false)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
        <div className="checkoutBottom">
          <div className="bottomLeft">
            <div className="checkoutForm">
              <form>
                <div className="formInput">
                  <label>Imię</label>
                  <input
                    type="text"
                    placeholder="Imię"
                    id="firstName"
                    defaultValue={user?.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>Nazwisko</label>
                  <input
                    type="text"
                    placeholder="Nazwisko"
                    id="lastName"
                    defaultValue={user?.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>NIP (opcjonalnie)</label>
                  <input
                    type="number"
                    placeholder="NIP"
                    id="nip"
                    onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Adres email"
                    id="email"
                    defaultValue={user?.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>Numer telefonu</label>
                  <input
                    type="number"
                    placeholder="Numer telefonu"
                    id="phone"
                    defaultValue={user?.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>Ulica</label>
                  <input
                    type="text"
                    placeholder="Ulica"
                    id="street"
                    defaultValue={user?.street}
                    onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>Numer domu</label>
                  <input
                    type="text"
                    placeholder="Numer domu"
                    id="homeNumber"
                    defaultValue={user?.homeNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>Miasto</label>
                  <input
                    type="text"
                    placeholder="Miasto"
                    id="city"
                    defaultValue={user?.city}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="formInput">
                      <label>Kod pocztowy</label>
                      <input
                        type="text"
                        placeholder="Kod pocztowy"
                        id="postalCode"
                        onChange={handleChange}
                      />
                    </div> */}
                <div className="formInput">
                  <label>Uwagi do zamówienia</label>
                  <textarea
                    placeholder="Uwagi do zamówienia"
                    onChange={handleChange}
                    id="comments"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
          <div className="bottomRight">
            <h1>Twoje zamówienie:</h1>
            <ul>
              {products?.map((cartItem) => (
                <li
                  className="item"
                  key={
                    cartItem.id +
                    cartItem.addedIngredients +
                    cartItem.excludedIngredients
                  }
                >
                  <div className="itemTitle">
                    <h1>{cartItem.quantity}x</h1>
                    <h2>
                      {cartItem.category === "pizza" &&
                        (cartItem.size === "large" ? "⌀40cm " : "⌀30cm ")}
                      {cartItem.name}
                    </h2>
                  </div>
                  <div className="itemDetails">
                    {cartItem.addedIngredients.length > 0 && (
                      <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                    )}
                    {cartItem.excludedIngredients.length > 0 && (
                      <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="totalPrice">Łączny koszt: {cartTotal()}zł</p>
            <div className="deliveryMethod">
              <p className="title">Wybierz metodę odbioru zamówienia:</p>
              <select id="delivery" className="select" onChange={handleChange}>
                <option value={true}>Dostawa</option>
                <option value={false}>Odbiór osobisty</option>
              </select>
            </div>
            {/* <div
              className="shippingAddress"
              onClick={() => setShippingAddress(!shippingAddress)}
            >
              <input
                type="checkbox"
                id="shippingAddress"
                name="shippingAddress"
                value="shippingAddress"
              />
              <label htmlFor="shippingAddress">Dostawa na inny adres?</label>
            </div>

            {shippingAddress && (
              <>
                <div className="formInput">
                  <label>Ulica</label>
                  <input type="text" placeholder="Ulica" id="street" onChange={handleChange} />
                </div>
                <div className="formInput">
                  <label>Numer domu</label>
                  <input type="text" placeholder="Numer domu" id="homeNumber" onChange={handleChange} />
                </div>
                <div className="formInput">
                  <label>Miasto</label>
                  <input type="text" placeholder="Miasto" id="city" onChange={handleChange} />
                </div>
               <div className="formInput">
                  <label>Kod pocztowy</label>
                  <input type="text" placeholder="Kod pocztowy" id="postalCode" />
                </div>
              </>
            )} */}
            <div className="paymentMethod">
              <p className="title">Wybierz metodę płatności:</p>
              <select
                id="paymentMethod"
                className="select"
                onChange={handleChange}
              >
                <option value="cash">Gotówka</option>
                <option value="terminal">Kartą przy odbiorze</option>
                <option value="online">Płatność online</option>
              </select>
            </div>
            <div className="checkoutButton">
              <button onClick={handleClick}>ZAMAWIAM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
