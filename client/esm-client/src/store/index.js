import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index";
import logger from "redux-logger";

// const allEnhancers = compose(applyMiddleware(thunk, logger));
const allEnhancers = compose(applyMiddleware(thunk));

const store = createStore(reducer, allEnhancers);
export default store;
