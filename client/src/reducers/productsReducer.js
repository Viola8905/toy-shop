const SET_PRODUCTS = "SET_PRODUCTS";


const defaultState = {
  Products: [],
  
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        Products: action.payload,
        
      };

    default:
      return state;
  }
}

export const setProducts = (products) => ({ type: SET_PRODUCTS, payload: products });
