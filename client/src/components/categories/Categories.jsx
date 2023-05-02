import "./categories.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";

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
