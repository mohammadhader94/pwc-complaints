import {AUTH, LOGOUT, CREATE_ADMIN} from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    case CREATE_ADMIN:
      return state;
    default:
      return state;
  }
};

export default authReducer;
