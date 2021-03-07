import {
    COMPLAINT_CREATE,
    COMPLAINTS_FETCH_BY_USER_ID,
    COMPLAINTS_FETCH,
    COMPLAINT_UPDATE
} from '../constants/actionTypes';

const complaintInitialState = [];

export default (complaintState = complaintInitialState, action) => {
    switch (action.type) {
        case COMPLAINTS_FETCH_BY_USER_ID:
            return action.payload;
        case COMPLAINTS_FETCH:
            return action.payload;
        case COMPLAINT_CREATE:
            return [...complaintState, action.payload];
        case COMPLAINT_UPDATE:
            return complaintState.map((complaint) => (complaint._id === action.payload._id ? action.payload : complaint));
        default:
            return complaintState;
    }
};

