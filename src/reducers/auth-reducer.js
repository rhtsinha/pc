import { SET_USER, FETCH_SUCCESS, FETCH_REQUEST } from '../actions/auth';

const initialState = {
  currentUser: null,
  loading: false,
  sendEmail: 'no'
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_USER) {
    return Object.assign({}, state, {
      currentUser: action.username
    });
  } else if (action.type === FETCH_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === FETCH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      sendEmail: 'yes'
    });
  }
  return state;
}
