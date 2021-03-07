import { combineReducers } from 'redux';

import auth from './auth';
import complaints from './complaintReducer';

export const reducers = combineReducers({ auth, complaints });
