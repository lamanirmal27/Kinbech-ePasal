import { useContext } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";
import ProductContext from "../context/ProductProvider";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { setCartItem } = useContext(ProductContext);

  const logout = async () => {
    setAuth({});
    setCartItem([]);
    try {
      const response = await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
