import {
  CREATE_SURVEY,
  EDIT_SURVEY,
  REMOVE_SURVEY,
  ISurveyReducerState,
  TSurveyActionsType
} from "./surveyTypes";

const initialState: ISurveyReducerState = {
  list: []
};

const surveyReducer = (
  state = initialState,
  action: TSurveyActionsType
): ISurveyReducerState => {
  switch (action.type) {
    case CREATE_SURVEY:
      return { list: [action.payload, ...state.list] };

    case EDIT_SURVEY:
      return { list: [action.payload, ...state.list] };

    case REMOVE_SURVEY:
      return {
        list: state.list.filter(survey => survey.id === action.payload)
      };

    default:
      return state;
  }
};
export default surveyReducer;
