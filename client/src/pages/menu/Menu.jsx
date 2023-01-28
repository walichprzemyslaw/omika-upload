// import Card from "../../components/card/Card";
import Categories from "../../components/categories/Categories";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./menu.scss";

const Menu = () => {
  return (
    <div className="menu">
      <Sidebar />
      <div className="menuContainer">
        <Navbar />
        {/* <Categories />
        <hr /> */}
        <div className="menuWrapper">
          <List />
        </div>
      </div>
    </div>
  );
};

export default Menu;
