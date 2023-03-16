import React, { ChangeEvent, ReactElement } from "react";
import { CartItemType, REDUCER_ACTION_TYPE } from "../context/CartProvider";
import { ActionType } from "../context/CartProvider";

type CartLineItemProps = {
  item: CartItemType;
  dispatch: React.Dispatch<ActionType>;
};

const CartLineItem = ({ item, dispatch }: CartLineItemProps) => {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;

  const lineTotal: number = item.price * item.qty;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((value) => {
    return (
      <option key={`opt${value}`} value={value}>
        {value}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.REMOVE, payload: item });

  const content = (
    <li className="cart__item">
      <img className="cart__img" src={img} />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>
      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>
      <button
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item from cart"
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );

  return content;
};

export default CartLineItem;
