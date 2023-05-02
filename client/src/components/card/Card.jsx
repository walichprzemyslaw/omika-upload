import "./card.scss";
import { useState } from "react";
import Modal from "../modal/Modal";

const Card = ({item}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="card">
      <div
        className="cardContainer"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <img
          className="cardImage"
          src={item.img}
          alt={item.name}
        />
        <div className="details">
          <p className="title">{item.name}</p>
          <p className="price">{item.price[0]}zł</p>
        </div>
      </div>
      {openModal && <Modal item={item} closeModal={setOpenModal} key={item._id} />}
    </div>
  );
};

export default Card;
