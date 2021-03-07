import {AUTH, CREATE_ADMIN} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const googleSignIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.googleSignIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');

  } catch (error) {
    console.log(error);
  }
};

export const createAdmin = (formData) => async (dispatch) => {
  try {
    await api.signUp(formData);

    dispatch({ type: CREATE_ADMIN });

  } catch (error) {
    console.log(error);
  }
};
