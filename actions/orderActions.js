import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000';

export const FETCHINGORDERS = 'FETCHINGORDERS';
export const UPDATINGORDER = 'UPDATINGORDER';
export const UPDATEDORDER = 'UPDATEDORDER';
export const COMPLETEORDERACTION = 'COMPLETEORDERACTION';
const ERROR = 'ERROR';

export const getOrders = () => {
  const token = localStorage.getItem('jwt');
  const options = { headers: { Authorization: token } };
  const promise = axios.get(`${API_URL}/api/admin/purchases`, options);
  return dispatch => {
    dispatch({ type: FETCHINGORDERS });
    promise
      .then(res => dispatch({ type: COMPLETEORDERACTION, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};
