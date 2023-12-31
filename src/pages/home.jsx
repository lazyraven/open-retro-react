import BaseDashBoard from "./BaseDashboard";
import BaseNavbar from "./BaseNavbar";

function HomePage() {
  return (
    <div>
      <BaseNavbar></BaseNavbar>
      <div className="bg-[#F1F2F5] px-8 py-8">
        <BaseDashBoard></BaseDashBoard>
      </div>
      <div></div>
    </div>
  );
}
export default HomePage;
