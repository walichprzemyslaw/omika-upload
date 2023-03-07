import "./editIngredient.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const EditIngredient = ({ inputs, title }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/ingredients/find/${id}`);
  const [info, setInfo] = useState({});
  // const [category, setCategory] = useState("");
  const [normalPrice, setNormalPrice] = useState();
  const [largePrice, setLargePrice] = useState();

  // let price;
  // category === "pizza"
  //   ? (price = [parseFloat(normalPrice), parseFloat(largePrice)])
  //   : (price = [parseFloat(normalPrice)]);

  useEffect(() => {
    setInfo(data);
    // setCategory(data.category);
  }, [data]);

  console.log(info);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log({ ...info });
    try {
      await axios.put(`/ingredients/${id}`, { ...info });
      navigate("/ingredients/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            {loading ? (
              "loading"
            ) : (
              <form>
                {inputs.map((input) => {
                  return (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        onChange={handleChange}
                        type={input.type}
                        defaultValue={data[input.id]}
                        id={input.id}
                      />
                    </div>
                  );
                })}
                <div className="formInput">
                  <label htmlFor="category">Kategoria</label>
                  <select
                    id="category"
                    onChange={handleChange}
                    value={info?.category}
                  >
                    <option value="pizza">Pizza</option>
                    <option value="burgery">Burgery</option>
                    <option value="zapiekanki">Zapiekanki</option>
                    <option value="sałatki">Sałatki</option>
                    <option value="sosy">Sosy</option>
                    <option value="napoje">Napoje</option>
                  </select>
                </div>
                {info?.category === "pizza" && (
                  <>
                    <div className="formInput">
                      <label htmlFor="priceMedium">Cena 30cm</label>
                      <input
                        onChange={(e) =>
                          setInfo((prev) => ({
                            ...prev,
                            price: [parseFloat(e.target.value), info.price[1]],
                          }))
                        }
                        defaultValue={info?.price[0]}
                        type="number"
                        placeholder="cena 30cm"
                        id="priceMedium"
                      />
                    </div>
                    <div className="formInput">
                      <label htmlFor="priceLarge">Cena 40cm</label>
                      <input
                        onChange={(e) =>
                          setInfo((prev) => ({
                            ...prev,
                            price: [info.price[0], parseFloat(e.target.value)],
                          }))
                        }
                        defaultValue={info?.price[1]}
                        type="number"
                        placeholder="cena 40cm"
                        id="priceLarge"
                      />
                    </div>
                  </>
                )}
                {(info?.category === "burgery" ||
                  info?.category === "zapiekanki" ||
                  info?.category === "sałatki") && (
                  <div className="formInput">
                    <label htmlFor="priceMedium">Cena</label>
                    <input
                      onChange={(e) =>
                        setInfo((prev) => ({
                          ...prev,
                          price: [parseFloat(e.target.value)],
                        }))
                      }
                      defaultValue={info?.price[0]}
                      type="number"
                      placeholder="cena"
                      id="priceMedium"
                    />
                  </div>
                )}
                <div className="formInput">
                  <label>Dostępny</label>
                  <select
                    id="isAvailable"
                    onChange={handleChange}
                    value={info?.isAvailable}
                  >
                    <option value={false}>Nie</option>
                    <option value={true}>Tak</option>
                  </select>
                </div>
                {info?.category === "napoje" && (
                  <>
                    <div className="formInput">
                      <label>0,33L</label>
                      <select
                        id="isAvailableSmall"
                        onChange={handleChange}
                        defaultValue={info.isAvailableSmall}
                      >
                        <option value={false}>Nie</option>
                        <option value={true}>Tak</option>
                      </select>
                    </div>
                    <div className="formInput">
                      <label>0,5L</label>
                      <select
                        id="isAvailableMedium"
                        onChange={handleChange}
                        defaultValue={info.isAvailableMedium}
                      >
                        <option value={false}>Nie</option>
                        <option value={true}>Tak</option>
                      </select>
                    </div>
                    <div className="formInput">
                      <label>0,85L</label>
                      <select
                        id="isAvailableLarge"
                        onChange={handleChange}
                        defaultValue={info.isAvailableLarge}
                      >
                        <option value={false}>Nie</option>
                        <option value={true}>Tak</option>
                      </select>
                    </div>
                  </>
                )}

                {/* ZROBIĆ EDYCJĘ CEN!!!! */}
                <button onClick={handleClick}>Wyślij</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditIngredient;
