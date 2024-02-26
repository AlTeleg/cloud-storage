import { createStore } from 'redux';

const initialState = {
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const store = createStore(authReducer);

export default store;