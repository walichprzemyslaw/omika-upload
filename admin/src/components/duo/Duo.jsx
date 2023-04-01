import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { addToCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import "./duo.scss";

const Duo = ({ closeDuo }) => {
  const dispatch = useDispatch();

  const { data:pizzaData, loading, error } = useFetch(`/products/category/pizza`);
  let pizzas = pizzaData.slice(0, pizzaData.length - 1);
  // pizzas = pizzas.filter(item => item.name !== 'na wypasie');
  const [pizza, setPizza] = useState();
  const [pizza2, setPizza2] = useState();
  const [price, setPrice] = useState();
  const [price2, setPrice2] = useState();
  const [size, setSize] = useState("medium");
  const [crust, setCrust] = useState("");
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [addedIngredients2, setAddedIngredients2] = useState([]);
  const [excludedIngredients2, setExcludedIngredients2] = useState([]);
  const [ingredientsData2, setIngredientsData2] = useState([]);

  useEffect(() => {
    if (pizza) {
      setPrice(pizza.price[0]);
      setSize("medium");
      setCrust("tradycyjne");
      const [sos, ...rest] = pizza.ingredients;
      const fetchData = async () => {
        const response = await fetch(`/ingredients/category/pizza/${rest}`);
        const json = await response.json();
        setIngredientsData(json);
      };
      fetchData();
    }
    if (pizza2) {
      setPrice2(pizza2.price[0]);
      setSize("medium");
      setCrust("tradycyjne");
      const [sos, ...rest] = pizza2.ingredients;
      const fetchData2 = async () => {
        const response = await fetch(`/ingredients/category/pizza/${rest}`);
        const json = await response.json();
        setIngredientsData2(json);
      };
      fetchData2();
    }
  }, [pizza, pizza2]);

  const handlePizza = (pizza) => {
    document.querySelectorAll("input.pizza").forEach((el) => {
      if (el.value !== pizza.name) {
        el.checked = false;
      }
    });
    document
      .querySelectorAll("input.addon")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input.ingredient")
      .forEach((el) => (el.checked = true));
    setPizza(pizza);
    setAddedIngredients([]);
    setExcludedIngredients([]);
  };

  const handlePizza2 = (pizza) => {
    document.querySelectorAll("input.pizza2").forEach((el) => {
      if (el.value !== pizza.name) {
        el.checked = false;
      }
    });
    document
      .querySelectorAll("input.addon2")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input.ingredient2")
      .forEach((el) => (el.checked = true));
    setPizza2(pizza);
    setAddedIngredients2([]);
    setExcludedIngredients2([]);
  };

  const handleCrust = (e) => {
    setCrust(e.target.dataset.value);
    let index;
    if (size === "medium") {
      index = 0;
    } else {
      index = 1;
    }
    setPrice(pizza?.price[index]);
    setPrice2(pizza2?.price[index]);

    if (e.target.dataset.value === "grube") {
      if (size === "medium") {
        setPrice(pizza?.price[index] + 3);
        setPrice2(pizza2?.price[index] + 3);
      } else {
        setPrice(pizza?.price[index] + 5);
        setPrice2(pizza2?.price[index] + 5);
      }
    }
    document
      .querySelectorAll("input.addon")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input.ingredient")
      .forEach((el) => (el.checked = true));
    document
      .querySelectorAll("input.addon2")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input.ingredient2")
      .forEach((el) => (el.checked = true));
    setAddedIngredients([]);
    setAddedIngredients2([]);
    setExcludedIngredients([]);
    setExcludedIngredients2([]);
  };

  const handleLargeSize = (e) => {
    setSize("large");
    setCrust("tradycyjne");
    setPrice(pizza?.price[1]);
    setPrice2(pizza2?.price[1]);

    document
      .querySelectorAll("input.addon")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input.ingredient")
      .forEach((el) => (el.checked = true));
    setAddedIngredients([]);
    setExcludedIngredients([]);
    document
      .querySelectorAll("input.addon2")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input.ingredient2")
      .forEach((el) => (el.checked = true));
    setAddedIngredients2([]);
    setExcludedIngredients2([]);
  };

  const handleMediumSize = (e) => {
    setSize("medium");
    setCrust("tradycyjne");
    setPrice(pizza?.price[0]);
    setPrice2(pizza2?.price[0]);
    document
      .querySelectorAll("input.addon")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input.ingredient")
      .forEach((el) => (el.checked = true));
    setAddedIngredients([]);
    setExcludedIngredients([]);
    document
      .querySelectorAll("input.addon2")
      .forEach((el) => (el.checked = false));
    document
      .querySelectorAll("input.ingredient2")
      .forEach((el) => (el.checked = true));
    setAddedIngredients2([]);
    setExcludedIngredients2([]);
  };

  const handleClick = (e, addon) => {
    const checked = e.target.checked;
    console.log(e.target);
    if (checked) {
      setPrice(price + parseInt(e.target.value));
      setAddedIngredients((prev) => [...prev, e.target.name]);
    } else {
      setPrice(price - parseInt(e.target.value));
      setAddedIngredients(
        addedIngredients.filter((item) => item !== addon.name)
      );
    }
  };

  const handleClick2 = (e, addon) => {
    const checked = e.target.checked;
    console.log(e.target);
    if (checked) {
      setPrice2(price2 + parseInt(e.target.value));
      setAddedIngredients2((prev) => [...prev, e.target.name]);
    } else {
      setPrice2(price2 - parseInt(e.target.value));
      setAddedIngredients2(
        addedIngredients2.filter((item) => item !== addon.name)
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
      setExcludedIngredients((prev) => [...prev, e.target.name]);
    }
  };

  const handleExclude2 = (e, ingredient) => {
    const checked = e.target.checked;
    if (checked) {
      setExcludedIngredients2(
        excludedIngredients2.filter((item) => item !== ingredient)
      );
    } else {
      setExcludedIngredients2((prev) => [...prev, e.target.name]);
    }
  };

  return (
    <div className="duo">
      <div className="duoContainer">
        <div className="duoTop">
          <div className="duoRight">
            <button className="closeButton" onClick={() => closeDuo(false)}>
              &times;
            </button>
          </div>
          <div className="duoLeft">
            <div className="options">
              <h4>Wybierz rozmiar:</h4>
              <div className="optionsBox">
                <div
                  className={
                    size === "large" ? "sizeOption active" : "sizeOption"
                  }
                  onClick={handleLargeSize}
                >
                  40cm
                </div>
                <div
                  className={
                    size === "medium" ? "sizeOption active" : "sizeOption"
                  }
                  onClick={handleMediumSize}
                >
                  30cm
                </div>
              </div>
            </div>
            <div className="options">
              <h4>Wybierz ciasto:</h4>

              <div className="optionsBox">
                <div
                  className={
                    crust === "cienkie" ? "sizeOption active" : "sizeOption"
                  }
                  data-value="cienkie"
                  onClick={(e) => handleCrust(e)}
                >
                  Cienkie
                </div>
                <div
                  className={
                    crust === "tradycyjne" ? "sizeOption active" : "sizeOption"
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

            <div className="addToCart">
              <button
                className="addToCartButton"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: pizza._id,
                      name: "pół na pół",
                      img: pizza.img,
                      category: "pizza",
                      crust,
                      quantity: 1,
                      taste: "",
                      drink: "",
                      addedIngredients: [],
                      excludedIngredients: [],
                      size,
                      price: price > price2 ? price : price2,
                      firstHalf: {
                        name: pizza.name,
                        addedIngredients,
                        excludedIngredients,
                      },
                      secondHalf: {
                        name: pizza2.name,
                        addedIngredients2,
                        excludedIngredients2,
                      },
                    })
                  );
                  closeDuo(false);
                }}
              >
                <p className="price">
                  +{price > price2 ? price?.toFixed(2) : price2?.toFixed(2)}zł
                </p>
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
        <div className="duoBottom">
          <div className="duoPizza">
            <h4>Pierwsza połowa:</h4>
            <ul className="pizzas">
              {pizzas.map((item) => (
                <li key={item?._id}>
                  <input
                    className="pizza"
                    type="checkbox"
                    id={item.name}
                    value={item.name}
                    onClick={() => handlePizza(item)}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </li>
              ))}
            </ul>
            {pizza?.ingredients.length > 0 && (
              <div className="duoIngredients">
                <h4>Składniki:</h4>
                <ul className="ingredients">
                  {pizza.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        className="ingredient"
                        id={ingredient + "skladnik"}
                        name={ingredient}
                        value={ingredient}
                        defaultChecked={true}
                        onClick={(e) => handleExclude(e, ingredient)}
                      />
                      <label htmlFor={ingredient + "skladnik"}>
                        {ingredient}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {ingredientsData.length > 0 && (
              <>
                <div className="duoAddons">
                  <h4>Dodatki:</h4>
                  <ul className="addons">
                    {ingredientsData?.map((addon) => (
                      <li key={addon?._id}>
                        <input
                          className="addon"
                          type="checkbox"
                          name={addon.name}
                          id={addon.name + "dodatek"}
                          value={
                            size === "large" ? addon.price[1] : addon.price[0]
                          }
                          onClick={(e) => handleClick(e, addon)}
                        />
                        <label htmlFor={addon.name + "dodatek"}>
                          {addon.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
          {/* <hr /> */}
          <div className="duoPizza">
            <h4>Druga połowa:</h4>
            <ul className="pizzas">
              {pizzas.map((item) => (
                <li key={item?._id}>
                  <input
                    className="pizza2"
                    type="checkbox"
                    id={item.name + "2"}
                    name={item.name}
                    value={item.name}
                    onClick={() => handlePizza2(item)}
                  />
                  <label htmlFor={item.name + "2"}>{item.name}</label>
                </li>
              ))}
            </ul>
            {pizza2?.ingredients.length > 0 && (
              <div className="duoIngredients">
                <h4>Składniki:</h4>
                <ul className="ingredients">
                  {pizza2.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        className="ingredient2"
                        id={ingredient + "skladnik2"}
                        name={ingredient}
                        value={ingredient}
                        defaultChecked={true}
                        onClick={(e) => handleExclude2(e, ingredient)}
                      />
                      <label htmlFor={ingredient + "skladnik2"}>
                        {ingredient}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {ingredientsData2.length > 0 && (
              <>
                <div className="duoAddons">
                  <h4>Dodatki:</h4>
                  <ul className="addons">
                    {ingredientsData2?.map((addon) => (
                      <li key={addon?._id}>
                        <input
                          className="addon2"
                          type="checkbox"
                          name={addon.name}
                          id={addon.name + "dodatek2"}
                          value={
                            size === "large" ? addon.price[1] : addon.price[0]
                          }
                          onClick={(e) => handleClick2(e, addon)}
                        />
                        <label htmlFor={addon.name + "dodatek2"}>
                          {addon.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duo;
