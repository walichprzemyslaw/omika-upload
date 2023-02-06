import "./order.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Order = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/orders/find/${id}`);
  console.log(data);

  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="orderWrapper">
          <h1>Zamówienie nr {data._id}</h1>
          <h1> {new Date(data.createdAt).toLocaleString()}</h1>
          <hr />
          <div className="orderItems">
            {data.products?.map((cartItem) => (
              <div
                className="orderItem"
                key={
                  cartItem.id +
                  cartItem.addedIngredients +
                  cartItem.excludedIngredients
                }
              >
                <div className="orderItemTitle">
                  <div className="orderITLeft">
                    <img src={cartItem.img} alt="" />
                  </div>
                  <div className="orderITCenter">
                    <h1>
                      {cartItem.category === "pizza" &&
                        (cartItem.size === "large" ? "⌀40cm " : "⌀30cm ")}
                      {cartItem.name}
                    </h1>
                    {cartItem.addedIngredients.length > 0 && (
                      <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                    )}
                    {cartItem.excludedIngredients.length > 0 && (
                      <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                    )}
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
                {data.firstName} {data.lastName}
              </span>
              <span>
                {data.street} {data.homeNumber}, {data.city}
              </span>
              <span>Numer telefonu: {data.phone}</span>
            </div>
            <div className="orderDetailsRight">
              <h2>Szczegóły:</h2>
              <span>Łącznie: {data.totalPrice}zł</span>
              <span>Sposób zapłaty: {data.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
