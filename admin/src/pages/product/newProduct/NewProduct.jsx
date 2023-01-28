import "./newProduct.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [category, setCategory] = useState("pizza");
  const [normalPrice, setNormalPrice] = useState();
  const [largePrice, setLargePrice] = useState();
  const [ingredients, setIngredients] = useState();


  const navigate = useNavigate();

  const price = [normalPrice, largePrice];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setIngredients(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...info,
        category,
        price,
        ingredients
      };
      await axios.post("/products", newProduct);
      navigate("/products/");
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
                <select id="category" onChange={(e) => setCategory(e.target.value)}>
                <option value="pizza">Pizza</option>
                <option value="burger">Burger</option>
                <option value="drink">Drink</option>    
                </select>
              </div>
              {category === "pizza" ? (<><div className="formInput">
                <label htmlFor="priceMedium">Cena 30cm</label>
                <input onChange={(e) => setNormalPrice(e.target.value)} type="number" placeholder="cena 30cm" id="priceMedium"/>
              </div><div className="formInput">
                <label htmlFor="priceLarge">Cena 40cm</label>
                <input onChange={(e) => setLargePrice(e.target.value)} type="number" placeholder="cena 40cm" id="priceLarge"/>
              </div></>) : <div className="formInput">
                <label htmlFor="price">Cena</label>
                <input onChange={(e) => setNormalPrice(e.target.value)} type="number" placeholder="cena" id="price"/>
              </div>}
              <div className="formInput">
                <label htmlFor="ingredients">Składniki</label>
                <select id="ingredients" multiple onChange={handleSelect}>
                  <option value="ser">Ser</option>
                  <option value="szynka">Szynka</option>
                  <option value="pieczarki">Pieczarki</option>
                </select>
              </div>
              <div className="formInput">
                <label>Dostępny</label>
                <select id="isAvailable" onChange={handleChange}>
                  <option value={false}>Nie</option>
                  <option value={true}>Tak</option>
                </select>
              </div>
              <button onClick={handleClick}>Wyślij</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
