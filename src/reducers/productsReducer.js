const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PRODUCT = "SET_PRODUCT";

const defaultState = {
  Products: [],
  Product: [],
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        Products: action.payload,
      };
    case SET_PRODUCT:
      return {
        ...state,
        Product: action.payload,
      };

    default:
      return state;
  }
}

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});
export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});
