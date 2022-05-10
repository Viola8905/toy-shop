import axios from "axios";

import { setProducts } from "../reducers/productsReducer";
import { setProduct } from "../reducers/productsReducer";

export const getProducts = () => {
  //onLogin callback
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL} products`
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
        `${process.env.REACT_APP_BASE_URL}product-reviews`,
        {
          product_id,
          rating,
          text,
        },
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
    } catch (e) {
      alert("Відгук не надіслано");
      alert(e.response.data.message);
    }
  };
};

export const getProductById = (id, reviews) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}products/${id}`
      );
      dispatch(setProducts(response.data.data));
      reviews();
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const removeReview = (id, success) => {
  return async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}product-reviews/${id}`,
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      success();
    } catch (e) {
      console.log("error");
      alert(e.response.data.message);
    }
  };
};
