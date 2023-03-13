import "./order.scss";
import OrderItems from "../orderItems/OrderItems";
import OrderDetails from "../orderDetails/OrderDetails";

const Order = ({ item, closeOrder }) => {
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
          <OrderItems products={item.products} editable={false}/>
          <OrderDetails item={item} />
        </div>
      </div>
    </div>
  );
};

export default Order;
