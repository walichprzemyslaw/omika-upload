import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Modal from "../modal/Modal";
import "./card.scss";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import OrderItems from "../orderItems/OrderItems";
import CommentIcon from "@mui/icons-material/Comment";

const Card = ({ order, showProducts, index }) => {
  const [openModal, setOpenModal] = useState(false);
  const [info, setInfo] = useState(order);
  // const [status, setStatus] = useState(order.status);
  const { data, loading, error } = useFetch(`/employees`);
  // console.log(status);

  const handleClick = async (status) => {
    try {
      const newOrder = {
        ...info,
        status: status,
      };
      console.log(newOrder);
      await axios.put(`/orders/${order._id}`, newOrder);
      // navigate("/");
      // closeEditor(false);
      // closeModal(false);
      // dispatch(resetCart());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div
        className="cardContainer"
        // onClick={() => {
        //   setOpenModal(true);
        // }}
      >
        <div className="top">
          <div
            className="left"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {order._id}
            <h1>
              {order.firstName} {order.lastName}
            </h1>
          </div>
          <div className={order.status}></div>
        </div>

        {showProducts && (
          <div className="center">
            <OrderItems products={order.products} />
          </div>
        )}
        <div className="bottom">
          <div className="left">
            <span>
              <CreditCardIcon className="icon" />
              {order.totalPrice.toFixed(2)}zł
            </span>

            <span>
              <AccessTimeIcon className="icon" />
              {order.deliveryTime === "jak najszybciej"
                ? "SZYBKO"
                : order.deliveryTime}
            </span>

            <span>
              <DeliveryDiningIcon className="icon" />
              {order.delivery ? (
                <span>
                  {order.street} {order.homeNumber}, {order.city}
                </span>
              ) : (
                "Odbiór osobisty"
              )}
            </span>
          </div>
          <div className="right">
            <span>
              <LocalPhoneIcon className="icon" /> {order.phone}
            </span>
            <span>
              <PriceCheckIcon className="icon" />
              {order.paymentMethod === "cash"
                ? "gotówka"
                : order.paymentMethod === "terminal"
                ? "terminal"
                : "online"}
            </span>
            <span>
              {order.paymentReciver && (
                <>
                  {data.map((employee) => {
                    return (
                      employee._id === order.paymentReciver && (
                        <span key={employee._id}>
                          <PersonIcon className="icon" /> {employee.firstName}{" "}
                          {employee.lastName}
                        </span>
                      )
                    );
                  })}
                </>
              )}
            </span>
          </div>
        </div>
        {order.comments && <span className="comments">
              <CommentIcon className="icon" />
              {order.comments}
            </span>}
        <div className="statusChange">
          <div className="status" onClick={() => handleClick("pending")}>
            kuchnia
          </div>
          <div className="status" onClick={() => handleClick("active")}>
            dostawa
          </div>
          <div className="status" onClick={() => handleClick("passive")}>
            dostarczone
          </div>
        </div>
      </div>
      {openModal && (
        <Modal order={order} closeModal={setOpenModal} key={order._id} />
      )}
    </div>
  );
};

export default Card;
