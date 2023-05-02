import "./editEmployee.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const EditEmployee = ({ inputs, title }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/employees/find/${id}`);
  const [info, setInfo] = useState();
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL, withCredentials: true})


  useEffect(() => {
    setInfo(data);
  }, [data]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/employees/${id}`, { ...info });
      navigate("/employees/");
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
                <button onClick={handleClick}>Wyślij</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditEmployee;
