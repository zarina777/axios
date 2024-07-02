import { useState } from "react";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { GeneralContext } from "../../context";
import cn from "./style.module.scss";
const Login = () => {
  let { setUser } = useContext(GeneralContext);
  const username = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  let [inputcolor, setInputcolor] = useState(false);
  function handler(e) {
    e.preventDefault();
    if (username.current && password.current) {
      setInputcolor(true);
      if (username.current.value.trim() && password.current.value.trim()) {
        fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.current.value,
            password: password.current.value,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setUser(res.token);
            navigate("/admin");
          })
          .catch(() => {
            setInputcolor(false);
          });
      } else {
        setInputcolor(false);
      }
    } else {
      setInputcolor(false);
    }
  }
  return (
    <form onSubmit={handler} className={cn.signup}>
      <Container className={cn.container}>
        <input
          style={
            inputcolor
              ? { border: "1px solid blue" }
              : { border: "1px solid red" }
          }
          ref={username}
          type="text"
          placeholder="username"
        />
        <input
          style={
            inputcolor
              ? { border: "1px solid blue" }
              : { border: "1px solid red" }
          }
          ref={password}
          type="password"
          placeholder="password"
        />
        <button>Submit</button>
      </Container>
    </form>
  );
};

export default Login;
