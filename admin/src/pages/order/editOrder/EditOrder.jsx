import "./editOrder.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditOrder = ({inputs, title}) => {
  // const [info, setInfo] = useState({});

  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("/employees", { ...info });
  //     navigate("/employees/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    // onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button>Wyślij</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditOrder;
