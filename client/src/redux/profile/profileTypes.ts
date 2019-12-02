export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';

export interface IProfileRedux {
  user: string;
  company: string;
  location: string;
  website: string;
  status: boolean;
  skills: string[];
  bio: string;
  githubusername: string;
  experience: IExperience[];
  education: IEducation[];
  social: ISocial;
}

export interface IExperience {
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

export interface IEducation {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

export interface ISocial {
  youtube: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

export interface IGetProfileSuccess {
  type: typeof GET_PROFILE_SUCCESS;
  payload: IProfileRedux;
}

export interface IGetProfileFail {
  type: typeof GET_PROFILE_FAIL;
}

export type profileActionsType = IGetProfileSuccess | IGetProfileFail;
