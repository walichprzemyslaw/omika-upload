import "./newIngredient.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewIngredient = ({ inputs, title }) => {
  const [info, setInfo] = useState({
    isAvailable: false,
    isAvailableSmall: false,
    isAvailableMedium: false,
    isAvailableLarge: false,
  });
  const [category, setCategory] = useState("pizza");
  const [normalPrice, setNormalPrice] = useState();
  const [largePrice, setLargePrice] = useState();
 
  let price;
  category === "pizza"
    ? (price = [parseFloat(normalPrice), parseFloat(largePrice)])
    : (price = [parseFloat(normalPrice)]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const newIngredient = {
      ...info,
      category,
      price,
    };
    console.log(newIngredient);
    try {
      await axios.post("/ingredients", newIngredient);
      navigate("/ingredients/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <div className="formInput">
                <label htmlFor="category">Kategoria</label>
                <select
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="pizza">Pizza</option>
                  <option value="burgery">Burgery</option>
                  <option value="zapiekanki">Zapiekanki</option>
                  <option value="sałatki">Sałatki</option>
                  <option value="sosy">Sosy</option>
                  <option value="napoje">Napoje</option>
                </select>
              </div>
              {category === "pizza" && (
                <>
                  <div className="formInput">
                    <label htmlFor="priceMedium">Cena 30cm</label>
                    <input
                      onChange={(e) => setNormalPrice(e.target.value)}
                      type="number"
                      placeholder="cena 30cm"
                      id="priceMedium"
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="priceLarge">Cena 40cm</label>
                    <input
                      onChange={(e) => setLargePrice(e.target.value)}
                      type="number"
                      placeholder="cena 40cm"
                      id="priceLarge"
                    />
                  </div>
                </>
              )}
              {category !== "sosy" &&
                category !== "napoje" &&
                category !== "pizza" && (
                  <div className="formInput">
                    <label htmlFor="price">Cena</label>
                    <input
                      onChange={(e) => setNormalPrice(e.target.value)}
                      type="number"
                      placeholder="cena"
                      id="price"
                    />
                  </div>
                )}
              <div className="formInput">
                <label>Dostępny</label>
                <select id="isAvailable" onChange={handleChange}>
                  <option value={false}>Nie</option>
                  <option value={true}>Tak</option>
                </select>
              </div>
              {category === "napoje" && (
                <>
                  <div className="formInput">
                    <label>0,33L</label>
                    <select id="isAvailableSmall" onChange={handleChange}>
                      <option value={false}>Nie</option>
                      <option value={true}>Tak</option>
                    </select>
                  </div>
                  <div className="formInput">
                    <label>0,5L</label>
                    <select id="isAvailableMedium" onChange={handleChange}>
                      <option value={false}>Nie</option>
                      <option value={true}>Tak</option>
                    </select>
                  </div>
                  <div className="formInput">
                    <label>0,85L</label>
                    <select id="isAvailableLarge" onChange={handleChange}>
                      <option value={false}>Nie</option>
                      <option value={true}>Tak</option>
                    </select>
                  </div>
                </>
              )}
              {/* <div className="formInput">
                  <label htmlFor="price">Cena</label>
                  <input
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    type="number"
                    placeholder="cena"
                    id="price"
                  />
                </div> */}
              <button onClick={handleClick}>Wyślij</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewIngredient;
