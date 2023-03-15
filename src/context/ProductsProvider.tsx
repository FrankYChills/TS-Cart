import { createContext, ReactElement, useEffect, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

// basic state data - method 2
const initState: ProductType[] = [];

// basic state data - method2
// const initState: ProductType[] = [
//   {
//     sku: "item01",
//     name: "iPhone 14 Pro Max",
//     price: 1029,
//   },
//   {
//     sku: "item02",
//     name: "Samsung Galaxy S22 Ultra 5G",
//     price: 1040,
//   },
//   {
//     sku: "item03",
//     name: "Croma Smart TV",
//     price: 224,
//   },
// ];

// type of context
export type UseProductsContextType = { products: ProductType[] };

// define initial context state
const initContextState: UseProductsContextType = { products: [] };

// create a context with an initial state
const ProductsContext = createContext<UseProductsContextType>(initContextState);

// define children type

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

//define provider which encapsulates children to provide them state which is value here
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:6900/products")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) {
            console.log(err);
          }
        });
      console.log("data: ", data);
      return data;
    };
    fetchProducts().then((products) => setProducts(products));
  });
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
