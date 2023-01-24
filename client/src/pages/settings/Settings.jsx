import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import "./settings.scss";

const Settings = () => {
  const orders = [
    {
      id: 1,
      totalPrice: 34.95,
      status: "pending",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 2,
      totalPrice: 69.9,
      status: "active",
      paymentMethod: "online",
      delivery: false,
    },
    {
      id: 3,
      totalPrice: 104.85,
      status: "active",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 1,
      totalPrice: 34.95,
      status: "pending",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 2,
      totalPrice: 69.9,
      status: "active",
      paymentMethod: "online",
      delivery: false,
    },
    {
      id: 3,
      totalPrice: 104.85,
      status: "active",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 1,
      totalPrice: 34.95,
      status: "pending",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 2,
      totalPrice: 69.9,
      status: "active",
      paymentMethod: "online",
      delivery: false,
    },
    {
      id: 3,
      totalPrice: 104.85,
      status: "active",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 1,
      totalPrice: 34.95,
      status: "pending",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 2,
      totalPrice: 69.9,
      status: "active",
      paymentMethod: "online",
      delivery: false,
    },
    {
      id: 3,
      totalPrice: 104.85,
      status: "active",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 1,
      totalPrice: 34.95,
      status: "pending",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 2,
      totalPrice: 69.9,
      status: "active",
      paymentMethod: "online",
      delivery: false,
    },
    {
      id: 3,
      totalPrice: 104.85,
      status: "active",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 1,
      totalPrice: 34.95,
      status: "pending",
      paymentMethod: "cash",
      delivery: true,
    },
    {
      id: 2,
      totalPrice: 69.9,
      status: "active",
      paymentMethod: "online",
      delivery: false,
    },
    {
      id: 3,
      totalPrice: 104.85,
      status: "active",
      paymentMethod: "cash",
      delivery: true,
    },
  ];

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
                id="username"
              />
            </div>
            <div className="formInput">
              <label>Email</label>
              <input type="email" placeholder="Email" id="email" />
            </div>
            <div className="formInput">
              <label>Hasło</label>
              <input type="password" placeholder="Haslo" id="password" />
            </div>
            <div className="formInput">
              <label>Imię</label>
              <input type="text" placeholder="Imię" id="firstName" />
            </div>
            <div className="formInput">
              <label>Nazwisko</label>
              <input type="text" placeholder="Nazwisko" id="lastName" />
            </div>
            <div className="formInput">
              <label>Ulica</label>
              <input type="text" placeholder="Ulica" id="street" />
            </div>
            <div className="formInput">
              <label>Miasto</label>
              <input type="text" placeholder="Miasto" id="city" />
            </div>
            <div className="formInput">
              <label>Numer telefonu</label>
              <input type="number" placeholder="Numer telefonu" id="phone" />
            </div>
          </div>
          <div className="settingsRight">
            <h2 className="settingsTitle">Historia zamówień:</h2>
            <table className="orders">
              <tr>
                <th></th>
                <th>ID</th>
                <th>Cena</th>
                <th>Status</th>
                <th>Płatność</th>
              </tr>
              {orders.map((order) => (
                <tr className="orderItem" key={order.id}>
                  <th>
                    <ReceiptLongRoundedIcon className="icon" />
                  </th>
                  <th>{order.id}</th>
                  <th>{order.totalPrice}</th>
                  <th>{order.status}</th>
                  <th>{order.paymentMethod}</th>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
