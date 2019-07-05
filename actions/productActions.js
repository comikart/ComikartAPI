import axios from 'axios';
import AdminNavbar from '../components/Navbars/AdminNavbar';

const API_URL = process.env.API_URL || 'http://localhost:5000';

export const FETCHINGPRODUCT = 'FETCHINGPRODUCT';
export const CREATINGPRODUCT = 'CREATINGPRODUCT';
export const UPDATINGPRODUCT = 'UPDATINGPRODUCT';
export const UPDATEDPRODUCT = 'UPDATEDPRODUCT';
export const DELETEPRODUCT = 'DELETEPRODUCT';
export const COMPLETEPRODUCTACTION = 'COMPLETEPRODUCTACTION';
const ERROR = 'ERROR';

export const getProducts = () => {
  const token = localStorage.getItem('jwt');
  const options = { headers: { Authorization: token } };
  const promise = axios.get(`${API_URL}/api/admin/products`, options);
  return dispatch => {
    dispatch({ type: FETCHINGPRODUCT });
    promise
      .then(res => dispatch({ type: COMPLETEPRODUCTACTION, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const createProduct = product => {
  const token = localStorage.getItem('jwt');
  const options = { headers: { Authorization: token } };
  const promise = axios.post(`${API_URL}/api/admin/products`, product, options);
  return dispatch => {
    dispatch({ type: CREATINGPRODUCT });
    promise
      .then(res => dispatch({ type: COMPLETEPRODUCTACTION, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const updateProduct = (id, update) => {
  const token = localStorage.getItem('jwt');
  const options = { headers: { Authorization: token } };
  const promise = axios.put(
    `${API_URL}/api/admin/products/${id}`,
    update,
    options,
  );
  return dispatch => {
    dispatch({ type: UPDATINGPRODUCT });
    promise
      .then(res => dispatch({ type: UPDATEDPRODUCT, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const deleteProduct = product_id => {
  const token = localStorage.getItem('jwt');
  const options = { headers: { Authorization: token } };
  const promise = axios.delete(
    `${API_URL}/api/admin/products/${product_id}`,
    options,
  );
  return dispatch => {
    dispatch({ type: DELETEPRODUCT });
    promise
      .then(res => dispatch({ type: COMPLETEPRODUCTACTION, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};
