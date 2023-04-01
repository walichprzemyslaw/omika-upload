import {
  BrowserRouter as Router,
  Route,
  // Link,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import NewUser from "./pages/user/newUser/NewUser";
import EditUser from "./pages/user/editUser/EditUser";
import NewOrder from "./pages/order/newOrder/NewOrder";
import EditOrder from "./pages/order/editOrder/EditOrder";
import NewProduct from "./pages/product/newProduct/NewProduct";
import EditProduct from "./pages/product/editProduct/EditProduct";
import NewEmployee from "./pages/employee/newEmployee/NewEmployee";
import EditEmployee from "./pages/employee/editEmployee/EditEmployee";
import NewIngredient from "./pages/ingredient/newIngredient/NewIngredient";
import EditIngredient from "./pages/ingredient/editIngredient/EditIngredient";
import ShowProduct from "./pages/product/showProduct/ShowProduct";
import "./style/dark.scss";

import { employeeInputs, ingredientInputs, orderInputs, productInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { employeeColumns, ingredientColumns, orderColumns, productColumns, userColumns } from "./datatablesource";
import Options from "./pages/options/Options";

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

            <Route index element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>}/>

            {/* opcje */}
            <Route path="options">
            <Route index element={
                  <ProtectedRoute>
                    <Options />
                  </ProtectedRoute>}/>
            </Route>

            {/* użytkownicy  */}
            <Route path="users">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={userColumns} title="Użytkownicy"/>
                  </ProtectedRoute>}/>
              <Route path=":userId" element={
                  <ProtectedRoute>
                    <EditUser inputs={userInputs} title="Edytuj użytkownika"/>
                  </ProtectedRoute>}/>
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title="Dodaj nowego użytkownika"/>
                  </ProtectedRoute>}/>
            </Route>

            {/* produkty  */}
            <Route path="products">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={productColumns} title="Produkty"/>
                  </ProtectedRoute>}/>
              <Route path=":productId" element={
                  <ProtectedRoute>
                    <ShowProduct inputs={productInputs} title="Edytuj produkt"/>
                  </ProtectedRoute>}/>
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewProduct inputs={productInputs} title="Dodaj nowy produkt"/>
                  </ProtectedRoute>}/>
            </Route>

            {/* zamówienia  */}
            <Route path="orders">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={orderColumns} title="Zamówienia"/>
                  </ProtectedRoute>}/>
              <Route path=":orderId" element={
                  <ProtectedRoute>
                    <EditOrder inputs={orderInputs} title="Edytuj zamówienie"/>
                  </ProtectedRoute>}/>
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewOrder inputs={orderInputs} title="Dodaj nowe zamówienie"/>
                  </ProtectedRoute>}/>
            </Route>

            {/* pracownicy  */}
            <Route path="employees">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={employeeColumns} title="Pracownicy"/>
                  </ProtectedRoute>}/>
              <Route path=":employeeId" element={
                  <ProtectedRoute>
                    <EditEmployee inputs={employeeInputs} title="Edytuj pracownika"/>
                  </ProtectedRoute>}/>
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewEmployee inputs={employeeInputs} title="Dodaj nowego pracownika"/>
                  </ProtectedRoute>}/>
            </Route>

            {/* składniki  */}
            <Route path="ingredients">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={ingredientColumns} title="Składniki"/>
                  </ProtectedRoute>}/>
              <Route path=":ingredientId" element={
                  <ProtectedRoute>
                    <EditIngredient inputs={ingredientInputs} title="Edytuj składnik"/>
                  </ProtectedRoute>}/>
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewIngredient inputs={ingredientInputs} title="Dodaj nowy składnik"/>
                  </ProtectedRoute>}/>
            </Route>


          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
