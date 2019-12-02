import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as reduxFormReducer } from 'redux-form';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import authReducer from './auth/authReducer';
import profileReducer from './profile/profileReducer';
import rootSaga from 'redux/rootSaga';

const authPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  form: reduxFormReducer,
  user: persistReducer(authPersistConfig, authReducer),
  profile: profileReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware: any = [sagaMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);
export type AppState = ReturnType<typeof rootReducer>;

sagaMiddleware.run(rootSaga);
