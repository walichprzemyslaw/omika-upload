import "./orderItems.scss";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { removeItem } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";

const OrderItems = ({ products, editable }) => {
  const dispatch = useDispatch();

  const handleSwitchMedium = (e) => {
    switch (e.name) {
      case "nuggetsy":
        return "5 sztuk ";
      case "sosy":
        return "25g ";
      case "napoje":
        return "0,33L ";
      case "frytki":
        return "";
      default:
        return "⌀30cm ";
    }
  };

  const handleSwitchLarge = (e) => {
    switch (e.name) {
      case "nuggetsy":
        return "10 sztuk ";
      case "sosy":
        return "100g ";
      case "napoje":
        return "0,5L ";
      case "frytki":
        return "";
      default:
        return "⌀40cm ";
    }
  };

  // console.log(products);
  // console.log(editable);
  return (
    <div className="orderItems">
      <ul className="cartItems">
        {products?.map((cartItem) => (
          <li
            className="cartItem"
            key={
              cartItem.id +
              cartItem.addedIngredients +
              cartItem.excludedIngredients +
              cartItem.size +
              cartItem.taste +
              cartItem.crust
            }
          >
            <div className="itemLeft">
              <img src={cartItem.img} alt="" />
              <div className="details">
                <h1>
                  {(cartItem.category === "pizza" ||
                    cartItem.category === "dodatki") &&
                    (cartItem.size === "xlarge"
                      ? "0,85L "
                      : cartItem.size === "large"
                      ? handleSwitchLarge(cartItem)
                      : handleSwitchMedium(cartItem))}
                  {cartItem.name}
                </h1>
                <div className="cartDetails">
                  {cartItem.crust.length > 0 && <p>Ciasto: {cartItem.crust}</p>}
                  {cartItem.firstHalf.name && (
                    <>
                      <h5>Pierwsza połowa: {cartItem.firstHalf.name}</h5>
                      {cartItem.firstHalf.addedIngredients.length > 0 && (
                        <p>
                          Dodatki:
                          {cartItem.firstHalf.addedIngredients.join(", ")}
                        </p>
                      )}
                      {cartItem.firstHalf.excludedIngredients.length > 0 && (
                        <p>
                          Minus:
                          {cartItem.firstHalf.excludedIngredients.join(", ")}
                        </p>
                      )}
                    </>
                  )}
                  {cartItem.secondHalf.name && (
                    <>
                      <h5>Druga połowa: {cartItem.secondHalf.name}</h5>
                      {cartItem.secondHalf.addedIngredients2.length > 0 && (
                        <p>
                          Dodatki:
                          {cartItem.secondHalf.addedIngredients2.join(", ")}
                        </p>
                      )}
                      {cartItem.secondHalf.excludedIngredients2.length > 0 && (
                        <p>
                          Minus:
                          {cartItem.secondHalf.excludedIngredients2.join(", ")}
                        </p>
                      )}
                    </>
                  )}
                  {cartItem.addedIngredients.length > 0 && (
                    <p>Dodatki: {cartItem.addedIngredients.join(", ")}</p>
                  )}
                  {cartItem.excludedIngredients.length > 0 && (
                    <p>Minus: {cartItem.excludedIngredients.join(", ")}</p>
                  )}
                  {cartItem.taste.length > 0 && <p>Smak: {cartItem.taste}</p>}
                </div>
                <div className="price">
                  {cartItem.quantity}x {cartItem.price.toFixed(2)}zł
                </div>
              </div>
            </div>
            {editable && (
              <div className="itemRight">
                <DeleteForeverOutlinedIcon
                  className="cartDelete"
                  onClick={() =>
                    dispatch(
                      removeItem({
                        id: cartItem.id,
                        addedIngredients: cartItem.addedIngredients,
                        excludedIngredients: cartItem.excludedIngredients,
                        size: cartItem.size,
                        taste: cartItem.taste,
                        crust: cartItem.crust,
                        firstHalf: cartItem.firstHalf,
                        secondHalf: cartItem.secondHalf,
                      })
                    )
                  }
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItems;
