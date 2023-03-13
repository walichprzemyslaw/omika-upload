import "./orderDetails.scss";

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
            {item.firstName} {item.lastName}
          </span>
          <span>
            {item.street} {item.homeNumber}, {item.city}
          </span>
          <span>Numer telefonu: {item.phone}</span>
        </div>
        <div className="orderDetailsRight">
          <h2>Szczegóły:</h2>
          <span>Łącznie: {item.totalPrice.toFixed(2)}zł</span>
          <span>
            Sposób zapłaty: {item.paymentMethod && handleMethod(item)}
          </span>
          <span>
            Przybliżony czas {item.delivery ? "dostawy" : "odbioru"}:{" "}
            {item.deliveryTime}
          </span>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
