import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProductsProvider } from "./context/ProductsProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ProductsProvider> */}
    <App />
    {/* </ProductsProvider> */}
  </React.StrictMode>
);
