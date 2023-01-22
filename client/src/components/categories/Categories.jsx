import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

import "./categories.scss";

const Categories = () => {
  // temporary data
  const categories = [
    { id: 1, name: "pizza", icon: "" },
    { id: 2, name: "burgery", icon: "" },
    { id: 3, name: "zapiekanki", icon: "" },
    { id: 4, name: "sałatki", icon: "" },
    { id: 5, name: "dodatki", icon: "" },
    { id: 6, name: "napoje", icon: "" },
  ];

  return (
    <div className="categories">
      <div className="categoriesContainer">
        <ul className="categories">
          {categories.map((category) => (
            <>
              <div className="categoryItem">
                <li key={category.id}>
                  <LocalPizzaIcon className="icon" />
                </li>
                <p className="categoryTitle">{category.name}</p>
              </div>
            </>
          ))}
        </ul>

        {/* <ul>
          <div className="categoryItem active">
            <li>
              <LocalPizzaIcon className="icon" />
            </li>
            <p className="categoryTitle">PIZZA</p>
          </div>
          <div className="categoryItem">
            <li>
              <LunchDiningIcon className="icon" />
            </li>
            <p className="categoryTitle">BURGERY</p>
          </div>
          <div className="categoryItem">
            <li>
              <LocalPizzaIcon className="icon" />
              <img src="https://www.svgrepo.com/download/132814/baguette.svg" alt="zapiekanki" className="categoryIcon" />
            </li>
            <p className="categoryTitle">ZAPIEKANKI</p>
          </div>
          <div className="categoryItem">
            <li>
              <LocalPizzaIcon className="icon" />
            </li>
            <p className="categoryTitle">SAŁATKI</p>
          </div>
          <div className="categoryItem">
            <li>
              <LocalPizzaIcon className="icon" />
            </li>
            <p className="categoryTitle">DODATKI</p>
          </div>
          <div className="categoryItem">
            <li>
              <LocalPizzaIcon className="icon" />
            </li>
            <p className="categoryTitle">NAPOJE</p>
          </div>
        </ul> */}
      </div>
    </div>
  );
};

export default Categories;
