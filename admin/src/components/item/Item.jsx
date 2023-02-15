import "./item.scss";
import ItemModal from "../itemModal/ItemModal";
import { useState } from "react";

const Item = ({ product }) => {
  const [openItemModal, setOpenItemModal] = useState(false);

  return (
    <div className="itemCard">
      <div
        className="itemContainer"
        onClick={() => {
          setOpenItemModal(true);
        }}
      >
        <img className="itemImage" src={product.img} alt={product.name} />
        <div className="details">
          <p className="title">{product.name}</p>
        </div>
      </div>
      {openItemModal && (
        <ItemModal
          item={product}
          closeItemModal={setOpenItemModal}
          key={product._id}
        />
      )}
    </div>
  );
};
export default Item;
