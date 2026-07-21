import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Alert a error, message should be the alert message.
    To use this function:
        import: 
            import TAlert from "./alert"
            import { ToastContainer } from "react-toastify"; 
        add:
            TAlert("XXXX"); when we want to alert;
            <ToastContainer /> under the button. */
const alert_error = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default alert_error;
