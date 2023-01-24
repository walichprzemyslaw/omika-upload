import { useState } from "react";
import "./checkout.scss";

const Checkout = ({ closeCheckout }) => {
  const [delivery, setDelivery] = useState(true);
  const [shippingAddress, setShippingAddress] = useState(false);

  return (
    <div className="checkout">
      <div className="checkoutContainer">
        <div className="checkoutTop">
          <div className="checkoutHeader">
            <div className="checkoutHeaderLeft">
              <h1>Podsumowanie</h1>
            </div>
            <div className="checkoutHeaderRight"> 
              <button
                className="closeButton"
                onClick={() => closeCheckout(false)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
        <div className="checkoutBottom">
          <div className="bottomLeft">
            <div className="checkoutForm">
              <form>
                <div className="formInput">
                  <label>Imię</label>
                  <input type="text" placeholder="Imię" id="" />
                </div>
                <div className="formInput">
                  <label>Nazwisko</label>
                  <input type="text" placeholder="Nazwisko" id="" />
                </div>
                <div className="formInput">
                  <label>NIP (opcjonalnie)</label>
                  <input type="number" placeholder="NIP" id="" />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input type="email" placeholder="Adres email" id="" />
                </div>
                <div className="formInput">
                  <label>Numer telefonu</label>
                  <input type="number" placeholder="Numer telefonu" id="" />
                </div>

                {delivery && (
                  <>
                    <div className="formInput">
                      <label>Ulica</label>
                      <input type="text" placeholder="Ulica" id="" />
                    </div>
                    <div className="formInput">
                      <label>Numer domu</label>
                      <input type="number" placeholder="Numer domu" id="" />
                    </div>
                    <div className="formInput">
                      <label>Miasto</label>
                      <input type="text" placeholder="Miasto" id="" />
                    </div>
                    <div className="formInput">
                      <label>Kod pocztowy</label>
                      <input type="number" placeholder="Kod pocztowy" id="" />
                    </div>
                  </>
                )}

                <div className="formInput">
                  <label>Uwagi do zamówienia</label>
                  <textarea placeholder="Uwagi do zamówienia"></textarea>
                </div>
                {/* sposób dostawy */}
                {/* metoda płatności */}
              </form>
            </div>
          </div>
          <div className="bottomRight">
            <h1>Twoje zamówienie:</h1>
            <ul>
              <li className="item">
                <p className="quantity">1x</p>
                <p className="name">Pepperoni</p>
                <p className="price">34.95zł</p>
              </li>
              <li className="item">
                <p className="quantity">2x</p>
                <p className="name">Salami</p>
                <p className="price">34.95zł</p>
              </li>
              <li className="item">
                <p className="quantity">1x</p>
                <p className="name">Vesuvio</p>
                <p className="price">34.95zł</p>
              </li>
            </ul>
            <p className="totalPrice">Łączny koszt: 104.85zł</p>
            <div className="deliveryMethod">
              <p className="title">Wybierz metodę odbioru zamówienia:</p>
              <select id="deliveryMethod" className="select">
                <option value="delivery">Dostawa</option>
                <option value="pickUp">Odbiór osobisty</option>
              </select>
            </div>
            <div className="shippingAddress" onClick={()=>setShippingAddress(!shippingAddress)}>
              <input
                type="checkbox"
                id="shippingAddress"
                name="shippingAddress"
                value="shippingAddress"
              />
              <label htmlFor="shippingAddress">Dostawa na inny adres?</label>
            </div>
            
            {shippingAddress && (
                  <>
                    <div className="formInput">
                      <label>Ulica</label>
                      <input type="text" placeholder="Ulica" id="" />
                    </div>
                    <div className="formInput">
                      <label>Numer domu</label>
                      <input type="number" placeholder="Numer domu" id="" />
                    </div>
                    <div className="formInput">
                      <label>Miasto</label>
                      <input type="text" placeholder="Miasto" id="" />
                    </div>
                    <div className="formInput">
                      <label>Kod pocztowy</label>
                      <input type="number" placeholder="Kod pocztowy" id="" />
                    </div>
                  </>
                )}
            <div className="paymentMethod">
              <p className="title">Wybierz metodę płatności:</p>
              <select id="paymentMethod" className="select">
                <option value="cash">Gotówka</option>
                <option value="creditCard">Kartą przy odbiorze</option>
                <option value="online">Płatność online</option>
              </select>
            </div>
            <div className="checkoutButton">
              <button
                onClick={() => {
                  closeCheckout(false);
                }}
              >
                ZAMAWIAM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
