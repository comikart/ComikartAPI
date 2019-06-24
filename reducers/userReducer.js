import * as userActions from '../actions/userActions';
import * as productActions from '../actions/productActions';

const init = {
  products: null,
  clients: null,
  user: null,
  fetchingUser: false,
  addingUser: false,
  updatingUser: false,
  deletingUser: false,
  error: null,
};

const userReducer = (state = init, action) => {
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
      });
    case productActions.COMPLETEPRODUCTACTION:
      return Object.assign({}, state, { products: action.payload });
    case userActions.ERROR:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};

export default userReducer;
