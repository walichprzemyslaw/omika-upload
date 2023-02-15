import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../card/Card";
import New from "../new/New";
import "./workday.scss";

const Workday = () => {
  // const orders = [
  //   {
  //     id: 1,
  //     customerId: "Customer1",
  //     orderedProducts: ["salami", "vesuvio"],
  //     totalPrice: 89.9,
  //     status: "active",
  //     paymentMethod: "cash",
  //     paymentReciver: "Employee1",
  //     delivery: true,
  //     deliveryAddress: "ul. Poznańska 190",
  //     deliveryTown: "Kościan",
  //     deliveryZone: "A",
  //     createdAt: "data",
  //   },
  //   {
  //     id: 2,
  //     customerId: "Customer1",
  //     orderedProducts: ["salami", "margherita"],
  //     totalPrice: 82.9,
  //     status: "active",
  //     paymentMethod: "online",
  //     paymentReciver: "Employee1",
  //     delivery: true,
  //     deliveryAddress: "ul. Poznańska 190",
  //     deliveryTown: "Kościan",
  //     deliveryZone: "A",
  //     createdAt: "data",
  //   },
  //   {
  //     id: 3,
  //     customerId: "Customer1",
  //     orderedProducts: ["funghi", "vesuvio"],
  //     totalPrice: 79.9,
  //     status: "passive",
  //     paymentMethod: "cash",
  //     paymentReciver: "Employee1",
  //     delivery: true,
  //     deliveryAddress: "ul. Poznańska 190",
  //     deliveryTown: "Kościan",
  //     deliveryZone: "A",
  //     createdAt: "data",
  //   },
  //   {
  //     id: 4,
  //     customerId: "Customer1",
  //     orderedProducts: ["salami"],
  //     totalPrice: 34.95,
  //     status: "passive",
  //     paymentMethod: "cash",
  //     paymentReciver: "Employee1",
  //     delivery: true,
  //     deliveryAddress: "ul. Poznańska 190",
  //     deliveryTown: "Kościan",
  //     deliveryZone: "A",
  //     createdAt: "data",
  //   },
  // ];

  const [openNew, setOpenNew] = useState(false);
  const [list, setList] = useState();

  // przerobić przy użyciu useFetch? wykorzystać reFetch
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/orders/today");
      const json = await response.json();
      setList(json);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="workday">
      <div className="workdayLeft">
        <button
          className="addOrderButton"
          onClick={() => {
            setOpenNew(true);
          }}
        >
          DODAJ
        </button>
        <div className="activeOrders">
          {list?.map((order, index) => (
            <Card order={order} key={order._id} index={index} />
          ))}
        </div>
      </div>
      {/* <div className="workdayRight">
        <div className="workdayStats">Liczba sztuk: 67 Utarg: 1240,70zł</div>
        <div className="doneOrders">
          {data.map((order) => (
            <div className="orderItem" key={order.id}>
              <p className="orderProducts">{order.orderedProducts}</p>
              <p className="orderAddress">{order.deliveryAddress}</p>
              <p className="orderPhone">{order.customerId}</p>
              <p className="orderPrice">{order.totalPrice}</p>
              <p className="orderStatus">{order.status}</p>
            </div>
          ))}
        </div>
      </div> */}
      {openNew && <New closeNew={setOpenNew} />}
    </div>
  );
};

export default Workday;
