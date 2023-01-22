import { useState } from "react";
import Modal from "../modal/Modal";
import "./card.scss";

const Card = () => {
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
          src="https://www.seekpng.com/png/full/924-9241545_circle-pizza-clip-art.png"
          alt="pizza"
        />
        <div className="details">
          <p className="title">Pepperoni</p>
          <p className="price">35.95zł</p>
        </div>
      </div>
      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  );
};

export default Card;
