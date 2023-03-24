import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { resetCart } from "../../redux/cartReducer";
import Card from "../card/Card";
import New from "../new/New";
import WorkdayInfo from "../workdayInfo/WorkdayInfo";
import "./workday.scss";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import PersonIcon from "@mui/icons-material/Person";

const Workday = () => {
  const [openNew, setOpenNew] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [list, setList] = useState();
  const [pendingList, setPendingList] = useState();
  const [preparationList, setPreparationList] = useState();
  const [readyList, setReadyList] = useState();
  const [deliveredList, setDeliveredList] = useState();
  const [cancelledList, setCancelledList] = useState();
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
      const response = await fetch(`/orders/today/`);
      const json = await response.json();
      setList(json);
      const responsePending = await fetch(`/orders/today/${"pending"}`);
      const jsonPending = await responsePending.json();
      setPendingList(jsonPending);
      const responsePreparation = await fetch(`/orders/today/${"preparation"}`);
      const jsonPreparation = await responsePreparation.json();
      setPreparationList(jsonPreparation);
      const responseReady = await fetch(`/orders/today/${"ready"}`);
      const jsonReady = await responseReady.json();
      setReadyList(jsonReady);
      const responseDelivered = await fetch(`/orders/today/${"delivered"}`);
      const jsonDelivered = await responseDelivered.json();
      setDeliveredList(jsonDelivered); 
      const responseCancelled = await fetch(`/orders/today/${"cancelled"}`);
      const jsonCancelled = await responseCancelled.json();
      setCancelledList(jsonCancelled);

    };

    fetchData();
    const intervalId = setInterval(fetchData, 3 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="workday">
      <div className="workdayTop">
        <div className="workdayData">
          <div className="workdayDataTop">
            <WorkdayInfo
              title={"Łączny utarg"}
              details={dayTotal?.toFixed(2) + "zł"}
              icon={<CurrencyExchangeIcon className="icon" />}
            />
            <WorkdayInfo
              title={"Łącznie gotówka"}
              details={gotowka?.toFixed(2) + "zł"}
              icon={<AttachMoneyIcon className="icon" />}
            />
            <WorkdayInfo
              title={"Łącznie karta"}
              details={terminal?.toFixed(2) + "zł"}
              icon={<CreditScoreIcon className="icon" />}
            />
            <WorkdayInfo
              title={"Łącznie online"}
              details={online?.toFixed(2) + "zł"}
              icon={<PriceCheckIcon className="icon" />}
            />
            <WorkdayInfo
              title={"Liczba sztuk"}
              details={quantityTotal - dodatkiTotal}
              icon={<LocalPizzaIcon className="icon" />}
            />
            {/* <WorkdayInfo
                title={"Pizza"}
                details={pizzaTotal}
                icon={<LocalPizzaIcon className="icon" />}
              />
               <WorkdayInfo
                title={"Burgery"}
                details={burgeryTotal}
                icon={<LocalPizzaIcon className="icon" />}
              />
              <WorkdayInfo
                title={"Zapiekanki"}
                details={zapiekankiTotal}
                icon={<LocalPizzaIcon className="icon" />}
              />
              <WorkdayInfo
                title={"Sałatki"}
                details={salatkiTotal}
                icon={<LocalPizzaIcon className="icon" />}
              />
              <WorkdayInfo
                title={"Dodatki"}
                details={dodatkiTotal}
                icon={<LocalPizzaIcon className="icon" />}
              /> */}
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
                    icon={<PersonIcon className="icon" />}
                  />
                )
              );
            })}
          </div>
          <div className="showProducts">
            <button onClick={() => setShowProducts(!showProducts)}>
              {showProducts ? "UKRYJ PRODUKTY" : "POKAŻ PRODUKTY"}
            </button>
          </div>
        </div>

        <button
          className="addOrderButton"
          onClick={() => {
            dispatch(resetCart());
            setOpenNew(true);
          }}
        >
          DODAJ ZAMÓWIENIE
        </button>
      </div>
      <div className="workdayBottom">
       {pendingList?.length > 0 && <div className="activeOrders">
          <div className="title">Czekające na potwierdzenie:</div>
          <div className="list">
            {pendingList?.map((order, index) => (
              <Card
                order={order}
                key={order._id}
                index={index}
                showProducts={showProducts}
              />
            ))}
          </div>
        </div>}
      {preparationList?.length > 0 &&  <div className="activeOrders">
          <div className="title">Kuchnia:</div>
          <div className="list">
            {preparationList?.map((order, index) => (
              <Card
                order={order}
                key={order._id}
                index={index}
                showProducts={showProducts}
              />
            ))}
          </div>
        </div>}
       {readyList?.length > 0 && <div className="activeOrders">
          <div className="title">Dostawa:</div>
          <div className="list">
            {readyList?.map((order, index) => (
              <Card
                order={order}
                key={order._id}
                index={index}
                showProducts={showProducts}
              />
            ))}
          </div>
        </div>}
        {deliveredList?.length > 0 && <div className="activeOrders">
          <div className="title">Dostarczone:</div>
          <div className="list">
            {deliveredList?.map((order, index) => (
              <Card
                order={order}
                key={order._id}
                index={index}
                showProducts={showProducts}
              />
            ))}
          </div>
        </div>}
        {cancelledList?.length > 0 && <div className="activeOrders">
          <div className="title">Odrzucone:</div>
          <div className="list">
            {cancelledList?.map((order, index) => (
              <Card
                order={order}
                key={order._id}
                index={index}
                showProducts={showProducts}
              />
            ))}
          </div>
        </div>}
      </div>
      {openNew && <New closeNew={setOpenNew} />}
    </div>
  );
};

export default Workday;
