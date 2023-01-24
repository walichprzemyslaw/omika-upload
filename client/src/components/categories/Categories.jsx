import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

import "./categories.scss";

const Categories = () => {
  // temporary data
  const categories = [
    { id: "asd", name: "pizza", icon: "" },
    { id: "sadaasd", name: "burgery", icon: "" },
    { id: "sda", name: "zapiekanki", icon: "" },
    { id: "sdasda", name: "sałatki", icon: "" },
    { id: "qwe", name: "dodatki", icon: "" },
    { id: "ewqe", name: "napoje", icon: "" },
  ];

  console.log(categories);

  return (
    <div className="categories">
      <div className="categoriesContainer">
        <ul className="categories">
          {categories.map((category) => (
              <div className="categoryItem" key={category.id}>
                <li>
                  <LocalPizzaIcon className="icon" />
                </li>
                <p className="categoryTitle">{category.name}</p>
              </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
