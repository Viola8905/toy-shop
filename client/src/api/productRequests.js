import axios from "axios";

import { setProducts } from "../reducers/productsReducer";

export const getProducts = () => {
  //onLogin callback
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://local.folkem.xyz/api/v1/products`
      );


      dispatch(setProducts(response.data.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
