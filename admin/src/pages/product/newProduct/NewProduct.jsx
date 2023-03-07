import "./newProduct.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

const NewProduct = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({isAvailable:false});
  const [category, setCategory] = useState("pizza");
  const [normalPrice, setNormalPrice] = useState();
  const [largePrice, setLargePrice] = useState();
  const [ingredients, setIngredients] = useState([]);

  // const { data, loading, error } = useFetch(`/ingredients`);

  const data = [
    "sos pomidorowy",
    "sos śmietanowy",
    "sos majonezowy",
    "mix sałat",
    "cebula czerwona",
    "pomidor",
    "ogórek",
    "mięso wołowe",
    "podwójne mięso wołowe",
    "ser cheddar",
    "podwójny ser cheddar",
    "chicken nuggetsy",
    "podwójny boczek",
    "ser",
    "podwójny ser",
    "ser parmezan",
    "ser błękitny lazur",
    "ser camembert",
    "ser sałatkowy",
    "szynka",
    "salami",
    "kurczak",
    "kebab",
    "boczek",
    "kabanos",
    "kiełbasa",
    "chorizo",
    "szynka parmeńska",
    "pieczarki",
    "papryka",
    "kukurydza",
    "czosnek",
    "ananas",
    "pomidor koktajlowy",
    "kapusta pekińska",
    "rukola",
    "cebula biała",
    "cebula prażona",
    "brokuły",
    "oliwki",
    "tortilla chips",
    "jalapeño",
    "słonecznik",
    "tabasco",
    "sos barbecue",
    "sos serowy-chili",
    "sos sriracha"
  ];

  const navigate = useNavigate();

  let price;
  category === "pizza" ? price = [parseFloat(normalPrice), parseFloat(largePrice)] : price = [parseFloat(normalPrice)]
  // {largePrice ? price = [parseFloat(normalPrice), parseFloat(largePrice)] : price = [parseFloat(normalPrice)] }
  // const price = [parseFloat(normalPrice), parseFloat(largePrice)];

  const handleAdd = (e, addon) => {
    const checked = e.target.checked;
    if (checked) {
      setIngredients((prev) => [...prev, e.target.id]);
    } else {
      setIngredients(ingredients.filter((item) => item !== addon));
    }
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleSelect = (e) => {
  //   const value = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setIngredients(value);
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqknlkpku/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        ...info,
        category,
        price,
        ingredients,
        img: url,
      };
      console.log(newProduct);
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
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Zdjęcie: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
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
                  <option value="dodatki">Dodatki</option>
                </select>
              </div>
              {category === "pizza" ? (
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
              ) : (
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
              {/* <div className="formInput">
                <label htmlFor="ingredients">Składniki</label>
                <select id="ingredients" multiple onChange={handleSelect}>
                  {data.map((ingredient) => (
                    <option key={ingredient} value={ingredient}>{ingredient}</option>
                  ))}
                </select>
              </div> */}
              <div className="options">
                <h4>Składniki:</h4>
                <ul className="ingredients">
                  {data.map((addon) => (
                    <li key={addon}>
                      <input
                        className="addons"
                        type="checkbox"
                        id={addon}
                        value={addon}
                        onChange={(e) => handleAdd(e, addon)}
                      />
                      <label htmlFor={addon}>{addon}</label>
                    </li>
                  ))}
                </ul>
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
