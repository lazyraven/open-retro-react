import BaseNavbar from "@/components/BaseNavbar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <BaseNavbar></BaseNavbar>
      <Outlet />
    </div>
  );
}
export default Root;
