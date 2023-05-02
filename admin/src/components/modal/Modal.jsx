import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./modal.scss";
import axios from "axios";
import Edit from "../edit/Edit";
import { useDispatch } from "react-redux";
import { addToCart, resetCart } from "../../redux/cartReducer";
import OrderItems from "../orderItems/OrderItems";
import OrderDetails from "../orderDetails/OrderDetails";



const Modal = ({ order, closeModal }) => {
  const [openEditor, setOpenEditor] = useState(false);
  const { data, loading, error } = useFetch(
    `/employees/find/${order.paymentReciver}`
  );
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL, withCredentials: true})

 
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/orders/${id}`);
      closeModal(false);
    } catch (err) {
      error.status(err.status).message(err.message);
      console.log(err);
    }
  };

  return (<>
    <div className="modal">
      <div className="modalContainer">
        <div className="top">
          <div className="info">
            <h1>Zamówienie {order._id}</h1>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <button className="closeButton" onClick={() => closeModal(false)}>
            &times;
          </button>
        </div>
        <div className="modalWrapper">
          <OrderItems products={order.products} />
          <div className="priceDetails">
          {order.tipAmount > 0 && <p>Napiwek: {order.tipAmount.toFixed(2)}zł</p>}
          {order.deliveryCost > 0 && <p>Koszt dostawy: {order.deliveryCost.toFixed(2)}zł</p>}</div>
          <OrderDetails item={order} />
        </div>
        <div className="editButton">
          <button
            className="editOrderButton"
            onClick={() => {
              dispatch(resetCart()); 
              setOpenEditor(true);
              order.products.map((product) => dispatch(addToCart({id:product._id, ...product})));
              // closeModal(false);
            }}
          >
            EDYTUJ
          </button>
          <button
            className="editOrderButton"
            onClick={() => handleDelete(order._id)}
          >
            USUŃ
          </button>
        </div>
      </div>
      {/* {openEditor && (
        <Editor
          order={order}
          closeEditor={setOpenEditor}
          closeModal={closeModal}
          key={order._id}
        />
      )} */}
      
    </div>
    {openEditor && (
      <Edit
        order={order}
        closeEditor={setOpenEditor}
        closeModal={closeModal}
        key={order._id}
      />
    )}</>
  );
};

export default Modal;
