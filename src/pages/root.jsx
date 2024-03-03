import BaseNavbar from "@/components/BaseNavbar";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Root() {
  return (
    <div>
      <BaseNavbar></BaseNavbar>
      <div className="container mx-auto px-6 md:px-12">
        <Outlet />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
export default Root;
