import { useState } from "react";
import { REDUCER_ACTION_TYPE } from "../context/CartProvider";
import useCart from "../hooks/useCart";
import CartLineItem from "./CartLineItem";

const Cart = () => {
  const [confirm, steConfirm] = useState<boolean>(false);
  const { dispatch, cart, totalItems, totalPrice } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.SUBMIT });
    steConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank You. Your Order has been Placed Successfully</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem key={item.sku} item={item} dispatch={dispatch} />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items : {totalItems}</p>
        <p>Total Price : {totalPrice}</p>
        <button
          className="cart__submit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
      </div>
    </>
  );

  const content = <main className="main main--cart">{pageContent}</main>;

  return content;
};

export default Cart;
