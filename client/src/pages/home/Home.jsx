import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FacebookIcon from "@mui/icons-material/Facebook";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1 className="homeTitle">PIZZERIA test OMIKA</h1>
        <div className="homeWrapper">
          <div className="left">
            <h1>Jak złożyć zamówienie?</h1>
            <p>Złóż zamówienie online i czekaj na naszego dostawcę</p>
            <div className="homeCard">
              <TouchAppIcon className="icon" />
              <h1>Dodaj do koszyka</h1>
              <p>
                Wybierz interesujące Cię produkty z naszego menu i dodaj do
                koszyka
              </p>
            </div>
            <div className="homeCard">
              <PriceCheckIcon className="icon" />
              <h1>Uzupełnij dane dostawy</h1>
              <p>
                Wskaż adres pod który mamy dostarczyć zamówienie i zapłać online
                lub wybierz płatność przy odbiorze
              </p>
            </div>
            <div className="homeCard">
              <DirectionsCarIcon className="icon" />
              <h1>Czekaj na realizację</h1>
              <p>
                My zajmiemy się resztą byś jak najszybciej mógł otrzymać swoje
                zamówienie
              </p>
            </div>
          </div>
          <div className="right">
            <img
              src="https://raw.githubusercontent.com/codingwithmuhib/React-food-delivery-app/main/src/assets/images/hero.png"
              alt="hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
