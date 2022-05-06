const SET_CATEGORIES = "SET_CATEGORIES";


const defaultState = {
  Categories: [],
 
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        Categories: action.payload,
      };
   
    default:
      return state;
  }
}

export const setCategoriesRedux = (category) => ({
  type: SET_CATEGORIES,
  payload: category,
});
