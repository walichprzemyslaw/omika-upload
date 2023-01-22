import "./modal.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

const Modal = ({ closeModal }) => {
  const [price, setPrice] = useState(34.95);
  const [size, setSize] = useState("medium");
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1);

  //null error po otwarciu i kliknięciu ilości
  const number = document.querySelector("input.quantity");
  
  // temporary data
  const ingredients = [
    { id: 1, name: "sos pomidorowy" },
    { id: 2, name: "ser" },
    { id: 3, name: "kurczak" },
    { id: 4, name: "czerwona cebula" },
    { id: 5, name: "sos barbeque" },
  ];

  const addons = [
    {
      id: 1,
      name: "salami",
      price: [5, 7],
    },
    {
      id: 2,
      name: "szynka",
      price: [5, 7],
    },
    {
      id: 3,
      name: "boczek",
      price: [5, 7],
    },
    {
      id: 4,
      name: "kabanos",
      price: [5, 7],
    },
    {
      id: 5,
      name: "rukola",
      price: [3, 5],
    },
    {
      id: 6,
      name: "pomidor koktajlowy",
      price: [3, 5],
    },
    {
      id: 7,
      name: "cebula prażona",
      price: [3, 5],
    },
    {
      id: 8,
      name: "cebula",
      price: [3, 5],
    },
    {
      id: 9,
      name: "oliwki",
      price: [3, 5],
    },
    {
      id: 10,
      name: "ananas",
      price: [3, 5],
    },
  ];

  const handleLargeSize = (e) => {
    setSize("large");
    setPrice(44.95);
    console.log(size);
    document
      .querySelectorAll("input.addons")
      .forEach((el) => (el.checked = false));
    setAddedIngredients([]);
  };

  const handleMediumSize = (e) => {
    setSize("medium");
    setPrice(34.95);
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
        excludedIngredients.filter((item) => item !== ingredient.name)
      );
    } else {
      setExcludedIngredients((prev) => [...prev, e.target.id]);
    }
  };

  console.log(addedIngredients);
  console.log(excludedIngredients);
  const totalPrice = price * quantity;
  console.log(number?.value);
  console.log(quantity);

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="details">
          <div className="detailsLeft">
            <h4>Wybierz rozmiar:</h4>
            <div
              className={size === "large" ? "sizeOption active" : "sizeOption"}
              onClick={handleLargeSize}
            >
              <LocalPizzaIcon className="large" />
              <p className="sizeTitle">40cm</p>
            </div>
            <div
              className={size === "medium" ? "sizeOption active" : "sizeOption"}
              onClick={handleMediumSize}
            >
              <LocalPizzaIcon className="medium" />
              <p className="sizeTitle">30cm</p>
            </div>
            <div className="addToCart">
              <div className="quantityContainer">
                <KeyboardArrowDownIcon className="icon" onClick={()=>{number.stepDown();setQuantity(number.value)}}/>
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="quantity"
                />
                <KeyboardArrowUpIcon className="icon" onClick={()=>{number.stepUp();setQuantity(number.value)}}/>
              </div>
              <button className="addToCartButton" onClick={() => closeModal(false)}>
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
            {ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <input
                  type="checkbox"
                  id={ingredient.name}
                  value={ingredient.name}
                  defaultChecked={true}
                  onClick={(e) => handleExclude(e, ingredient)}
                />
                <label htmlFor={ingredient.name}>{ingredient.name}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="options">
          <h4>Dodatki:</h4>
          <ul className="ingredients">
            {addons.map((addon) => (
              <li key={addon.id}>
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
      </div>
    </div>
  );
};

export default Modal;
