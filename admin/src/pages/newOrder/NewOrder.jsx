import "./newOrder.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewOrder = ({ inputs, title }) => {
  const [info, setInfo] = useState({deliveryZone:"A", status:"pending", paymentMethod: "cash", delivery:true});
  const [orderedProducts, setOrderedProducts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);


  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setOrderedProducts(value);
    setTotalPrice(value.length*20);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        ...info,
        orderedProducts,
        totalPrice,
      };
      console.log(newOrder);
      await axios.post("/orders", newOrder);
      navigate("/orders/");
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
                <label htmlFor="deliveryZone">Strefa dostawy</label>
                <select id="deliveryZone" onChange={handleChange}>
                <option value="A">Strefa A</option>
                <option value="B">Strefa B</option>
                <option value="C">Strefa C</option>    
                </select>
              </div>
            <div className="formInput">
                <label htmlFor="status">Status</label>
                <select id="status" onChange={handleChange}>
                <option value="pending">pending</option>
                <option value="active">active</option>
                <option value="passive">passive</option>    
                </select>
              </div> 
              <div className="formInput">
                <label htmlFor="paymentMethod">Sposób zapłaty</label>
                <select id="paymentMethod" onChange={handleChange}>
                <option value="cash">cash</option>
                <option value="online">online</option>
                <option value="terminal">terminal</option>    
                </select>
              </div> 
              <div className="formInput">
                <label htmlFor="paymentReciver">Pracownik</label>
                <select id="paymentReciver" onChange={handleChange}>
                  <option value="omika">Omika</option>
                  <option value="ivan">Iwan</option>
                </select>
              </div>
              <div className="formInput">
                <label>Dostawa</label>
                <select id="delivery" onChange={handleChange}>
                  <option value={false}>Nie</option>
                  <option value={true}>Tak</option>
                </select>
              </div> 
              <div className="formInput">
                <label htmlFor="products">Produkty</label>
                <select id="products" multiple onChange={handleSelect}>
                  <option value="margherita">margherita</option>
                  <option value="vesuvio">vesuvio</option>
                  <option value="cappriciosa">cappriciosa</option>
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

export default NewOrder;
