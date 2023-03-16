import { Children, createContext, ReactElement, useReducer } from "react";

// IMPORTANT - State only has data while a Context has state and function to update the state
// Initial Context should define the structure of the context

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = {
  cart: CartItemType[];
};

// basic state data
const initCartState: CartStateType = {
  cart: [],
};

// action for reducers
export const enum REDUCER_ACTION_TYPE {
  ADD,
  REMOVE,
  QUANTITY,
  SUBMIT,
}
export type ActionType = {
  type: REDUCER_ACTION_TYPE;
  payload?: CartItemType;
};

// define reducer
const reducer = (state: CartStateType, action: ActionType): CartStateType => {
  switch (action.type) {
    //  add an item
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action payload missing in add operation");
      }
      const { sku, name, price } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }
    // remove an item
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action payload missing in remove operation");
      }
      const { sku } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filteredCart] };
    }
    //  update quantity
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action payload missing in quantity operation");
      }

      const { sku, qty } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      if (!itemExists) {
        throw new Error("Item must exists in order to update the quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    // clears the cart
    case REDUCER_ACTION_TYPE.SUBMIT:
      return { ...state, cart: [] };

    default:
      throw new Error("Unidentified Reducer Action Type");
  }
};

// define state and reducer aka a custom hook to update the state so that it can be accessed from outside
const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((prev, cartItem) => {
      return prev + cartItem.price * cartItem.qty;
    }, 0)
  );

  // return cart in some order (here according to sku number in ASC order)
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-1));
    const itemB = Number(b.sku.slice(-1));
    return itemA - itemB; //1-2 -> returns 1 first then 2
  });

  //return function and state
  return { dispatch, totalItems, totalPrice, cart };
};

export type initCartContextStateType = ReturnType<typeof useCartContext>;

// Now create a inital context structure
const initCartContextState: initCartContextStateType = {
  dispatch: () => {},
  totalItems: 10,
  totalPrice: "hello",
  cart: [],
};

//finally create a context
export const cartContext =
  createContext<initCartContextStateType>(initCartContextState);

// define children type
type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

// define provider which encapsulates children to provide them state which is value here
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <cartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </cartContext.Provider>
  );
};
