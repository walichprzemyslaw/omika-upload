import "./order.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Order = ({item, closeOrder}) => {
  // const location = useLocation();
  // const id = location.pathname.split("/")[2];
  // const { data, loading, error } = useFetch(`/orders/find/${id}`);
  console.log(item);

  // pass the data to the component instead of fetching it!!!

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
    <div className="order">
      <div className="orderContainer">
      <div className="top">
            <div className="info">
              <h1>Zamówienie nr {item._id}</h1>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
            </div>
            <button className="closeButton" onClick={() => closeOrder(false)}>
              &times;
            </button>
          </div>
        <div className="orderWrapper">
          <div className="orderItems">
            {item.products.map((cartItem) => (
              <div
                className="orderItem"
                key={
                  cartItem.id +
                  cartItem.addedIngredients +
                  cartItem.excludedIngredients +
                  cartItem.size +
                  cartItem.taste
                }
              >
                <div className="orderItemTitle">
                  <div className="orderITLeft">
                    <img src={cartItem.img} alt="" />
                  </div>
                  <div className="orderITCenter">
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
                    {cartItem.addedIngredients.length > 0 && (
                      <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                    )}
                    {cartItem.excludedIngredients.length > 0 && (
                      <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                    )}
                    {cartItem.taste.length > 0 && <p>Smak: {cartItem.taste}</p>}
                    {cartItem.crust.length > 0 && <p>Ciasto: {cartItem.crust}</p>}
                  </div>
                </div>
                <div className="orderITRight">
                  <h1>Ilość: {cartItem.quantity}</h1>
                  <h2>{cartItem.price}zł</h2>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="orderDetails">
            <div className="orderDetailsLeft">
              <h2>Dane osobowe:</h2>
              <span>
                {item.firstName} {item.lastName}
              </span>
              <span>
                {item.street} {item.homeNumber}, {item.city}
              </span>
              <span>Numer telefonu: {item.phone}</span>
            </div>
            <div className="orderDetailsRight">
              <h2>Szczegóły:</h2>
              <span>Łącznie: {item.totalPrice}zł</span>
              <span>Sposób zapłaty: {item.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
