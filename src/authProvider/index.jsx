import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context";

const AuthProvider = ({ children }) => {
  let { user } = useContext(GeneralContext);
  let navigate = useNavigate();
  function userNavigate() {
    useEffect(()=>{
		navigate("/login");
	})
  }
  if (user) {
    return children;
  } else {
    userNavigate();
  }
};

export default AuthProvider;
