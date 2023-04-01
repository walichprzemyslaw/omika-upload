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
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Card = ({ order, showProducts, index }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openMethod, setOpenMethod] = useState(false);
  const [openReciver, setOpenReciver] = useState(false);
  const [info, setInfo] = useState(order);
  const [time, setTime] = useState(order.deliveryTime);
  console.log(time.slice(0, 2));
  console.log(time.slice(3, 5));

  const delivery = new Date();
  delivery.setHours(time.slice(0, 2));
  delivery.setMinutes(time.slice(3, 5));
  console.log(delivery);
  const now = new Date();
  console.log(now);
  const timeDiff = delivery.getTime() - now.getTime();
  const timeDiffMinutes = Math.round(timeDiff / (1000 * 60));
  console.log(`Time difference: ${timeDiffMinutes} minutes`);

  // const [status, setStatus] = useState(order.status);
  const { data, loading, error } = useFetch(`/employees`);
  // console.log(status);

  const handleClick = async (status) => {
    try {
      const newOrder = {
        ...info,
        status: status,
      };
      setInfo(newOrder);
      console.log(newOrder);
      await axios.put(`/orders/${order._id}`, newOrder);
      setOpenStatus(false);
      // navigate("/");
      // closeEditor(false);
      // closeModal(false);
      // dispatch(resetCart());
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (paymentMethod) => {
    try {
      const newOrder = {
        ...info,
        paymentMethod: paymentMethod,
      };
      setInfo(newOrder);
      console.log(newOrder);
      await axios.put(`/orders/${order._id}`, newOrder);
      setOpenMethod(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleted = async (paymentCompleted) => {
    try {
      const newOrder = {
        ...info,
        paymentCompleted: paymentCompleted,
      };
      setInfo(newOrder);
      console.log(newOrder);
      await axios.put(`/orders/${order._id}`, newOrder);
      setOpenMethod(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReciver = async (paymentReciver) => {
    try {
      const newOrder = {
        ...info,
        paymentReciver: paymentReciver._id,
      };
      setInfo(newOrder);
      console.log(newOrder);
      await axios.put(`/orders/${order._id}`, newOrder);
      setOpenReciver(false);
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
            {(order.status === "preparation" || order.status === "ready") &&
              timeDiffMinutes < 30 && <h2>ZOSTAŁO {timeDiffMinutes} MINUT!</h2>}
            {order._id}
            <h1>
              {order.firstName} {order.lastName}
            </h1>
          </div>
          <div className={order.status} onClick={()=>setOpenStatus(!openStatus)} ></div>
        </div>
      {openStatus &&  <div className="statusChange">
          <div
            className={
              order.status === "preparation" ? "status active" : "status"
            }
            onClick={() => handleClick("preparation")}
          >
            kuchnia
          </div>
          <div
            className={order.status === "ready" ? "status active" : "status"}
            onClick={() => handleClick("ready")}
          >
            dostawa
          </div>
          <div
            className={
              order.status === "delivered" ? "status active" : "status"
            }
            onClick={() => handleClick("delivered")}
          >
            dostarczone
          </div>
          <div
            className={
              order.status === "cancelled" ? "status active" : "status"
            }
            onClick={() => handleClick("cancelled")}
          >
            odrzucone
          </div>
        </div>}

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
              <PriceCheckIcon className="icon iconClick" onClick={()=>setOpenMethod(!openMethod)}/>
              {order.paymentMethod === "cash"
                ? "gotówka"
                : order.paymentMethod === "terminal"
                ? "terminal"
                : "online"}
              {order.paymentCompleted === true && (
                <CheckBoxIcon className="iconGreen" />
              )}
            </span>
            <span>
              <PersonIcon className="icon iconClick" onClick={()=>setOpenReciver(!openReciver)} />
              {order.paymentReciver && (
                <>
                  {data.map((employee) => {
                    return (
                      employee._id === order.paymentReciver && (
                        <span key={employee._id}>
                          {employee.firstName} {employee.lastName}
                        </span>
                      )
                    );
                  })}
                </>
              )}
            </span>
          </div>
        </div>
        {order.comments && (
          <span className="comments">
            <CommentIcon className="icon" />
            {order.comments}
          </span>
        )}
       {openMethod && <> <div className="statusChange">
          <div
            className={
              order.paymentMethod === "cash" ? "status active" : "status"
            }
            onClick={() => handlePayment("cash")}
          >
            gotówka
          </div>
          <div
            className={
              order.paymentMethod === "terminal" ? "status active" : "status"
            }
            onClick={() => handlePayment("terminal")}
          >
            karta
          </div>
          <div
            className={
              order.paymentMethod === "online" ? "status active" : "status"
            }
            onClick={() => handlePayment("online")}
          >
            online
          </div>
        </div>
        <div className="statusChange">
          <div
            className={
              order.paymentCompleted === true ? "status active" : "status"
            }
            onClick={() => handleCompleted(true)}
          >
            zapłacone
          </div>
          <div
            className={
              order.paymentCompleted === false ? "status active" : "status"
            }
            onClick={() => handleCompleted(false)}
          >
            do zapłaty
          </div>
        </div></>}
     {openReciver &&  <div className="statusChange">
          {data.map((item) => {
            return (
              <div
                onClick={() => handleReciver(item)}
                className="status"
                key={item}
              >
                {item.firstName}
              </div>
            );
          })}
        </div>}
      </div>
      {openModal && (
        <Modal order={order} closeModal={setOpenModal} key={order._id} />
      )}
    </div>
  );
};

export default Card;
