import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./checkout.scss";
import { AuthContext } from "../../context/AuthContext";
import { resetCart } from "../../redux/cartReducer";

const Checkout = ({ closeCheckout }) => {
  const { user } = useContext(AuthContext);
  const [delivery, setDelivery] = useState(true);
  // const [deliveryTime, setDeliveryTime] = useState("jak najszybciej");
  // const [shippingAddress, setShippingAddress] = useState(false);
  const getTimeRange = (delivery, startTime) => {
    const start = new Date(startTime);
    const end = new Date();
    end.setHours(21, 0, 0);

    if (delivery === "false") {
      start.setMinutes(start.getMinutes() + 20);
    } else {
      start.setMinutes(start.getMinutes() + 50);
    }

    let timeRange = [];
    while (start <= end) {
      let x = start.getMinutes();
      let y = 0;
      while (x > y && x < 60) {
        start.setMinutes(y + 5);
        y = y + 5;
      }
      // start.setMinutes(start.getMinutes() + 5);

      timeRange.push(
        new Date(start).toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }) +
          " - " +
          new Date(
            start.setMinutes(start.getMinutes() + 10)
          ).toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
          })
      );
    }
    return timeRange;
  };
  let timeRange = getTimeRange(delivery, new Date());
  const [info, setInfo] = useState({
    customerId: user?._id || undefined,
    firstName: user?.firstName || undefined,
    lastName: user?.lastName || undefined,
    email: user?.email || undefined,
    street: user?.street || undefined,
    homeNumber: user?.homeNumber || undefined,
    city: user?.city || undefined,
    phone: user?.phone || undefined,
    deliveryTime: "jak najszybciej",
    paymentMethod: "cash",
    // delivery: true,
    status: "pending",
  });
  const [orderId, setOrderId] = useState();

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

  const handleDelivery = (e) => {
    setDelivery(e.target.value);
    timeRange = getTimeRange(e.target.value, new Date());
    setInfo((prev) => ({ ...prev, deliveryTime: timeRange[0] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const totalPrice = cartTotal();
      const newOrder = {
        ...info,
        totalPrice,
        products,
        delivery,
      };
      console.log(newOrder);
      const response = await axios.post("/orders", newOrder);
      console.log(response.data._id);
      navigate(`/order/${response.data._id}`);
      dispatch(resetCart());
    } catch (error) {
      console.log(error);
    }
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
                    cartItem.excludedIngredients +
                    cartItem.size +
                    cartItem.taste +
                    cartItem.crust
                  }
                >
                  <div className="itemTitle">
                    <h1>{cartItem.quantity}x</h1>
                    <h2>
                      {(cartItem.category === "pizza" ||
                        cartItem.category === "dodatki") &&
                        (cartItem.size === "xlarge"
                          ? "0,85L "
                          : cartItem.size === "large"
                          ? handleSwitchLarge(cartItem)
                          : handleSwitchMedium(cartItem))}
                      {cartItem.name}
                    </h2>
                  </div>
                  <div className="itemDetails">
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
                        {cartItem.firstHalf.excludedIngredients.length > 0 && (
                          <p>
                            Minus:
                            {cartItem.firstHalf.excludedIngredients.join(", ")}
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
                    {cartItem.taste.length > 0 && <p>Smak: {cartItem.taste}</p>}
                  </div>
                </li>
              ))}
            </ul>
            <p className="totalPrice">Łączny koszt: {cartTotal()}zł</p>
            <div className="deliveryMethod">
              <p className="title">Wybierz metodę odbioru zamówienia:</p>
              <select
                id="delivery"
                className="select"
                onChange={handleDelivery}
              >
                <option value={true}>Dostawa</option>
                <option value={false}>Odbiór osobisty</option>
              </select>
            </div>
            <div className="deliveryTime">
              <p className="title">Wybierz czas {delivery !== "false" ? "dostawy" : "odbioru"}:</p>
              <select
                id="deliveryTime"
                className="select"
                onChange={handleChange}
                value={info.deliveryTime}
              >
                {delivery !== "false" && (
                  <option value="jak najszybciej">Jak najszybciej</option>
                )}
                {timeRange.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
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
