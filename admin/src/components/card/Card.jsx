import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Modal from "../modal/Modal";
import "./card.scss";

const Card = ({ order, index }) => {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`/employees`);

  return (
    <div className="card">
      <div
        className="cardContainer"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <div className="details">
          <p className="index">
            Zamówienie nr {index + 1} |{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
          <p className="phone">{order.phone}</p>
          {/* <p className="date">
            {new Date(order.createdAt).toLocaleTimeString()}
          </p> */}
          <hr />
          <p className="title">
            {order.firstName} {order.lastName}
          </p>
          <p className="address">
            {order.delivery ? (
              <span>
                {order.street} {order.homeNumber}, {order.city}
              </span>
            ) : (
              "Odbiór osobisty"
            )}
          </p>
          <hr />

          {order.paymentReciver && (
            <>
              {data.map((employee) => {
                return (
                  employee._id === order.paymentReciver && (
                    <p key={employee._id}>
                      Pracownik: {employee.firstName} {employee.lastName}
                    </p>
                  )
                );
              })}
            </>
          )}
          <p className="method">
            {order.paymentMethod === "cash"
              ? "gotówka"
              : order.paymentMethod === "terminal"
              ? "terminal"
              : "online"}
          </p>

          {/* <hr />
          <p className="price">
            Łącznie: {order.totalPrice}zł | {order.paymentMethod}
          </p> */}
        </div>
      </div>
      {openModal && (
        <Modal order={order} closeModal={setOpenModal} key={order._id} />
      )}
    </div>
  );
};

export default Card;
