import { useContext } from "react";
import ProductsContext, {
  UseProductsContextType,
} from "../context/ProductsProvider";

const useProduct = (): UseProductsContextType => {
  return useContext(ProductsContext);
};

export default useProduct;
