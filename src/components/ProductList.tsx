import React, { ReactElement } from "react";
import useCart from "../hooks/useCart";
import useProduct from "../hooks/useProduct";
import Product from "./Product";

const ProductList = () => {
  const { products } = useProduct();
  const { dispatch, cart } = useCart();

  let pageContent: ReactElement | ReactElement[] = <p>Loading ...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);
      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          inCart={inCart}
        />
      );
    });
  }

  const content = <main className="main main--products">{pageContent}</main>;
  return content;
};

export default ProductList;
