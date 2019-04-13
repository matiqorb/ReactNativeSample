import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/root.reducer";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import dbContext, { Domains } from "../database/dbContext";
const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;
const loggerMiddleware = createLogger();

if (typeof devToolsExtension === "function") {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  ...enhancerList
);
const preloadedState = {};
const initStates = () => {
  return preloadedState;
};
const store = createStore(rootReducer, initStates(), composedEnhancer);
export default store;
