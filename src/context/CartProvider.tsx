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
const enum REDUCER_ACTION_TYPE {
  ADD,
  REMOVE,
  QUANTITY,
  SUBMIT,
}
type ActionType = {
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
