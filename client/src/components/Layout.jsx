import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="py-5 flex flex-col min-h-screen">
      <Header />
      <hr className="mt-5 mb-10 w-full"/>
      <Outlet />
    </div>
  );
}
