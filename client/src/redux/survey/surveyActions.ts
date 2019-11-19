import {
  CREATE_SURVEY,
  EDIT_SURVEY,
  REMOVE_SURVEY,
  ISurvey
} from "./surveyTypes";
import { Dispatch } from "react";
import { ISignUpValues } from "../../models/signUp";

export const createSurveyAction = (survey: ISurvey) => ({
  type: CREATE_SURVEY,
  payload: survey
});

export const editSurveyAction = (survey: ISurvey) => ({
  type: EDIT_SURVEY,
  payload: survey
});

export const removeSurveyAction = (id: string) => ({
  type: REMOVE_SURVEY,
  payload: id
});

// export const signUpAction = (values: ISignUpValues) => (
//   dispatch: Dispatch<any>
// ) => {
//   console.log("signUpAction", values);
// };
