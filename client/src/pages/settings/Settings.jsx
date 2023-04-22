import "./settings.scss";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Order from "../../components/order/Order";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openOrder, setOpenOrder] = useState(false);
  const [order, setOrder] = useState({});
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/users/find/${id}`);
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useFetch(`/orders/user/${id}`);

  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(data);
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const updateUser = {
        ...info,
      };
      console.log(updateUser);
      await axios.put(`/users/${id}`, updateUser);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <Navbar />
        <div className="settingsHeader">
          <h1>Twoje konto</h1>
        </div>
        <div className="settingsWrapper">
          <div className="settingsLeft">
            <h2 className="settingsTitle">Twoje dane:</h2>
            <div className="formInput">
              <label>Nazwa użytkownika</label>
              <input
                type="text"
                placeholder="Nazwa użytkownika"
                defaultValue={data.username}
                onChange={handleChange}
                id="username"
              />
            </div>
            <div className="formInput">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                defaultValue={data.email}
                onChange={handleChange}
                id="email"
              />
            </div>
            <div className="formInput">
              <label>Imię</label>
              <input
                type="text"
                placeholder="Imię"
                defaultValue={data.firstName}
                onChange={handleChange}
                id="firstName"
              />
            </div>
            <div className="formInput">
              <label>Nazwisko</label>
              <input
                type="text"
                placeholder="Nazwisko"
                defaultValue={data.lastName}
                onChange={handleChange}
                id="lastName"
              />
            </div>
            <div className="formInput">
              <label>Ulica</label>
              <input
                type="text"
                placeholder="Ulica"
                defaultValue={data.street}
                onChange={handleChange}
                id="street"
              />
            </div>
            <div className="formInput">
              <label>Numer domu</label>
              <input
                type="text"
                placeholder="Numer domu"
                defaultValue={data.homeNumber}
                onChange={handleChange}
                id="homeNumber"
              />
            </div>
            <div className="formInput">
              <label>Miasto</label>
              <input
                type="text"
                placeholder="Miasto"
                defaultValue={data.city}
                onChange={handleChange}
                id="city"
              />
            </div>
            <div className="formInput">
              <label>Numer telefonu</label>
              <input
                type="number"
                placeholder="Numer telefonu"
                defaultValue={data.phone}
                onChange={handleChange}
                id="phone"
              />
            </div>
            <button className="settingsButton" onClick={handleClick}>
              Aktualizuj
            </button>
          </div>
          <div className="settingsRight">
            <h2 className="settingsTitle">Historia zamówień:</h2>
            <div className="orders">
              {ordersData.map((order) => (
                <>
                  <div
                    className="orderItem"
                    key={order._id}
                    onClick={() => {
                      setOpenOrder(true);
                      setOrder(order);
                    }}
                  >
                    <span>
                      <ReceiptLongRoundedIcon className="icon" />{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      {openOrder && <Order item={order} closeOrder={setOpenOrder} />}
    </div>
  );
};

export default Settings;
