import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../card/Card";
import "./list.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import Duo from "../duo/Duo";

const List = () => {
  const categories = [
    { id: 1, name: "pizza" },
    { id: 2, name: "burgery" },
    { id: 3, name: "zapiekanki" },
    { id: 4, name: "sałatki" },
    { id: 5, name: "dodatki" },
  ];

  const [category, setCategory] = useState("pizza");
  const { data, loading, error } = useFetch(`/products/category/${category}`);
  const [openDuo, setOpenDuo] = useState(false);

  return (
    <div className="list">
      <div className="listCategories">
        <div className="categoriesContainer">
          <ul className="categories">
            {categories.map((category) => (
              <div
                className="categoryItem"
                key={category.id}
                onClick={() => setCategory(category.name)}
              >
                <li>
                  <LocalPizzaIcon className="icon" />
                </li>
                <p className="categoryTitle">{category.name}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="listWrapper">
        {category === "pizza" && (
          <div className="card">
            <div className="cardContainer" onClick={() => setOpenDuo(true)}>
              <img
                className="cardImage"
                src="http://res.cloudinary.com/dqknlkpku/image/upload/v1675902485/upload/yhli9sounakp2iymdmyx.png"
                alt="duo"
              />
              <div className="details">
                <p className="title">pół na pół</p>
                <p className="price">25.95zł</p>
              </div>
            </div>
          </div>
        )}
        {loading
          ? "ładowanie..."
          : data.map((item) => <Card item={item} key={item._id} />)}
      </div>
      {openDuo && <Duo closeDuo={setOpenDuo}/>}
    </div>
  );
};

export default List;
