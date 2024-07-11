import { Outlet } from "react-router-dom";
import Header from "../component/header/navbar";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
