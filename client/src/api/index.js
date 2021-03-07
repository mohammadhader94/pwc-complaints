import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchComplaints = () => API.get('/complaints');
export const fetchComplaintsByUserId = (id) => API.get(`/complaints/${id}`);
export const createComplaint = (newComplaint) => API.post('/complaints', newComplaint);
export const updateComplaint = (id, updatedComplaint) => API.patch(`/complaints/update/${id}`, updatedComplaint);

export const googleSignIn = (formData) => API.post('/user/googleSignIn', formData);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
