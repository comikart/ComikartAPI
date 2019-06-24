import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000';

export const FETCHINGUSER = 'FETCHINGUSER';
export const CREATINGUSER = 'CREATINGUSER';
export const UPDATINGUSER = 'UPDATINGUSER';
export const LOGGINGOUTUSER = 'LOGGINGOUTUSER';
export const LOGGEDOUTUSER = 'LOGGEDOUTUSER';
export const COMPLETE = 'COMPLETED ACTION';
export const ERROR = 'ERROR';

export const login = form => {
  const promise = axios.post(`${API_URL}/api/admin/login`, form);
  return dispatch => {
    dispatch({ type: FETCHINGUSER });
    promise
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        return dispatch({ type: COMPLETE, payload: res.data.user });
      })
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const logout = token => {
  const headers = { headers: { Authorization: token } };
  const promise = axios.get(`${API_URL}/api/admin/logout`, headers);
  return dispatch => {
    dispatch({ type: LOGGINGOUTUSER });
    promise
      .then(res => dispatch({ type: LOGGEDOUTUSER }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};
