import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  IProfileRedux,
  profileActionsType,
} from './profileTypes';

const initialState = {} as IProfileRedux;

const profileReducer = (
  state = initialState,
  action: profileActionsType,
): IProfileRedux => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return { ...state, ...action.payload };

    case GET_PROFILE_FAIL:
      return { ...initialState };

    default:
      return state;
  }
};
export default profileReducer;
