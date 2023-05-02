import "./errorModal.scss";

const ErrorModal = ({ message, closeError }) => {
  return (
    <div className="errorContainer">
      <div className="errorBox">
        <p className="message">{message}</p>
        <button onClick={()=>closeError(false)}>OK!</button>
      </div>
    </div>
  );
};

export default ErrorModal;
