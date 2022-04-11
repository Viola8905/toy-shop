import axios from "axios";

import { setProducts } from "../reducers/productsReducer";
import { setProduct } from "../reducers/productsReducer";

export const getProducts = () => {
  //onLogin callback
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://api.toy-store.dev-1.folkem.xyz/api/v1/products`
      );

      dispatch(setProducts(response.data.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const postReview = (product_id, rating, text) => {
  return async () => {
    try {
      const response = await axios.post(
        `http://api.toy-store.dev-1.folkem.xyz/api/v1/product-reviews`,
        {
          product_id,
          rating,
          text,
        },
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      alert("Відгук надіслано");
    } catch (e) {
      alert("Відгук не надіслано");
      alert(e.response.data.message);
    }
  };
};

export const getProductById = (id,reviews) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://api.toy-store.dev-1.folkem.xyz/api/v1/products/${id}`
      );
      dispatch(setProduct(response.data.data));
			reviews()
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
