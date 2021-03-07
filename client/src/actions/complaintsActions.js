import { COMPLAINT_CREATE, COMPLAINTS_FETCH_BY_USER_ID, COMPLAINTS_FETCH, COMPLAINT_UPDATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getComplaints = () => async (dispatch) => {
  try {
    const { data } = await api.fetchComplaints();

    dispatch({ type: COMPLAINTS_FETCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getComplaintsByUserId = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchComplaintsByUserId(id);

    dispatch({ type: COMPLAINTS_FETCH_BY_USER_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createComplaint = (complaint) => async (dispatch) => {
  try {
    const { data } = await api.createComplaint(complaint);

    dispatch({ type: COMPLAINT_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateComplaint = (id, complaint) => async (dispatch) => {
  try {
    const { data } = await api.updateComplaint(id, complaint);

    dispatch({ type: COMPLAINT_UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

