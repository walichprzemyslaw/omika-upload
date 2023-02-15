import "./item.scss";

const Item = ({ product }) => {
  return (
    <div className="itemCard">
      <div className="itemContainer">
        <img className="itemImage" src={product.img} alt={product.name} />
        <div className="details">
          <p className="title">{product.name}</p>
        </div>
      </div>
    </div>
  );
};
export default Item;
