import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <div className="grow dark:bg-black"><Outlet /></div>
      <Footer />
    </div>
  );
}