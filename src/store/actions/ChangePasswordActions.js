import { CHANGE_PASSWORD_MODAL_TOGGLE,CHANGE_PASSWORD_IS_LOADING,CHANGE_PASSWORD_OLD_PASSWORD,CHANGE_PASSWORD_NEW_PASSWORD } from "../ActionTypes";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "./DialogActions";
import { setUserPanelRedirectToPath } from "./UserPanelActions";
import ApiCalls from "../../api/ApiCalls";
export const setChangePasswordModalToggle = (changePaswordModalToggle) => {
  return {
    type: CHANGE_PASSWORD_MODAL_TOGGLE,
    payload: {
      changePaswordModalToggle: changePaswordModalToggle,
    },
    
  };
};
export const setChangePasswordIsLoading = (changePasswordIsLoading) => {
  return {
    type: CHANGE_PASSWORD_IS_LOADING,
    payload: {
      changePasswordIsLoading: changePasswordIsLoading,
    },
    
  };
};
export const setChangePasswordOldPassword = (changePasswordOldPassword) => {
  return {
    type: CHANGE_PASSWORD_OLD_PASSWORD,
    payload: {
      changePasswordOldPassword: changePasswordOldPassword,
    },
    
  };
};
export const setChangePasswordNewPassword = (changePasswordNewPassword) => {
  return {
    type: CHANGE_PASSWORD_NEW_PASSWORD,
    payload: {
      changePasswordNewPassword: changePasswordNewPassword,
    },
    
  };
};
export const submitChangePassword = (userId,enqueueSnackbar) => {
  return function (dispatch, getState) {
    try {
      dispatch(setChangePasswordIsLoading(true));
      let oldPassword = getState().ChangePasswordReducer.changePasswordOldPassword;
      let newPassword = getState().ChangePasswordReducer.changePasswordNewPassword;
      ApiCalls.changePassword(
        userId,
        oldPassword,
        newPassword
      )
        .then(responseJson => {
          if (responseJson.Data != null) {
            if (!responseJson.Data) {
              dispatch(setChangePasswordIsLoading(false));
              enqueueSnackbar("Invalid password.", {
                variant: "error",
              });
            } else {
              
              dispatch(setChangePasswordIsLoading(false));
              dispatch(setChangePasswordModalToggle(false));
              dispatch(setUserPanelRedirectToPath("/loginregister"));
              
              enqueueSnackbar("Password change successfuly. Please login.", { variant: "success" });
            }
          }
        })
        .catch(error => {
          this._showErrorOnSubmit(error.message);
        });
    } catch (e) {
      dispatch(setChangePasswordIsLoading(false));
      enqueueSnackbar("Error occured.Please contact admin.", {
        variant: "error",
      });
    }
  };
};