import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { resetCart } from "../../redux/cartReducer";
import Card from "../card/Card";
import New from "../new/New";
import WorkdayInfo from "../workdayInfo/WorkdayInfo";
import "./workday.scss";

const Workday = () => {
  const [openNew, setOpenNew] = useState(false);
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/employees`);

  const dispatch = useDispatch();

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
          <div className="workdayDataTop">
            <div className="workdayDataTopLeft">
              <WorkdayInfo
                title={"Łączny utarg"}
                details={dayTotal?.toFixed(2) + "zł"}
              />
              <WorkdayInfo
                title={"Łącznie gotówka"}
                details={gotowka?.toFixed(2) + "zł"}
              />
              <WorkdayInfo
                title={"Łącznie karta"}
                details={terminal?.toFixed(2) + "zł"}
              />
              <WorkdayInfo
                title={"Łącznie online"}
                details={online?.toFixed(2) + "zł"}
              />
            </div>
            <div className="workdayDataTopRight">
              <WorkdayInfo
                title={"Liczba sztuk"}
                details={quantityTotal - dodatkiTotal}
              />
              <WorkdayInfo title={"Pizza"} details={pizzaTotal} />
              <WorkdayInfo title={"Burgery"} details={burgeryTotal} />
              <WorkdayInfo title={"Zapiekanki"} details={zapiekankiTotal} />
              <WorkdayInfo title={"Sałatki"} details={salatkiTotal} />
              <WorkdayInfo title={"Dodatki"} details={dodatkiTotal} />
            </div>
          </div>

          {/* <p>Łączny utarg: {dayTotal?.toFixed(2)}zł</p>
          <p>Łącznie gotówka: {gotowka?.toFixed(2)}zł</p>
          <p>Łącznie karta: {terminal?.toFixed(2)}zł</p>
          <p>Łącznie online: {online?.toFixed(2)}zł</p>
          <p>Liczba sztuk: {quantityTotal - dodatkiTotal}</p>
          <p>Pizza: {pizzaTotal}</p>
          <p>Burgery: {burgeryTotal}</p>
          <p>Zapiekanki: {zapiekankiTotal}</p>
          <p>Sałatki: {salatkiTotal}</p>
          <p>Dodatki: {dodatkiTotal}</p> */}
          <div className="workdayDataBottom">
            {data.map((employee) => {
              const employeeSum = list
                ?.filter(
                  ({ paymentReciver, paymentMethod }) =>
                    paymentReciver === employee._id && paymentMethod === "cash"
                )
                .reduce((sum, record) => sum + record.totalPrice, 0);
              return (
                employeeSum > 0 && (
                  // <p key={employee._id}>
                  //   {employee.firstName} {employee.lastName}:{" "}
                  //   {employeeSum.toFixed(2)}zł
                  // </p>
                  <WorkdayInfo
                    key={employee._id}
                    title={employee.firstName + " " + employee.lastName}
                    details={employeeSum.toFixed(2) + "zł"}
                  />
                )
              );
            })}
          </div>
        </div>

        <button
          className="addOrderButton"
          onClick={() => {
            dispatch(resetCart());
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
