import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/DarkmodeContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import OrderPage from "./pages/orderPage/OrderPage";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import "./style/dark.scss";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="settings/:id" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="order/:id" element={<OrderPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
