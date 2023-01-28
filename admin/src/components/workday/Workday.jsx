import "./workday.scss";

const Workday = () => {
  const orders = [
    {
      id: 1,
      customerId: "Customer1",
      orderedProducts: ["salami", "vesuvio"],
      totalPrice: 89.9,
      status: "active",
      paymentMethod: "cash",
      paymentReciver: "Employee1",
      delivery: true,
      deliveryAddress: "ul. Poznańska 190",
      deliveryTown: "Kościan",
      deliveryZone: "A",
      createdAt: "data",
    },
    {
      id: 2,
      customerId: "Customer1",
      orderedProducts: ["salami", "margherita"],
      totalPrice: 82.9,
      status: "active",
      paymentMethod: "online",
      paymentReciver: "Employee1",
      delivery: true,
      deliveryAddress: "ul. Poznańska 190",
      deliveryTown: "Kościan",
      deliveryZone: "A",
      createdAt: "data",
    },
    {
      id: 3,
      customerId: "Customer1",
      orderedProducts: ["funghi", "vesuvio"],
      totalPrice: 79.9,
      status: "passive",
      paymentMethod: "cash",
      paymentReciver: "Employee1",
      delivery: true,
      deliveryAddress: "ul. Poznańska 190",
      deliveryTown: "Kościan",
      deliveryZone: "A",
      createdAt: "data",
    },
    {
      id: 4,
      customerId: "Customer1",
      orderedProducts: ["salami"],
      totalPrice: 34.95,
      status: "passive",
      paymentMethod: "cash",
      paymentReciver: "Employee1",
      delivery: true,
      deliveryAddress: "ul. Poznańska 190",
      deliveryTown: "Kościan",
      deliveryZone: "A",
      createdAt: "data",
    },
  ];

  return (
    <div className="workday">
      <div className="workdayLeft">
        <button className="addOrderButton">Add Order</button>
        <div className="activeOrders">
          {orders.map((order) => (
            <div className="orderItem" key={order.id}>
              <p className="orderProducts">{order.orderedProducts}</p>
              <p className="orderAddress">{order.deliveryAddress}</p>
              <p className="orderPhone">{order.customerId}</p>
              <p className="orderPrice">{order.totalPrice}</p>
              <p className="orderStatus">{order.status}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="workdayRight">
        <div className="workdayStats">Liczba sztuk: 67 Utarg: 1240,70zł</div>
        <div className="doneOrders">
          {orders.map((order) => (
            <div className="orderItem" key={order.id}>
              <p className="orderProducts">{order.orderedProducts}</p>
              <p className="orderAddress">{order.deliveryAddress}</p>
              <p className="orderPhone">{order.customerId}</p>
              <p className="orderPrice">{order.totalPrice}</p>
              <p className="orderStatus">{order.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workday;
