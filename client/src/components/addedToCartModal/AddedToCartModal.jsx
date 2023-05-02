import React, { useState, useEffect } from "react";
import "./addedToCartModal.scss";

function AddedToCartModal({ openAdded, openModal, img }) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        openAdded(false);
        openModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    showModal && (
      <div className="addedToCartContainer">
        <div className="addedToCartInfo">
          <img className="cardImage" src={img} alt={"addedToCart"} />
          <h3>Dodano produkt do koszyka!</h3>
        </div>
      </div>
    )
  );
}

export default AddedToCartModal;
