import axios from "axios";
import { setAdmin, setUser } from "../reducers/userReducer";

export const registration = async (
  first_name,
  middle_name,
  last_name,
  email,
  password
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}register`,
      {
        first_name,
        middle_name,
        last_name,
        email,
        password,
      }
    );

    alert("User is registered");
  } catch (e) {
    //localStorage.removeItem("token");
    alert(e.response.data.message);
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}login`,
        {
          email,
          password,
        }
      );
			
			
      localStorage.setItem("token", response.data.token);
		
      if (response.data.user.role.name == "user") {
        dispatch(setUser(response.data.user));
      } else {
        dispatch(setAdmin(response.data.user));
      }
			console.log(response.data.token);
    } catch (e) {
      localStorage.removeItem("token");
      alert(e.response.data.message);
    }
  };
};
