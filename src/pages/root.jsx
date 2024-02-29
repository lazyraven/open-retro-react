import BaseNavbar from "@/components/BaseNavbar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <BaseNavbar></BaseNavbar>
      <div className="container mx-auto px-6 md:p-12">
        <Outlet />
      </div>
    </div>
  );
}
export default Root;
