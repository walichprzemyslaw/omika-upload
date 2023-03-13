import "./orderPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import OrderDetails from "../../components/orderDetails/OrderDetails";
import OrderItems from "../../components/orderItems/OrderItems";

const OrderPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data: item, loading, error } = useFetch(`/orders/find/${id}`);
  const navigate = useNavigate();

  console.log(item);

  // pass the data to the component instead of fetching it!!!

  return (
    <div className="order">
      {item ? (
        <div className="orderContainer">
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
            {loading ? "ładowanie" : <OrderItems products={item.products} editable={false} />}
            <OrderDetails item={item}/>
          </div>
        </div>
      ) : (
        "ładowanie..."
      )}
    </div>
  );
};

export default OrderPage;
