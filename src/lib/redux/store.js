import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import storage from 'redux-persist/lib/storage';
import userDataReducer from './userDataSlice';

const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userDataReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [routerMiddleware(history)],
});

const persistor = persistStore(store);

export { history, store, persistor };
