import * as userActions from '../actions/userActions';
import * as productActions from '../actions/productActions';
import * as orderActions from '../actions/orderActions';

const init = {
  products: null,
  clients: null,
  user: null,
  orders: null,
  fetchingUser: false,
  addingUser: false,
  updatingUser: false,
  deletingUser: false,
  fetchingProduct: false,
  addingProduct: false,
  updatingProduct: false,
  deletingProduct: false,
  fetchingOrders: false,
  updatingOrder: false,
  error: null,
};

const rootReducer = (state = init, action) => {
  switch (action.type) {
    case userActions.FETCHINGUSER:
      return Object.assign({}, state, { fetchingUser: true });
    case userActions.UPDATINGUSER:
      return Object.assign({}, state, { updatingUser: true });
    case userActions.COMPLETE:
      return Object.assign({}, state, {
        user: action.payload,
        fetchingUser: false,
        addingUser: false,
        updatingUser: false,
        deletingUser: false,
        error: null,
      });
    case productActions.FETCHINGPRODUCT:
      return Object.assign({}, state, { fetchingProduct: true });
    case productActions.UPDATEDPRODUCT:
      return Object.assign({}, state, {
        products: state.products.map((e, i) =>
          e.id === action.payload.id ? { ...action.payload } : e,
        ),
      });
    case productActions.COMPLETEPRODUCTACTION:
      return Object.assign({}, state, {
        products: action.payload,
        fetchingProduct: false,
        addingProduct: false,
        updatingProduct: false,
        deletingProduct: false,
        error: null,
      });
    case orderActions.FETCHINGORDERS:
      return Object.assign({}, state, { fetchingOrders: true });
    case orderActions.COMPLETEORDERACTION:
      return Object.assign({}, state, {
        orders: action.payload,
        fetchingOrders: false,
      });
    case userActions.ERROR:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};

export default rootReducer;
