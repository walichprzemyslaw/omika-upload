import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import "./settings.scss";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/users/find/${id}`);
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useFetch(`/orders/user/${id}`);

  console.log(data);
  console.log(ordersData);

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
                id="username"
              />
            </div>
            <div className="formInput">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                defaultValue={data.email}
                id="email"
              />
            </div>
            <div className="formInput">
              <label>Hasło</label>
              <input type="password" placeholder="Haslo" id="password" />
            </div>
            <div className="formInput">
              <label>Imię</label>
              <input
                type="text"
                placeholder="Imię"
                defaultValue={data.firstName}
                id="firstName"
              />
            </div>
            <div className="formInput">
              <label>Nazwisko</label>
              <input
                type="text"
                placeholder="Nazwisko"
                defaultValue={data.lastName}
                id="lastName"
              />
            </div>
            <div className="formInput">
              <label>Ulica</label>
              <input
                type="text"
                placeholder="Ulica"
                defaultValue={data.street}
                id="street"
              />
            </div>
            <div className="formInput">
              <label>Numer domu</label>
              <input
                type="text"
                placeholder="Numer domu"
                defaultValue={data.homeNumber}
                id="homeNumber"
              />
            </div>
            <div className="formInput">
              <label>Miasto</label>
              <input
                type="text"
                placeholder="Miasto"
                defaultValue={data.city}
                id="city"
              />
            </div>
            <div className="formInput">
              <label>Numer telefonu</label>
              <input
                type="number"
                placeholder="Numer telefonu"
                defaultValue={data.phone}
                id="phone"
              />
            </div>
          </div>
          <div className="settingsRight">
            <h2 className="settingsTitle">Historia zamówień:</h2>
            <table className="orders">
              <thead>
                <tr>
                  <th></th>
                  <th>Data</th>
                  <th>Cena</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order) => (
                  <tr className="orderItem" key={order.id}>
                    <th>
                      <ReceiptLongRoundedIcon className="icon" />
                    </th>
                    <th>{new Date(order.createdAt).toLocaleString()}</th>
                    <th>{order.totalPrice} zł</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
