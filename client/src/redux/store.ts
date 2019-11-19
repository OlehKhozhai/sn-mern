import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as reduxFormReducer } from "redux-form";
import surveyReducer from "./survey/surveyReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  survey: surveyReducer,
  form: reduxFormReducer,
  user: authReducer
});
export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
