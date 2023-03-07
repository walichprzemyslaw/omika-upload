import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";
import "./edit.scss";
import Item from "../item/Item";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem, resetCart } from "../../redux/cartReducer";
import axios from "axios";
import Duo from "../duo/Duo";

const Edit = ({ order, closeEditor, closeModal }) => {
  console.log(order);
  const [openDuo, setOpenDuo] = useState(false);

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
 
  const [info, setInfo] = useState(order);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products); 
//   dispatch( 
//     addToCart(...order.products)
//   );
  console.log(products);
//   const products = useSelector(
//     (state) => (state.cart.products = order.products)
//   ); 

  const [customer, setCustomer] = useState(false);
  //   const [products, setProducts] = useState(false);

  const getTimeRange = (startTime) => {
    const start = new Date(startTime);
    const end = new Date();
    end.setHours(22, 0, 0);

    let timeRange = [];
    while (start <= end) {
      let x = start.getMinutes();
      let y = 0;
      while (x > y && x < 60) {
        start.setMinutes(y + 5);
        y = y + 5;
      }
      // start.setMinutes(start.getMinutes() + 5);

      timeRange.push(
        new Date(start).toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }) +
          " - " +
          new Date(
            start.setMinutes(start.getMinutes() + 10)
          ).toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
          })
      );
    }
    return timeRange;
  };
  let timeRange = getTimeRange(new Date());

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
        totalPrice,
      };
      console.log(newOrder);
      await axios.put(`/orders/${order._id}`, newOrder);
      navigate("/");
      closeEditor(false);
    //   closeModal(false);
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
            <h1>Edytuj zamówienie</h1>
          </div>
          <button className="closeButton" onClick={() => closeEditor(false)}>
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
                  <select
                    id="paymentReciver"
                    onChange={handleChange}
                    defaultValue={info.paymentReciver}
                  >
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
                  <p className="title">Wybierz czas:</p>
                  <select
                    id="deliveryTime"
                    className="select"
                    onChange={handleChange}
                    value={info.deliveryTime}
                  >
                    <option value="jak najszybciej">Jak najszybciej</option>

                    {timeRange.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
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
          {products.length > 0 && (
            <div className="orderedProductsInfo">
              <DeleteForeverOutlinedIcon
                className="cartDelete"
                onClick={() => dispatch(resetCart())}
              />
              <h1>Zamówione produkty:</h1>
            </div>
          )}
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
                          {cartItem.firstHalf.excludedIngredients.length >
                            0 && (
                            <p>
                              Minus:
                              {cartItem.firstHalf.excludedIngredients.join(
                                ", "
                              )}
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
                      {cartItem.taste.length > 0 && (
                        <p>Smak: {cartItem.taste}</p>
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
                          firstHalf: cartItem.firstHalf,
                          secondHalf: cartItem.secondHalf,
                        })
                      )
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
          {products.length > 0 && <h1>Łączna kwota: {cartTotal()}</h1>}
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
          {category === "pizza" && (
            <div className="itemCard">
              <div className="itemContainer" onClick={() => setOpenDuo(true)}>
                <img
                  className="itemImage"
                  src="http://res.cloudinary.com/dqknlkpku/image/upload/v1675902485/upload/yhli9sounakp2iymdmyx.png"
                  alt="duo"
                />
                <div className="details">
                  <p className="title">pół na pół</p>
                </div>
              </div>
            </div>
          )}
          {loading
            ? "ładowanie..."
            : data.map((product) => (
                <Item product={product} key={product._id} />
              ))}
        </div>
      </div>
      {openDuo && <Duo closeDuo={setOpenDuo} />}
    </div>
  );
};

export default Edit;
