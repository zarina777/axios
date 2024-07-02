import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GeneralContext } from "../../../../context";
import Container from "../../../Container";
import cn from "./style.module.scss";

const Navbar = () => {
  let { user, Logout } = useContext(GeneralContext);
  return (
    <div className={cn.Navbar}>
      <Container className={cn.container}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="login">Log in</NavLink>
        <NavLink to="admin">Admin </NavLink>
        {user && (
          <NavLink
          to='login'
            onClick={() => {
              Logout(null)
            }}
          >
            Log Out
          </NavLink>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
