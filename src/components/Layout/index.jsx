import { Outlet, useLocation } from "react-router-dom";
import Container from "../Container";
import Navbar from "./components/Navbar";
import cn from "./style.module.scss";
const Layout = () => {
  let loc = useLocation();
  return (
    <div className={cn.Layout}>
      <Navbar />
      {loc.pathname == "/" && (
        <Container>
          <h1>Home page</h1>
        </Container>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
