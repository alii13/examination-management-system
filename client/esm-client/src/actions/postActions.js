import {FETCH_POSTS} from './actionTypes';
export const fetchPosts = () => {
  return dispatch => {
    axios.get ('https://jsonplaceholder.typicode.com/posts').then (response =>
      dispatch ({
        type: FETCH_POSTS,
        payload: response.data,
      })
    );
  };
};