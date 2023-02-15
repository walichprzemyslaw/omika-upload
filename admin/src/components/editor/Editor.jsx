import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./editor.scss";

const Editor = ({ order, closeEditor, closeModal }) => {
  const {
    data: employeeData,
    loading: employeeLoading,
    error: employeeError,
  } = useFetch(`/employees`);

  const [info, setInfo] = useState(order);
  console.log(info);

  const navigate = useNavigate();

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

  const handleMethod = (order) => {
    switch (order.paymentMethod) {
      case "cash":
        return "płatność gotówką";
      case "online":
        return "płatność online";
      case "terminal":
        return "płatność kartą";
    }
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        ...info,
      };
      console.log(newOrder);
      await axios.put(`/orders/${order._id}`, newOrder);
      closeEditor(false);
      closeModal(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="top">
          <div className="info">
            <h1>Zamówienie nr {order._id}</h1>
          </div>
          <button className="closeButton" onClick={() => closeEditor(false)}>
            &times;
          </button>
        </div>
        <div className="modalWrapper">
          <div className="modalItems">
            {order.products.map((cartItem) => (
              <div
                className="modalItem"
                key={
                  cartItem.id +
                  cartItem.addedIngredients +
                  cartItem.excludedIngredients +
                  cartItem.size +
                  cartItem.taste
                }
              >
                <div className="modalItemTitle">
                  <div className="modalITLeft">
                    <img src={cartItem.img} alt="" />
                  </div>
                  <div className="modalITCenter">
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
                    {cartItem.crust.length > 0 && (
                      <p>Ciasto: {cartItem.crust}</p>
                    )}
                    {cartItem.addedIngredients.length > 0 && (
                      <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                    )}
                    {cartItem.excludedIngredients.length > 0 && (
                      <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                    )}
                    {cartItem.taste.length > 0 && <p>Smak: {cartItem.taste}</p>}
                  </div>
                </div>
                <div className="modalITRight">
                  <h1>Ilość: {cartItem.quantity}</h1>
                  <h2>{cartItem.price}zł</h2>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="modalDetails">
            <div className="modalDetailsLeft">
              <form>
                <div className="formInput">
                  <label htmlFor="phone">Numer telefonu:</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    defaultValue={parseInt(order.phone)}
                    id="phone"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="customerId">ID klienta:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    defaultValue={order.customerId}
                    id="customerId"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="firstName">Imię:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    defaultValue={order.firstName}
                    id="firstName"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="lastName">Nazwisko:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    defaultValue={order.lastName}
                    id="lastName"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="street">Ulica:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    defaultValue={order.street}
                    id="street"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="homeNumber">Numer domu:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    defaultValue={order.homeNumber}
                    id="homeNumber"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="city">Miasto:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    defaultValue={order.city}
                    id="city"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="totalPrice">Łączna cena:</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    defaultValue={parseFloat(order.totalPrice).toFixed(2)}
                    id="totalPrice"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="comments">Uwagi:</label>
                  <textarea
                    placeholder="Uwagi do zamówienia"
                    onChange={handleChange}
                    defaultValue={order.comments}
                    id="comments"
                  ></textarea>
                </div>
                <div className="formInput">
                  <label htmlFor="paymentReciver">Pracownik</label>
                  <select id="paymentReciver" onChange={handleChange}>
                    <option value="wybierz pracownika">
                      Wybierz pracownika
                    </option>
                    {employeeData.map((employee) => (
                      <option
                        key={employee._id}
                        value={employee._id}
                        selected={
                          employee._id === order.paymentReciver ? true : false
                        }
                      >
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formInput">
                  <p className="title">Wybierz metodę odbioru zamówienia:</p>
                  <select
                    id="delivery"
                    className="select"
                    onChange={handleChange}
                  >
                    <option value={true} selected={order.delivery && true}>
                      Dostawa
                    </option>
                    <option value={false} selected={!order.delivery && true}>
                      Odbiór osobisty
                    </option>
                  </select>
                </div>
                <div className="formInput">
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
                  <button onClick={handleClick}>Wyślij</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
