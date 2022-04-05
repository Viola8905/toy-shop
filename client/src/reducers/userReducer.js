const SET_USER = "SET_USER";
const SET_ADMIN = "SET_ADMIN";
const LOGOUT = "LOGOUT";

const defaultState = {
  currentUser: {},
  isAuth: false,
  
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
        
      };

    case SET_ADMIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
        
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
        
      };
    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setAdmin = (user) => ({ type: SET_ADMIN, payload: user });
export const logout = () => ({ type: LOGOUT });
