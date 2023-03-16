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

  return <div>CartLineItem</div>;
};

export default CartLineItem;
