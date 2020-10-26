import {FETCH_POSTS} from '../actions/actionTypes';

const initialState = {
  posts: [],
};

export default function postReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {...state, posts: action.payload};
    default:
      return state;
  }
}