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
