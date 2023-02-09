import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../card/Card";
import "./list.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";

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
        {loading ? "ładowanie..." : data.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default List;
