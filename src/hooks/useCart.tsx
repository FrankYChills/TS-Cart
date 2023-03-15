import { useContext } from "react";
import { cartContext, initCartContextStateType } from "../context/CartProvider";

const useCart = (): initCartContextStateType => {
  return useContext(cartContext);
};

export default useCart;
