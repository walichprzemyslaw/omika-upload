import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.scss";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    street: undefined,
    homeNumber: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(credentials);
    await axios.post("/auth/register", credentials);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Something went wrong" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          id="username"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="password"
          placeholder="Hasło"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="email"
          placeholder="Adres email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Imię"
          id="firstName"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Nazwisko"
          id="lastName"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Ulica"
          id="street"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Numer domu"
          id="homeNumber"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Miejscowość"
          id="city"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="number"
          placeholder="Numer telefonu"
          id="phone"
          onChange={handleChange}
          className="rInput"
        />
        <button disabled={loading} onClick={handleClick} className="rButton">
          Załóż konto
        </button>
        <div className="loginLink">
          <Link to="/login" style={{ textDecoration: "none", color: "#999" }}>
            <span>Masz już konto? Zaloguj się</span>
          </Link>
        </div>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
