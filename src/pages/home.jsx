import BaseDashBoard from "./BaseDashboard";
import BaseNavbar from "./BaseNavbar";

function HomePage() {
  return (
    <div>
      <div className=" bg-neutral-100 px-5 py-2">
        <BaseNavbar></BaseNavbar>
      </div>
      <div className="px-5 py-2">
        <BaseDashBoard></BaseDashBoard>
      </div>
    </div>
  );
}
export default HomePage;
