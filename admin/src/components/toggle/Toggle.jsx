import "./toggle.scss";
import { useState } from "react";
import axios from "axios";

export const Toggle = ({ label, available, item, category, size }) => {
  const [toggled, setToggled] = useState(available);

  const handleAvailable = async () => {
    try {
      const newProduct = {
        ...item,
        isAvailable: !toggled,
      };

      console.log(newProduct);
      setToggled(!toggled);
      await axios.put(`/${category}/${item._id}`, newProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="toggleContainer">
      <label>
        <input
          type="checkbox"
          defaultChecked={toggled}
          onClick={() => handleAvailable()}
        />
        <span />
      </label>
      <h2>{label}</h2>
    </div>
  );
};
