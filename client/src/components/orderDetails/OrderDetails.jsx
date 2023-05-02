import "./orderDetails.scss";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const OrderDetails = ({ item }) => {
  const handleMethod = (order) => {
    switch (order.paymentMethod) {
      case "cash":
        return "płatność gotówką";
      case "online":
        return "płatność online";
      case "terminal":
        return "płatność kartą";
    }
  };

  const handleStatus = (order) => {
    switch (order.status) {
      case "preparation":
        return "W przygotowaniu";
      case "ready":
        return "W trakcie dostawy";
      case "delivered":
        return "Dostarczone";
      case "pending":
        return "Oczekuje na potwierdzenie";
      case "cancelled":
        return "Odrzucone";
    }
  };

  return (
    <>
      {item.comments && (
        <div className="orderComments">
          <h1>Uwagi do zamówienia:</h1>
          <span>{item.comments}</span>
        </div>
      )}
      <div className="orderDetails">
        <div className="orderDetailsLeft">
          <h2>Dane osobowe:</h2>
          <span>
            <PersonIcon className="icon" /> {item.firstName} {item.lastName}
          </span>
          <span>
            <HomeIcon className="icon" />
            {item.street &&
              item.street + " " + item.homeNumber + ", " + item.city}
          </span>
          <span>
            <LocalPhoneIcon className="icon" /> {item.phone}
          </span>
          <span>
            <NotificationsActiveIcon className="icon" />
            {handleStatus(item)}
          </span>
        </div>
        <div className="orderDetailsRight">
          <h2>Szczegóły:</h2>
          <span>
            <CreditCardIcon className="icon" /> {item.totalPrice?.toFixed(2)}zł
          </span>
          <span>
            <PriceCheckIcon className="icon" />{" "}
            {item.paymentMethod && handleMethod(item)}
          </span>
          <span>
            <AccessTimeIcon className="icon" />
            {item.deliveryTime === "jak najszybciej"
              ? "SZYBKO"
              : item.deliveryTime}
          </span>
          <span>
            <DeliveryDiningIcon className="icon" />
            {item.delivery === true ? "dostawa" : "odbiór osobisty"}{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
