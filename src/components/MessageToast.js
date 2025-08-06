// import { useContext } from "react";
// import { MessageContext } from "../store/message.store";
import { useSelector } from "react-redux";

function MessageToast() {
  // const [message, setMessage] = useState({});
  //   const [message,dispatch] = useContext(MessageContext)
  const message = useSelector((state) => state.message);
  console.log("MessageToast message:", message);
  return (
    <>
      { 
        message?.map((msg,index) => {
          return (
            <div
              className="toast-container position-fixed "
              // style={{ top: "80px", right: "20px" }}
              style={{ top: `${(80 * (index+1) +(index*20) )}px`, right: "20px" }}
              key={msg.id}
            >
              <div
                className="toast show"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className={`toast-header bg-${msg.type} text-white`}>
                  <strong className="me-auto">{msg.title}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="toast-body bg-white">{msg.text}</div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default MessageToast;
