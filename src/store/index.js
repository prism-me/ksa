import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../redux/users/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { all, fork, take } from "redux-saga/effects";
import productsWatcher from "./../redux/products/sagas";
import { productReducer } from "../redux/products";
import globalReducer from "../redux/global/reducers";
import globalWatcher from "../redux/global/sagas";
import { pagesReducer } from "../redux/pages/pagesReducer";

// import { REHYDRATE } from 'redux-persist/lib/constants';

const persistConfig = {
  key: "root",
  storage,
};

function* rootSaga() {
  // yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  yield all([fork(productsWatcher)]);
  yield all([fork(globalWatcher)]);
}

const rootReducer = combineReducers({
  globalReducer: globalReducer,
  userReducer: authReducer,
  productReducer: productReducer,
  allPages: pagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware, thunk)
  );
} else {
  enhancer = compose(applyMiddleware(sagaMiddleware, thunk));
}

export const store = createStore(persistedReducer, enhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
