import "./newOrder.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import New from "../../../components/new/New";

const NewOrder = ({ inputs, title }) => {
  const [openNew, setOpenNew] = useState(true);

  // const [info, setInfo] = useState({
  //   deliveryZone: "A",
  //   status: "pending",
  //   paymentMethod: "cash",
  //   delivery: true,
  // });
  // const [products, setProducts] = useState({name: [], price: []});
  // const [totalPrice, setTotalPrice] = useState(0);

  // const {
  //   data: employeeData,
  //   loading: employeeLoading,
  //   error: employeeError,
  // } = useFetch(`/employees`);

  // const {
  //   data: productData,
  //   loading: productLoading,
  //   error: productErorr,
  // } = useFetch(`/products`);

  // console.log(employeeData);

  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  // const handleSelect = (e) => {
  //   const value = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   console.log(value);
  //   setProducts(value);
  //   setTotalPrice(value.length * 20);
  // };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const newOrder = {
  //       ...info,
  //       products,
  //       totalPrice,
  //     };
  //     console.log(newOrder);
  //     // await axios.post("/orders", newOrder);
  //     // navigate("/orders/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <button
            className="addOrderButton"
            onClick={() => {
              setOpenNew(true);
            }}
          >
            DODAJ
          </button>

          {/*  <div className="right">
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
                  {employeeData.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Dostawa</label>
                <select id="delivery" onChange={handleChange}>
                  <option value={true}>Tak</option>
                  <option value={false}>Nie</option>
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="products">Produkty</label>
                <select id="products" multiple onChange={handleSelect}>
                {productData.map((product) => (
                    <option key={product._id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Wyślij</button>
            </form>
          </div> */}
        </div>
      </div>
      {openNew && <New closeNew={setOpenNew} />}
    </div>
  );
};

export default NewOrder;
