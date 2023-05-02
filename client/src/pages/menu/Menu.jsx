import "./menu.scss";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Menu = () => {
  return (
    <div className="menu">
      <Sidebar />
      <div className="menuContainer">
        <Navbar />
        <div className="menuWrapper">
          <List />
        </div>
      </div>
    </div>
  );
};

export default Menu;
