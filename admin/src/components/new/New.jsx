import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";
import "./new.scss";
import Item from "../item/Item";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import axios from "axios";

const New = ({ closeNew }) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const categories = [
    { id: 1, name: "pizza" },
    { id: 2, name: "burgery" },
    { id: 3, name: "zapiekanki" },
    { id: 4, name: "sałatki" },
    { id: 5, name: "dodatki" },
  ];
  const [category, setCategory] = useState("pizza");
  const { data, loading, error } = useFetch(`/products/category/${category}`);
  const {
    data: employeeData,
    loading: employeeLoading,
    error: employeeError,
  } = useFetch(`/employees`);
  const [info, setInfo] = useState({
    deliveryZone: "A",
    status: "pending",
    paymentMethod: "cash",
    delivery: true,
  });
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(false);
  //   const [products, setProducts] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const cartTotal = () => {
    let cartTotal = 0;
    products.forEach((item) => (cartTotal += item.quantity * item.price));
    return cartTotal.toFixed(2);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const totalPrice = cartTotal();
      const newOrder = {
        ...info,
        products,
        totalPrice
      };
      console.log(newOrder);
        await axios.post(`/orders/`, newOrder);
        closeNew(false);
        navigate("/");
        dispatch(resetCart());
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="newOrder">
      <div className="newOrderContainer">
        <div className="top">
          <div className="info">
            <h1>Dodaj nowe zamówienie</h1>
          </div>
          <button className="closeButton" onClick={() => closeNew(false)}>
            &times;
          </button>
        </div>
        <div className="customerContainer">
          <h1 onClick={() => setCustomer(!customer)}>WPROWADŹ DANE KLIENTA</h1>
        </div>
        {customer && (
          <div className="modalWrapper">
            <div className="inputContainer">
              <form>
                <div className="formInput">
                  <label htmlFor="phone">Numer telefonu:</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    id="phone"
                    defaultValue={info.phone}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="customerId">ID klienta:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="customerId"
                    defaultValue={info.customerId}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="firstName">Imię:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="firstName"
                    defaultValue={info.firstName}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="lastName">Nazwisko:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="lastName"
                    defaultValue={info.lastName}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="street">Ulica:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="street"
                    defaultValue={info.street}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="homeNumber">Numer domu:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="homeNumber"
                    defaultValue={info.homeNumber}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="city">Miasto:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="city"
                    defaultValue={info.city}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="totalPrice">Łączna cena:</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    id="totalPrice"
                    defaultValue={info.totalPrice}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="comments">Uwagi:</label>
                  <textarea
                    placeholder="Uwagi do zamówienia"
                    defaultValue={info.comments}
                    onChange={handleChange}
                    id="comments"
                  ></textarea>
                </div>
                <div className="formInput">
                  <label htmlFor="paymentReciver">Pracownik</label>
                  <select id="paymentReciver" onChange={handleChange} defaultValue={info.paymentReciver}>
                    <option value="wybierz pracownika">
                      Wybierz pracownika
                    </option>
                    {employeeData.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formInput">
                  <p className="title">Wybierz metodę odbioru zamówienia:</p>
                  <select
                    id="delivery"
                    className="select"
                    defaultValue={info.delivery}
                    onChange={handleChange}
                  >
                    <option value={true}>Dostawa</option>
                    <option value={false}>Odbiór osobisty</option>
                  </select>
                </div>
                <div className="formInput">
                  <p className="title">Wybierz metodę płatności:</p>
                  <select
                    id="paymentMethod"
                    className="select"
                    defaultValue={info.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="cash">Gotówka</option>
                    <option value="terminal">Kartą przy odbiorze</option>
                    <option value="online">Płatność online</option>
                  </select>
                </div>
                <div className="checkoutButton">
                  <button onClick={handleClick}>Wyślij</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="cartNewContainer">
          {products.length > 0 && <h1>Zamówione produkty:</h1>}
          <ul className="cartItems">
            {products?.map((cartItem) => (
              <li
                className="cartItem"
                key={
                  cartItem.id +
                  cartItem.addedIngredients +
                  cartItem.excludedIngredients +
                  cartItem.size +
                  cartItem.taste +
                  cartItem.crust
                }
              >
                <div className="itemLeft">
                  <img src={cartItem.img} alt="" />
                  <div className="details">
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
                    <div className="cartDetails">
                      {cartItem.addedIngredients.length > 0 && (
                        <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                      )}
                      {cartItem.excludedIngredients.length > 0 && (
                        <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                      )}
                      {cartItem.taste.length > 0 && (
                        <p>Smak: {cartItem.taste}</p>
                      )}
                      {cartItem.crust.length > 0 && (
                        <p>Ciasto: {cartItem.crust}</p>
                      )}
                    </div>
                    <div className="price">
                      {cartItem.quantity}x {cartItem.price.toFixed(2)}zł
                    </div>
                  </div>
                </div>
                <div className="itemRight">
                  <DeleteForeverOutlinedIcon
                    className="cartDelete"
                    onClick={() =>
                      dispatch(
                        removeItem({
                          id: cartItem.id,
                          addedIngredients: cartItem.addedIngredients,
                          excludedIngredients: cartItem.excludedIngredients,
                          size: cartItem.size,
                          taste: cartItem.taste,
                          crust: cartItem.crust,
                        })
                      )
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="productsContainer">
          <h1>WYBIERZ PRODUKTY</h1>
        </div>
        <div className="categoriesContainer">
          <ul className="categories">
            {categories.map((category) => (
              <div
                className="categoryItem"
                key={category.id}
                onClick={() => setCategory(category.name)}
              >
                <li>
                  <LocalPizzaIcon className="icon" />
                </li>
                <p className="categoryTitle">{category.name}</p>
              </div>
            ))}
          </ul>
        </div>
        <div className="productsWrapper">
          {loading
            ? "ładowanie..."
            : data.map((product) => (
                <Item product={product} key={product._id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default New;
