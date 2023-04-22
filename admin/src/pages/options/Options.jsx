import "./options.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Toggle } from "../../components/toggle/Toggle";
import useFetch from "../../hooks/useFetch";

const Options = () => {
  const {
    data: pizzaData,
    loading,
    error,
  } = useFetch(`/products/category/pizza`);
  const { data: burgerData } = useFetch(`/products/category/burgery`);
  const { data: zapiekankiData } = useFetch(`/products/category/zapiekanki`);
  const { data: salatkiData } = useFetch(`/products/category/sałatki`);
  const { data: dodatkiData } = useFetch(`/products/category/dodatki`);
  const { data: sosData } = useFetch(`/ingredients/category/sosy/a`);
  const { data: napojeData } = useFetch(`/ingredients/category/napoje/a`);
  const { data: pizzaIngredientData } = useFetch(
    `/ingredients/category/pizza/a`
  );
  const { data: burgerIngredientData } = useFetch(
    `/ingredients/category/burgery/a`
  );
  const { data: zapiekankaIngredientData } = useFetch(
    `/ingredients/category/zapiekanki/a`
  );
  const { data: salatkiIngredientData } = useFetch(
    `/ingredients/category/sałatki/a`
  );

  console.log(sosData);

  return (
    <div className="options">
      <Sidebar />
      <div className="optionsContainer">
        <Navbar />
        <div className="optionsBox">
          <h1>PIZZA</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : pizzaData.map((product) => (
                  <Toggle
                    category={"products"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          <h1>BURGERY</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : burgerData.map((product) => (
                  <Toggle
                    category={"products"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          <h1>ZAPIEKANKI</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : zapiekankiData.map((product) => (
                  <Toggle
                    category={"products"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          <h1>SAŁATKI</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : salatkiData.map((product) => (
                  <Toggle
                    category={"products"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          <h1>DODATKI</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : dodatkiData.map((product) => (
                  <Toggle
                    category={"products"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          {/* ZMIENIC W TOGGLE ŻEBY DZIAŁAŁO !!!!! */}
          <h1>NAPOJE</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : napojeData.map((product) => (
                  <Toggle
                    category={"ingredients"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>

          <h1>SOSY</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : sosData.map((product) => (
                  <Toggle
                    category={"ingredients"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          <h1>SKŁADNIKI PIZZA</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : pizzaIngredientData.map((product) => (
                  <Toggle
                    category={"ingredients"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          <h1>SKŁADNIKI BURGERY</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : burgerIngredientData.map((product) => (
                  <Toggle
                    category={"ingredients"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          <h1>SKŁADNIKI ZAPIEKANKI</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : zapiekankaIngredientData.map((product) => (
                  <Toggle
                    category={"ingredients"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
          <h1>SKŁADNIKI SAŁATKI</h1>
          <div className="optionsItem">
            {loading
              ? "ładowanie..."
              : salatkiIngredientData.map((product) => (
                  <Toggle
                    category={"ingredients"}
                    label={product.name}
                    available={product.isAvailable}
                    item={product}
                    key={product._id}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
