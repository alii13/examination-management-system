import {ADD_TODO, DELETE_TODO, EDIT_TODO} from '../actions/actionTypes';
const initialState = {
  todos: [],
};

export default function todoReducer (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
}