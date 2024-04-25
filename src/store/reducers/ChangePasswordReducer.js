import {
  CHANGE_PASSWORD_MODAL_TOGGLE,
  CHANGE_PASSWORD_IS_LOADING,
  CHANGE_PASSWORD_OLD_PASSWORD,
  CHANGE_PASSWORD_NEW_PASSWORD,
} from "../ActionTypes";

export const ChangePasswordReducer = (
  state = {
    changePaswordModalToggle: false,
    changePasswordIsLoading: false,
    changePasswordOldPassword:"",
    changePasswordNewPassword:""
  },
  action
) => {
  switch (action.type) {
    case CHANGE_PASSWORD_MODAL_TOGGLE:
      return Object.assign({}, state, {
        changePaswordModalToggle: action.payload.changePaswordModalToggle,
      });
    case CHANGE_PASSWORD_IS_LOADING:
      return Object.assign({}, state, {
        changePasswordIsLoading: action.payload.changePasswordIsLoading,
      });
    case CHANGE_PASSWORD_OLD_PASSWORD:
      return Object.assign({}, state, {
        changePasswordOldPassword: action.payload.changePasswordOldPassword,
      });
    case CHANGE_PASSWORD_NEW_PASSWORD:
      return Object.assign({}, state, {
        changePasswordNewPassword: action.payload.changePasswordNewPassword,
      });
    default:
      return state;
  }
};
