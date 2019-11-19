export const CREATE_SURVEY = "CREATE_SURVEY";
export const EDIT_SURVEY = "EDIT_SURVEY";
export const REMOVE_SURVEY = "REMOVE_SURVEY";

export interface ISurvey {
  id: string;
  title: string;
  questions: [];
  answer: [];
}

export interface ISurveyReducerState {
  list: ISurvey[];
}

export interface ICreateSurveyActions {
  type: typeof CREATE_SURVEY;
  payload: ISurvey;
}

export interface IEditSurveyActions {
  type: typeof EDIT_SURVEY;
  payload: ISurvey;
}

export interface IRemoveSurveyActions {
  type: typeof REMOVE_SURVEY;
  payload: string;
}

export type TSurveyActionsType =
  | ICreateSurveyActions
  | IRemoveSurveyActions
  | IEditSurveyActions;
