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


export const postReview = (product_id,rating,text) =>{
	return async () => {
		try{
			const response = await axios.post(
        `http://local.folkem.xyz/api/v1/product-reviews`,{
					product_id,
					rating,
					text,
				},
        {
				
          headers: {sanctum : `${localStorage.getItem("token")}` },
        }
				);
				alert("Відгук надіслано")
				console.log(localStorage.getItem("token"))
		}catch(e){
			alert("Відгук не надіслано");
			alert(e.response.data.message);
			console.log(localStorage.getItem("token"));
		}
	}
}