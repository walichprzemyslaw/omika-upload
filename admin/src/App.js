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
import NewUser from "./pages/newUser/NewUser";
import NewCustomer from "./pages/newCustomer/NewCustomer";
import NewOrder from "./pages/newOrder/NewOrder";
import NewProduct from "./pages/newProduct/NewProduct";
import NewEmployee from "./pages/newEmployee/NewEmployee";
import Single from "./pages/single/Single";
import "./style/dark.scss";

import { customerInputs, employeeInputs, orderInputs, productInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { customerColumns, employeeColumns, orderColumns, productColumns, userColumns } from "./datatablesource";

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

            {/* użytkownicy  */}
            <Route path="users">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={userColumns} title="Użytkownicy"/>
                  </ProtectedRoute>}/>
              <Route path=":userId" element={
                  <ProtectedRoute>
                    <Single />
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
                    <Single />
                  </ProtectedRoute>}/>
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewProduct inputs={productInputs} title="Dodaj nowy produkt"/>
                  </ProtectedRoute>}/>
            </Route>

            {/* klienci  */}
            <Route path="customers">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={customerColumns} title="Klienci"/>
                  </ProtectedRoute>}/>
              <Route path=":customerId" element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>}/>
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewCustomer inputs={customerInputs} title="Dodaj nowego klienta"/>
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
                    <Single />
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
                    <Single />
                  </ProtectedRoute>}/>
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewEmployee inputs={employeeInputs} title="Dodaj nowego pracownika"/>
                  </ProtectedRoute>}/>
            </Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
