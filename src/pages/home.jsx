import BaseDashBoard from "./BaseDashboard";
import BaseNavbar from "./BaseNavbar";
// import FirebaseTest from "./FirebaseTest";

function HomePage() {
  return (
    <div>
      <div className=" px-8 py-4">
        <BaseNavbar></BaseNavbar>
      </div>
      <div className="bg-[#F1F2F5] px-8 py-8">
        <BaseDashBoard></BaseDashBoard>
      </div>
      {/* <div>
        <FirebaseTest></FirebaseTest>
      </div> */}
    </div>
  );
}
export default HomePage;
