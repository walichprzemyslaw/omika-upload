import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./modal.scss";
import axios from "axios";
import Edit from "../edit/Edit";
import { useDispatch } from "react-redux";
import { addToCart, resetCart } from "../../redux/cartReducer";

const Modal = ({ order, closeModal }) => {
  const [openEditor, setOpenEditor] = useState(false);
  const { data, loading, error } = useFetch(
    `/employees/find/${order.paymentReciver}`
  );
  console.log(data);
  console.log(order.products);
  order.products.map((product) => console.log(product));


  const dispatch = useDispatch();

  const handleSwitchMedium = (e) => {
    switch (e.name) {
      case "nuggetsy":
        return "5 sztuk ";
      case "sosy":
        return "25g ";
      case "napoje":
        return "0,33L ";
      case "frytki":
        return "";
      default:
        return "⌀30cm ";
    }
  };

  const handleSwitchLarge = (e) => {
    switch (e.name) {
      case "nuggetsy":
        return "10 sztuk ";
      case "sosy":
        return "100g ";
      case "napoje":
        return "0,5L ";
      case "frytki":
        return "";
      default:
        return "⌀40cm ";
    }
  };

  const handleMethod = (order) => {
    switch (order.paymentMethod) {
      case "cash":
        return "płatność gotówką";
      case "online":
        return "płatność online";
      case "terminal":
        return "płatność kartą";
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/orders/${id}`);
      closeModal(false);
    } catch (err) {
      error.status(err.status).message(err.message);
      console.log(err);
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="top">
          <div className="info">
            <h1>Zamówienie nr {order._id}</h1>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <button className="closeButton" onClick={() => closeModal(false)}>
            &times;
          </button>
        </div>
        <div className="modalWrapper">
          <div className="modalItems">
            {order.products.map((cartItem) => (
              <div
                className="modalItem"
                key={
                  cartItem.id +
                  cartItem.addedIngredients +
                  cartItem.excludedIngredients +
                  cartItem.size +
                  cartItem.taste
                }
              >
                <div className="modalItemTitle">
                  <div className="modalITLeft">
                    <img src={cartItem.img} alt="" />
                  </div>
                  <div className="modalITCenter">
                    <h1>
                      {(cartItem.category === "pizza" ||
                        cartItem.category === "dodatki") &&
                        (cartItem.size === "xlarge"
                          ? "0,85L "
                          : cartItem.size === "large"
                          ? handleSwitchLarge(cartItem)
                          : handleSwitchMedium(cartItem))}
                      {cartItem.name}
                    </h1>
                    {cartItem.crust.length > 0 && (
                      <p>Ciasto: {cartItem.crust}</p>
                    )}
                    {cartItem.firstHalf.name && (
                      <>
                        <h5>Pierwsza połowa: {cartItem.firstHalf.name}</h5>
                        {cartItem.firstHalf.addedIngredients.length > 0 && (
                          <p>
                            Dodatki:
                            {cartItem.firstHalf.addedIngredients.join(", ")}
                          </p>
                        )}
                        {cartItem.firstHalf.excludedIngredients.length > 0 && (
                          <p>
                            Minus:
                            {cartItem.firstHalf.excludedIngredients.join(", ")}
                          </p>
                        )}
                      </>
                    )}
                    {cartItem.secondHalf.name && (
                      <>
                        <h5>Druga połowa: {cartItem.secondHalf.name}</h5>
                        {cartItem.secondHalf.addedIngredients2.length > 0 && (
                          <p>
                            Dodatki:
                            {cartItem.secondHalf.addedIngredients2.join(", ")}
                          </p>
                        )}
                        {cartItem.secondHalf.excludedIngredients2.length >
                          0 && (
                          <p>
                            Minus:
                            {cartItem.secondHalf.excludedIngredients2.join(
                              ", "
                            )}
                          </p>
                        )}
                      </>
                    )}
                    {cartItem.addedIngredients.length > 0 && (
                      <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                    )}
                    {cartItem.excludedIngredients.length > 0 && (
                      <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                    )}
                    {cartItem.taste.length > 0 && <p>Smak: {cartItem.taste}</p>}
                  </div>
                </div>
                <div className="modalITRight">
                  <h1>Ilość: {cartItem.quantity}</h1>
                  <h2>{cartItem.price}zł</h2>
                </div>
              </div>
            ))}
          </div>
          <hr />
          {order.comments && (
            <div className="comments">
              <h1>Uwagi do zamówienia:</h1>
              <span>{order.comments}</span>
              <hr />
            </div>
          )}
          <div className="modalDetails">
            <div className="modalDetailsLeft">
              <h2>Dane osobowe:</h2>
              <span>
                {order.firstName} {order.lastName}
              </span>
              <p>
                {order.delivery ? (
                  <span>
                    {order.street} {order.homeNumber}, {order.city}
                  </span>
                ) : (
                  "Odbiór osobisty"
                )}
              </p>
              <span>Numer telefonu: {order.phone}</span>
            </div>
            <div className="modalDetailsRight">
              <h2>Szczegóły:</h2>
              <span>Łącznie: {order.totalPrice.toFixed(2)}zł</span>
              <span>{order.paymentMethod && handleMethod(order)}</span>
              <span>
                {data.firstName} {data.lastName}
              </span>
              <span>
                Czas {order.delivery === true ? "dostawy" : "odbioru"}:{" "}
                {order.deliveryTime}
              </span>
            </div>
          </div>
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
      {openEditor && (
        <Edit
          order={order}
          closeEditor={setOpenEditor}
          closeModal={closeModal}
          key={order._id}
        />
      )}
    </div>
  );
};

export default Modal;
