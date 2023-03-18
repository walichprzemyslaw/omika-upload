import "./workdayInfo.scss";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const WorkdayInfo = ({ title, details, icon }) => {
  return (
    <div className="workdayInfo">
      <div className="left">{icon}</div>
      <div className="right">
        <h1>{title}</h1>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default WorkdayInfo;
