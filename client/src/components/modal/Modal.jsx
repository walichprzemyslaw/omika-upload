import "./modal.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import AddedToCartModal from "../addedToCartModal/AddedToCartModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Modal = ({ closeModal, item }) => {
  const [price, setPrice] = useState(item.price[0]);
  const [size, setSize] = useState("medium");
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [drink, setDrink] = useState("");
  const [taste, setTaste] = useState("");
  const [crust, setCrust] = useState("");
  const [name, setName] = useState(item.name);
  const [ingredients, setIngredients] = useState(item.ingredients);
  const [quantity, setQuantity] = useState(1);
  const { data: pizzaData } = useFetch(`/products/category/pizza`);
  const { data: burgerData } = useFetch(`/products/category/burgery`);
  const { data: zapiekankiData } = useFetch(`/products/category/zapiekanki`);

  const [openAddedToCart, setOpenAddedToCart] = useState(false);

  let zapiekanki = zapiekankiData.slice(0, zapiekankiData.length - 1);
  let burgers = burgerData.slice(0, burgerData.length - 1);
  burgers = burgers.filter(
    (item) => !item.name.includes("mega") && !item.name.includes("giga")
  );
  let pizzas = pizzaData.slice(0, pizzaData.length - 1);
  pizzas = pizzas.filter((item) => item.name !== "na wypasie");

  const [sos, ...rest] = ingredients;

  const {
    data: tasteData,
    loading: tasteLoading,
    error: tasteError,
  } = useFetch(`/ingredients/category/sosy/a`);

  const {
    data: drinkData,
    loading: drinkLoading,
    error: drinkError,
  } = useFetch(`/ingredients/category/napoje/a`);

  const { data, loading, error } = useFetch(
    `/ingredients/category/${item.category}/${rest}`
  );

  const dispatch = useDispatch();

  const handleLargeSize = (e) => {
    setSize("large");
    if (item.category === "pizza") {
      setCrust("tradycyjne");
    }
    setPrice(item.price[1]);
    console.log(size);
    document
      .querySelectorAll("input.addons")
      .forEach((el) => (el.checked = false));
    setAddedIngredients([]);
  };

  const handleMediumSize = (e) => {
    setSize("medium");
    if (item.category === "pizza") {
      setCrust("tradycyjne");
    }
    setPrice(item.price[0]);
    console.log(size);
    document
      .querySelectorAll("input.addons")
      .forEach((el) => (el.checked = false));
    setAddedIngredients([]);
  };

  const handleXLargeSize = (e) => {
    setSize("xlarge");
    setPrice(item.price[2]);
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

  const handleSwitchLarge = (e) => {
    switch (e.name) {
      case "nuggetsy":
        return <div className="sizeTitle">10 sztuk</div>;
      case "sosy":
        return <div className="sizeTitle">100g</div>;
      case "napoje":
        return <div className="sizeTitle">0,5L</div>;
      default:
        return (
          <>
            <LocalPizzaIcon className="large" />
            <p className="sizeTitle">40cm</p>
          </>
        );
    }
  };

  const handleSwitchMedium = (e) => {
    switch (e.name) {
      case "nuggetsy":
        return <div className="sizeTitle">5 sztuk</div>;
      case "sosy":
        return <div className="sizeTitle">25g</div>;
      case "napoje":
        return <div className="sizeTitle">0,33L</div>;
      default:
        return (
          <>
            <LocalPizzaIcon className="medium" />
            <p className="sizeTitle">30cm</p>
          </>
        );
    }
  };

  const handleTaste = (e, ingredient) => {
    document.querySelectorAll("input.taste").forEach((el) => {
      if (el.value !== ingredient) {
        el.checked = false;
      }
    });
    setTaste(ingredient);
  };

  const handleName = (e, ingredient) => {
    document.querySelectorAll("input.pizza").forEach((el) => {
      if (el.value !== ingredient.name) {
        el.checked = false;
      }
    });
    if (ingredient.category !== "pizza") {
      setName("Zestaw: " + ingredient.name + " + frytki + napój");
    } else {
      setName("Zestaw: " + ingredient.name + " + sos + napój");
    }
    setIngredients(ingredient.ingredients);
    setAddedIngredients([]);
    document.querySelectorAll("input.addons").forEach((el) => {
      if (el.value !== ingredient.name) {
        el.checked = false;
      }
    });
    setExcludedIngredients([]);
    document.querySelectorAll("input.ingr").forEach((el) => {
      el.checked = true;
    });
    setPrice(item.price[0]);
    setSize("medium");
  };

  const handleDrink = (e, ingredient) => {
    document.querySelectorAll("input.drink").forEach((el) => {
      if (el.value !== ingredient) {
        el.checked = false;
      }
    });
    setDrink(ingredient);
  };

  const handleCrust = (e) => {
    console.log(e.target.dataset.value);
    setCrust(e.target.dataset.value);
    let index;
    if (size === "medium") {
      index = 0;
    } else {
      index = 1;
    }
    setPrice(item.price[index]);
    if (e.target.dataset.value === "grube") {
      if (size === "medium") {
        setPrice(item.price[index] + 3);
      } else {
        setPrice(item.price[index] + 5);
      }
    }
    document
      .querySelectorAll("input.addons")
      .forEach((el) => (el.checked = false));
    setAddedIngredients([]);
  };

  const totalPrice = price * quantity;

  return (
    <>
      <div className="modal">
        <div className="modalContainer">
          {item.category === "pizza" && !crust && setCrust("tradycyjne")}
          {(item.name === "sosy" ||
            (item.name === "zestaw" && item.category === "pizza")) &&
            !taste &&
            setTaste("czosnkowy")}
          {(item.name === "napoje" || item.name === "zestaw") &&
            !drink &&
            setDrink("pepsi")}
          <div className="details">
            <div className="detailsRight">
              <div className="close">
                <button
                  className="closeButton"
                  onClick={() => closeModal(false)}
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="detailsLeft">
              {item.price.length > 1 && (
                <>
                  <div className="options">
                    <h4>Wybierz rozmiar:</h4>
                    <div className="optionsBox">
                      {item.price.length > 2 && (
                        <div
                          className={
                            size === "xlarge"
                              ? "sizeOption active"
                              : "sizeOption"
                          }
                          onClick={handleXLargeSize}
                        >
                          0,85L
                        </div>
                      )}
                      <div
                        className={
                          size === "large" ? "sizeOption active" : "sizeOption"
                        }
                        onClick={handleLargeSize}
                      >
                        {handleSwitchLarge(item)}
                      </div>
                      <div
                        className={
                          size === "medium" ? "sizeOption active" : "sizeOption"
                        }
                        onClick={handleMediumSize}
                      >
                        {handleSwitchMedium(item)}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {item.category === "pizza" && (
                <>
                  <div className="options">
                    <h4>Wybierz ciasto:</h4>
                    <div className="optionsBox">
                      <div
                        className={
                          crust === "cienkie"
                            ? "sizeOption active"
                            : "sizeOption"
                        }
                        data-value="cienkie"
                        onClick={(e) => handleCrust(e)}
                      >
                        Cienkie
                      </div>
                      <div
                        className={
                          crust === "tradycyjne"
                            ? "sizeOption active"
                            : "sizeOption"
                        }
                        data-value="tradycyjne"
                        onClick={(e) => handleCrust(e)}
                      >
                        Tradycyjne
                      </div>
                      <div
                        className={
                          crust === "grube" ? "sizeOption active" : "sizeOption"
                        }
                        data-value="grube"
                        onClick={(e) => handleCrust(e)}
                      >
                        Grube
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="addToCart">
                <div className="quantityContainer">
                  {quantity > 1 && (
                    <button onClick={() => setQuantity(quantity - 1)}>-</button>
                  )}
                  <p>Ilość: {quantity}</p>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button
                  className="addToCartButton"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: item._id,
                        name: name,
                        img: item.img,
                        category: item.category,
                        addedIngredients,
                        excludedIngredients,
                        firstHalf: {
                          addedIngredients: [],
                          excludedIngredients: [],
                        },
                        secondHalf: {
                          addedIngredients2: [],
                          excludedIngredients2: [],
                        },
                        taste,
                        drink,
                        crust,
                        size,
                        price,
                        quantity,
                      })
                    );
                    setOpenAddedToCart(true);
                  }}
                >
                  <p className="price">+{totalPrice.toFixed(2)}zł</p>Dodaj do
                  koszyka
                </button>
              </div>
            </div>
          </div>

          {/* PIZZA ZESTAW !!!!!! */}
          {item.name === "zestaw" && item.category === "pizza" && (
            <>
              <div className="options">
                <h4>Pizza:</h4>
                <ul className="ingredients">
                  {pizzas.map((ingredient, index) => (
                    <li key={index}>
                      <input
                        className="pizza"
                        type="checkbox"
                        id={"id" + ingredient.name}
                        value={ingredient.name}
                        onChange={(e) => handleName(e, ingredient)}
                      />
                      <label htmlFor={"id" + ingredient.name}>
                        {ingredient.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="options">
                <h4>Sos:</h4>
                <ul className="ingredients">
                  {tasteData
                    .filter((ingredient) => ingredient.isAvailable)
                    .map((ingredient, index) => (
                      <li key={index}>
                        <input
                          className="taste"
                          type="checkbox"
                          id={ingredient.name}
                          value={ingredient.name}
                          onChange={(e) => handleTaste(e, ingredient.name)}
                        />
                        <label htmlFor={ingredient.name}>
                          {ingredient.name}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="options">
                <h4>Napój:</h4>
                <ul className="ingredients">
                  {size === "medium" &&
                    drinkData
                      .filter((ingredient) => ingredient.isAvailableSmall)
                      .map((ingredient, index) => (
                        <li key={index}>
                          <input
                            className="taste"
                            type="checkbox"
                            id={ingredient.name}
                            value={ingredient.name}
                            onChange={(e) => handleDrink(e, ingredient.name)}
                          />
                          <label htmlFor={ingredient.name}>
                            {ingredient.name}
                          </label>
                        </li>
                      ))}
                  {size === "large" &&
                    drinkData
                      .filter((ingredient) => ingredient.isAvailableMedium)
                      .map((ingredient, index) => (
                        <li key={index}>
                          <input
                            className="taste"
                            type="checkbox"
                            id={ingredient.name}
                            value={ingredient.name}
                            onChange={(e) => handleDrink(e, ingredient.name)}
                          />
                          <label htmlFor={ingredient.name}>
                            {ingredient.name}
                          </label>
                        </li>
                      ))}
                </ul>
              </div>
            </>
          )}

          {/* BURGER ZESTAW/////////// */}
          {item.name === "zestaw" && item.category === "burgery" && (
            <>
              <div className="options">
                <h4>Burger:</h4>
                <ul className="ingredients">
                  {burgers.map((ingredient, index) => (
                    <li key={index}>
                      <input
                        className="pizza"
                        type="checkbox"
                        id={"id" + ingredient.name}
                        value={ingredient.name}
                        onChange={(e) => handleName(e, ingredient)}
                      />
                      <label htmlFor={"id" + ingredient.name}>
                        {ingredient.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="options">
                <h4>Napój:</h4>
                <ul className="ingredients">
                  {drinkData
                    .filter((ingredient) => ingredient.isAvailableMedium)
                    .map((ingredient, index) => (
                      <li key={index}>
                        <input
                          className="drink"
                          type="checkbox"
                          id={ingredient.name}
                          value={ingredient.name}
                          onChange={(e) => handleDrink(e, ingredient.name)}
                        />
                        <label htmlFor={ingredient.name}>
                          {ingredient.name}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

          {/* ZAPIEKANKA ZESTAW/////////// */}
          {item.name === "zestaw" && item.category === "zapiekanki" && (
            <>
              <div className="options">
                <h4>Zapiekanka:</h4>
                <ul className="ingredients">
                  {zapiekanki.map((ingredient, index) => (
                    <li key={index}>
                      <input
                        className="pizza"
                        type="checkbox"
                        id={"id" + ingredient.name}
                        value={ingredient.name}
                        onChange={(e) => handleName(e, ingredient)}
                      />
                      <label htmlFor={"id" + ingredient.name}>
                        {ingredient.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="options">
                <h4>Napój:</h4>
                <ul className="ingredients">
                  {drinkData
                    .filter((ingredient) => ingredient.isAvailableMedium)
                    .map((ingredient, index) => (
                      <li key={index}>
                        <input
                          className="drink"
                          type="checkbox"
                          id={ingredient.name}
                          value={ingredient.name}
                          onChange={(e) => handleDrink(e, ingredient.name)}
                        />
                        <label htmlFor={ingredient.name}>
                          {ingredient.name}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

          {ingredients.length > 0 && (
            <div className="options">
              <h4>Składniki:</h4>
              <ul className="ingredients">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <input
                      className="ingr"
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
          )}
          {data.length > 0 && (
            <>
              <div className="options">
                <h4>Dodatki:</h4>
                <ul className="ingredients">
                  {data
                    .filter((ingredient) => ingredient.isAvailable)
                    .map((addon) => (
                      <li key={addon?._id}>
                        <input
                          className="addons"
                          type="checkbox"
                          id={addon.name}
                          value={
                            size === "large" ? addon.price[1] : addon.price[0]
                          }
                          onChange={(e) => handleClick(e, addon)}
                        />
                        <label htmlFor={addon.name}>{addon.name}</label>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}
          {item.name === "sosy" && (
            <div className="options">
              <h4>Sos:</h4>
              <ul className="ingredients">
                {tasteData
                  .filter((ingredient) => ingredient.isAvailable)
                  .map((ingredient, index) => (
                    <li key={index}>
                      <input
                        className="taste"
                        type="checkbox"
                        id={ingredient.name}
                        value={ingredient.name}
                        onChange={(e) => handleTaste(e, ingredient.name)}
                      />
                      <label htmlFor={ingredient.name}>{ingredient.name}</label>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {item.name === "napoje" && (
            <div className="options">
              <h4>Napój:</h4>
              <ul className="ingredients">
                {size === "medium" &&
                  drinkData
                    .filter((ingredient) => ingredient.isAvailableSmall)
                    .map((ingredient, index) => (
                      <li key={index}>
                        <input
                          className="taste"
                          type="checkbox"
                          id={ingredient.name}
                          value={ingredient.name}
                          onChange={(e) => handleDrink(e, ingredient.name)}
                        />
                        <label htmlFor={ingredient.name}>
                          {ingredient.name}
                        </label>
                      </li>
                    ))}
                {size === "large" &&
                  drinkData
                    .filter((ingredient) => ingredient.isAvailableMedium)
                    .map((ingredient, index) => (
                      <li key={index}>
                        <input
                          className="taste"
                          type="checkbox"
                          id={ingredient.name}
                          value={ingredient.name}
                          onChange={(e) => handleDrink(e, ingredient.name)}
                        />
                        <label htmlFor={ingredient.name}>
                          {ingredient.name}
                        </label>
                      </li>
                    ))}
                {size === "xlarge" &&
                  drinkData
                    .filter((ingredient) => ingredient.isAvailableLarge)
                    .map((ingredient, index) => (
                      <li key={index}>
                        <input
                          className="taste"
                          type="checkbox"
                          id={ingredient.name}
                          value={ingredient.name}
                          onChange={(e) => handleDrink(e, ingredient.name)}
                        />
                        <label htmlFor={ingredient.name}>
                          {ingredient.name}
                        </label>
                      </li>
                    ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {openAddedToCart && (
        <AddedToCartModal
          img={item.img}
          openModal={() => closeModal()}
          openAdded={() => setOpenAddedToCart()}
        />
      )}
    </>
  );
};

export default Modal;
