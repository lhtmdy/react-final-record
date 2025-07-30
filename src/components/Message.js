import { useContext } from "react";
import { MessageContext } from "../store/message.store";

function Message() {
  // const [message, setMessage] = useState({});
  const [message,dispatch] = useContext(MessageContext)
  return (
    <>
    {message.content&&(
    <div className="toast-container position-fixed" style={{ top: "80px", right: "20px" }}>
      <div
        className="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className={`toast-header bg-${message.type} text-white`}>
          {/* <img src="..." className="rounded me-2" alt="..." /> */}
          <strong className="me-auto">{message.title}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body bg-white">{message.content}</div>
      </div>
    </div>
    )}
    </>
  );
}

export default Message;
