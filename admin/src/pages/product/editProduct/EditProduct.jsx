import "./editProduct.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const EditProduct = ({ item, closeEditor }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState(item);
  const [normalPrice, setNormalPrice] = useState(item.price[0]);
  const [largePrice, setLargePrice] = useState(item.price[1]);
  const [xLargePrice, setXLargePrice] = useState(item.price[2]);
  const [ingredients, setIngredients] = useState([...item.ingredients]);
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL, withCredentials: true})


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
    "sos sriracha",
  ];

  console.log(item);
  console.log(ingredients);

  const navigate = useNavigate();

  let price;
  info.category === "pizza"
    ? (price = [parseFloat(normalPrice), parseFloat(largePrice)])
    : (price = [parseFloat(normalPrice)]);

  info.name === "nuggetsy" || info.name === "sosy"
    ? (price = [parseFloat(normalPrice), parseFloat(largePrice)])
    : (price = [parseFloat(normalPrice)]);

  info.name === "napoje" &&
    (price = [
      parseFloat(normalPrice),
      parseFloat(largePrice),
      parseFloat(xLargePrice),
    ]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAdd = (e, addon) => {
    const checked = e.target.checked;
    if (checked) {
      setIngredients((prev) => [...prev, e.target.id]);
    } else {
      setIngredients(ingredients.filter((item) => item !== addon));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      let url = item.img;
      try {
        const uploadRes = await axiosInstance.post(
          "https://api.cloudinary.com/v1_1/dqknlkpku/image/upload",
          data
        );
        url = uploadRes.data.url;
      } catch (error) {
        console.log(error);
      }

      const editedProduct = {
        ...info,
        price,
        ingredients,
        img: url,
      };
      console.log(editedProduct);
      await axiosInstance.put(`/products/${item._id}`, editedProduct);
      navigate("/products/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editProduct">
      <div className="editProductContainer">
        <div className="top">
          <h1>{item.name}</h1>
          <button className="closeButton" onClick={() => closeEditor(false)}>
            &times;
          </button>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : item.img} alt="" />
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
              <div className="formInput">
                <label htmlFor="name">Nazwa</label>
                <input
                  onChange={handleChange}
                  type="text"
                  defaultValue={item.name}
                  id="name"
                />
              </div>
              <div className="formInput">
                <label htmlFor="desc">Opis</label>
                <input
                  onChange={handleChange}
                  type="text"
                  defaultValue={item.desc}
                  id="desc"
                />
              </div>
              <div className="formInput">
                <label htmlFor="category">Kategoria</label>
                <select
                  id="category"
                  onChange={handleChange}
                  defaultValue={item.category}
                >
                  <option value="pizza">Pizza</option>
                  <option value="burgery">Burgery</option>
                  <option value="zapiekanki">Zapiekanki</option>
                  <option value="sałatki">Sałatki</option>
                  <option value="dodatki">Dodatki</option>
                  <option value="napoje">Napoje</option>
                </select>
              </div>
              {info.category === "pizza" ||
              info.name === "sosy" ||
              info.name === "nuggetsy" ||
              info.name === "napoje" ? (
                <>
                  <div className="formInput">
                    <label htmlFor="priceMedium">Cena niższa</label>
                    <input
                      onChange={(e) => setNormalPrice(e.target.value)}
                      type="number"
                      defaultValue={item.price[0]}
                      id="priceMedium"
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="priceLarge">Cena wyższa</label>
                    <input
                      onChange={(e) => setLargePrice(e.target.value)}
                      type="number"
                      defaultValue={item.price[1]}
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
                    defaultValue={item.price[0]}
                    id="price"
                  />
                </div>
              )}
              {info.name === "napoje" && (
                <div className="formInput">
                  <label htmlFor="priceXLarge">Cena najwyższa</label>
                  <input
                    onChange={(e) => setXLargePrice(e.target.value)}
                    type="number"
                    defaultValue={item.price[2]}
                    id="priceXLarge"
                  />
                </div>
              )}
              <div className="formInput">
                <label>Dostępny</label>
                <select
                  id="isAvailable"
                  onChange={handleChange}
                  defaultValue={item.isAvailable}
                >
                  <option value={true}>Tak</option>
                  <option value={false}>Nie</option>
                </select>
              </div>
              {info.category !== "dodatki" && (
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
                          defaultChecked={
                            info.ingredients.includes(addon) ? true : false
                          }
                          onChange={(e) => handleAdd(e, addon)}
                        />
                        <label htmlFor={addon}>{addon}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={handleClick}>Wyślij</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
