import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./new.scss";
import Item from "../item/Item";

const New = ({ closeNew }) => {
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        ...info,
      };
      console.log(newOrder);
      //   await axios.post(`/orders/`, newOrder);
      //   closeNew(false);
      //   navigate("/");
    } catch (error) {
      console.log(error);
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
                  <select id="paymentReciver" onChange={handleChange}>
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
        <div className="productsContainer">
          <h1>WYBIERZ PRODUKTY</h1>
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
