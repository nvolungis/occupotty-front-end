import {compose, createStore, applyMiddleware} from "redux";
import createLogger                            from "redux-logger";
import persistState, {mergePersistedState}     from "redux-localstorage";
import adapter                                 from "redux-localstorage/lib/adapters/localStorage";
import filter                                  from "redux-localstorage-filter";
import thunk                                   from "redux-thunk"

import combinedReducer        from "./combinedReducer";
import asyncActionsMiddleware from "app/middleware/async_actions_middleware";

const storage = compose(
  filter([
    "groups.draftsByGroupId"
  ])
)(adapter(window.localStorage));

const finalCreateStore = compose(
  applyMiddleware(thunk, asyncActionsMiddleware),
  persistState(),
  applyMiddleware(createLogger({
    predicate: (getState, action) => process.env.NODE_ENV !== "production"
  }))
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(combinedReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./combinedReducer", () => {
      const nextCombinedReducer = require("./combinedReducer");
      store.replaceReducer(nextCombinedReducer);
    });
  }

  return store;
}
