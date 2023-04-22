import "./orderPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import OrderDetails from "../../components/orderDetails/OrderDetails";
import OrderItems from "../../components/orderItems/OrderItems";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [item, setItem] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/orders/find/${id}`);
      const json = await response.json();
      setItem(json);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="order">
      {item ? (
        <div className="orderContainer">
          {item.status === "pending" ? (
            <>
              <div className="top">
                <div className="info">
                  <h1>Zamówienie nr {item._id} czeka na potwierdzenie!</h1>
                  <p>{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <button className="closeButton" onClick={() => navigate("/")}>
                  &times;
                </button>
              </div>
              <h2>Poczekaj na zatwierdzenie zamówienia przez obsługę lokalu</h2>
            </>
          ) : (
            <>
              <div className="top">
                <div className="info">
                  <h1>Zamówienie nr {item._id} zostało złożone!</h1>
                  <p>{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <button className="closeButton" onClick={() => navigate("/")}>
                  &times;
                </button>
              </div>
              <div className="orderWrapper">
                {!item ? (
                  "ładowanie"
                ) : (
                  <OrderItems products={item.products} editable={false} />
                )}
                {!item ? "ładowanie" : <OrderDetails item={item} />}
              </div>
            </>
          )}
        </div>
      ) : (
        "ładowanie..."
      )}
    </div>
  );
};

export default OrderPage;
