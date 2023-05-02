import "./editOrder.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Edit from "../../../components/edit/Edit";
import useFetch from "../../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart, resetCart } from "../../../redux/cartReducer";

const EditOrder = ({ inputs, title }) => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const location = useLocation();
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL})

  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/orders/find/${id}`);


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
          <h1>Zamówienie nr {data._id}</h1>
          <p>{data.firstName} {data.lastName}</p>
          <p> {data.delivery ? (
                  <span>
                    {data.street} {data.homeNumber}, {data.city}
                  </span>
                ) : (
                  "Odbiór osobisty"
                )}</p>
          <button
            className="addOrderButton"
            onClick={() => {
              dispatch(resetCart());
              setOpenEdit(true);
              data.products.map((product) => dispatch(addToCart({id:product._id, ...product})));
            }}
          >
            EDYTUJ
          </button>
        </div>
      </div>
      {openEdit && <Edit order={data} closeEditor={setOpenEdit} />}
    </div>
  );
};
export default EditOrder;
