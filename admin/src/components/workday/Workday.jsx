import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../card/Card";
import New from "../new/New";
import "./workday.scss";

const Workday = () => {
  const [openNew, setOpenNew] = useState(false);
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/employees`);

  const dayTotal = list?.reduce(
    (total, currentValue) => (total = total + currentValue.totalPrice),
    0
  );

  const quantityTotal = list?.reduce(
    (total, currentValue) =>
      (total =
        total +
        currentValue.products?.reduce(
          (total2, currentValue2) => (total2 = total2 + currentValue2.quantity),
          0
        )),
    0
  );

  const listPizza = list?.map((order) =>
    order.products
      .filter(({ category }) => category === "pizza")
      .reduce((sum, record) => sum + record.quantity, 0)
  );

  const listBurgery = list?.map((order) =>
    order.products
      .filter(({ category }) => category === "burgery")
      .reduce((sum, record) => sum + record.quantity, 0)
  );

  const listZapiekanki = list?.map((order) =>
    order.products
      .filter(({ category }) => category === "zapiekanki")
      .reduce((sum, record) => sum + record.quantity, 0)
  );

  const listSalatki = list?.map((order) =>
    order.products
      .filter(({ category }) => category === "sałatki")
      .reduce((sum, record) => sum + record.quantity, 0)
  );

  const listDodatki = list?.map((order) =>
    order.products
      .filter(({ category }) => category === "dodatki")
      .reduce((sum, record) => sum + record.quantity, 0)
  );

  const gotowka = list
    ?.filter(({ paymentMethod }) => paymentMethod === "cash")
    .reduce((sum, record) => sum + record.totalPrice, 0);

  const terminal = list
    ?.filter(({ paymentMethod }) => paymentMethod === "terminal")
    .reduce((sum, record) => sum + record.totalPrice, 0);

  const online = list
    ?.filter(({ paymentMethod }) => paymentMethod === "online")
    .reduce((sum, record) => sum + record.totalPrice, 0);

  const pizzaTotal = listPizza?.reduce((sum, a) => sum + a, 0);
  const burgeryTotal = listBurgery?.reduce((sum, a) => sum + a, 0);
  const zapiekankiTotal = listZapiekanki?.reduce((sum, a) => sum + a, 0);
  const salatkiTotal = listSalatki?.reduce((sum, a) => sum + a, 0);
  const dodatkiTotal = listDodatki?.reduce((sum, a) => sum + a, 0);

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
        <div className="workdayData">
          <p>Łączny utarg: {dayTotal?.toFixed(2)}zł</p>
          <p>Łącznie gotówka: {gotowka?.toFixed(2)}zł</p>
          <p>Łącznie karta: {terminal?.toFixed(2)}zł</p>
          <p>Łącznie online: {online?.toFixed(2)}zł</p>
          <p>Liczba sztuk: {quantityTotal - dodatkiTotal}</p>
          <p>Pizza: {pizzaTotal}</p>
          <p>Burgery: {burgeryTotal}</p>
          <p>Zapiekanki: {zapiekankiTotal}</p>
          <p>Sałatki: {salatkiTotal}</p>
          <p>Dodatki: {dodatkiTotal}</p>
          {data.map((employee) => {
            const employeeSum = list
              ?.filter(
                ({ paymentReciver, paymentMethod }) =>
                  paymentReciver === employee._id && paymentMethod === "cash"
              )
              .reduce((sum, record) => sum + record.totalPrice, 0);
            return (
              employeeSum > 0 && (
                <p key={employee._id}>
                  {employee.firstName} {employee.lastName}:{" "}
                  {employeeSum.toFixed(2)}zł
                </p>
              )
            );
          })}
        </div>

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
      {openNew && <New closeNew={setOpenNew} />}
    </div>
  );
};

export default Workday;
