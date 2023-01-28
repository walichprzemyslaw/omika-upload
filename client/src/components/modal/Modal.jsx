import "./modal.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const Modal = ({ closeModal, item }) => {
  const [price, setPrice] = useState(item.price[0]);
  const [size, setSize] = useState("medium");
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [sos, ...rest] = item.ingredients;

  const { data, loading, error } = useFetch(
    `/ingredients/category/${item.category}/${rest}`
  );

  //null error po otwarciu i kliknięciu ilości
  const number = document.querySelector("input.quantity");

  const handleLargeSize = (e) => {
    setSize("large");
    setPrice(item.price[1]);
    console.log(size);
    document
      .querySelectorAll("input.addons")
      .forEach((el) => (el.checked = false));
    setAddedIngredients([]);
  };

  const handleMediumSize = (e) => {
    setSize("medium");
    setPrice(item.price[0]);
    console.log(size);
    document
      .querySelectorAll("input.addons")
      .forEach((el) => (el.checked = false));
    setAddedIngredients([]);
  };

  const handleClick = (e, addon) => {
    const checked = e.target.checked;
    if (checked) {
      setPrice(price + parseInt(e.target.value));
      setAddedIngredients((prev) => [...prev, e.target.id]);
    } else {
      setPrice(price - parseInt(e.target.value));
      setAddedIngredients(
        addedIngredients.filter((item) => item !== addon.name)
      );
    }
  };

  const handleExclude = (e, ingredient) => {
    const checked = e.target.checked;
    if (checked) {
      setExcludedIngredients(
        excludedIngredients.filter((item) => item !== ingredient)
      );
    } else {
      setExcludedIngredients((prev) => [...prev, e.target.id]);
    }
  };

  console.log(addedIngredients);
  console.log(excludedIngredients);
  const totalPrice = price * quantity;
  // console.log(number?.value);
  // console.log(quantity);

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="details">
          <div className="detailsLeft">
            {item.price.length > 1 && (
              <>
                <h4>Wybierz rozmiar:</h4>
                <div
                  className={
                    size === "large" ? "sizeOption active" : "sizeOption"
                  }
                  onClick={handleLargeSize}
                >
                  {item.name === "nuggetsy" ? (
                    <div className="sizeTitle">10 sztuk</div>
                  ) : (
                    <>
                      <LocalPizzaIcon className="large" />
                      <p className="sizeTitle">40cm</p>
                    </>
                  )}
                </div>
                <div
                  className={
                    size === "medium" ? "sizeOption active" : "sizeOption"
                  }
                  onClick={handleMediumSize}
                >
                  {item.name === "nuggetsy" ? (
                    <div className="sizeTitle">5 sztuk</div>
                  ) : (
                    <>
                      <LocalPizzaIcon className="medium" />
                      <p className="sizeTitle">30cm</p>
                    </>
                  )}
                </div>
              </>
            )}
            <div className="addToCart">
              <div className="quantityContainer">
                <KeyboardArrowDownIcon
                  className="icon"
                  onClick={() => {
                    number.stepDown();
                    setQuantity(number.value);
                  }}
                />
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="quantity"
                />
                <KeyboardArrowUpIcon
                  className="icon"
                  onClick={() => {
                    number.stepUp();
                    setQuantity(number.value);
                  }}
                />
              </div>
              <button
                className="addToCartButton"
                onClick={() => closeModal(false)}
              >
                <p className="price">+{totalPrice.toFixed(2)}zł</p>Dodaj do
                koszyka
              </button>
            </div>
          </div>
          <div className="detailsRight">
            <div className="close">
              <button className="closeButton" onClick={() => closeModal(false)}>
                &times;
              </button>
            </div>
          </div>
        </div>
        <div className="options">
          <h4>Składniki:</h4>
          <ul className="ingredients">
            {item.ingredients.map((ingredient, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={ingredient}
                  value={ingredient}
                  defaultChecked={true}
                  onClick={(e) => handleExclude(e, ingredient)}
                />
                <label htmlFor={ingredient}>{ingredient}</label>
              </li>
            ))}
          </ul>
        </div>
        {data.length > 0 && (
          <>
            <div className="options">
              <h4>Dodatki:</h4>
              <ul className="ingredients">
                {data.map((addon) => (
                  <li key={addon?._id}>
                    <input
                      className="addons"
                      type="checkbox"
                      id={addon.name}
                      value={size === "large" ? addon.price[1] : addon.price[0]}
                      onChange={(e) => handleClick(e, addon)}
                    />
                    <label htmlFor={addon.name}>{addon.name}</label>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
