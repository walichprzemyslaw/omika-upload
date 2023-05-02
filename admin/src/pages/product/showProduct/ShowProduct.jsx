import "./showProduct.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import EditProduct from "../editProduct/EditProduct";

const ShowProduct = ({ inputs, title }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/products/find/${id}`);
  const [openEditor, setOpenEditor] = useState(false);
  console.log(data);
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL, withCredentials: true})


  return (
    <div className="show">
      <Sidebar />
      <div className="showContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            {loading ? (
              "loading"
            ) : (
              <div className="details">
                <img src={data.img} alt="" />
                <span>{data.name}</span>

                <button
                  onClick={() => {
                    setOpenEditor(true);
                  }}
                >
                  Edytuj
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {openEditor && <EditProduct item={data} closeEditor={setOpenEditor} />}
    </div>
  );
};
export default ShowProduct;
