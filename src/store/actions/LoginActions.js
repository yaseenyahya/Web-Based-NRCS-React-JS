import {
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  LOGIN_IS_LOADING,
  LOGIN_REGISTER_TOGGLE_FORM_NAME,
  REGISTER_FULLNAME,
  REGISTER_CITY,
  REGISTER_MOBILE,
  REGISTER_EMAIL,
  REGISTER_CHANNELNAME,
  LOGIN_REDIRECT_TO_PATH,
  LOGIN_USER_AUTHENTICATED,
} from "../ActionTypes";
import ApiCalls from "../../api/ApiCalls";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "./DialogActions";
import { setTreeViewSelectedFolderId } from "./TreeViewActions";
import { auth } from "../../auth/auth";
import { resolveSettings } from "../../auth/resolveSettings";
export const setLoginUsername = (loginUsername) => {
  return {
    type: LOGIN_USERNAME,
    payload: {
      loginUsername: loginUsername,
    },
  };
};
export const setLoginPassword = (loginPassword) => {
  return {
    type: LOGIN_PASSWORD,
    payload: {
      loginPassword: loginPassword,
    },
  };
};
export const setRegisterFullname = (registerFullname) => {
  return {
    type: REGISTER_FULLNAME,
    payload: {
      registerFullname: registerFullname,
    },
  };
};
export const setLoginRedirectToPath = (loginRedirectToPath) => {
  return {
    type: LOGIN_REDIRECT_TO_PATH,
    payload: {
      loginRedirectToPath: loginRedirectToPath,
    },
  };
};
export const setRegisterCity = (registerCity) => {
  return {
    type: REGISTER_CITY,
    payload: {
      registerCity: registerCity,
    },
  };
};
export const setRegisterMobile = (registerMobile) => {
  return {
    type: REGISTER_MOBILE,
    payload: {
      registerMobile: registerMobile,
    },
  };
};
export const setRegisterEmail = (registerEmail) => {
  return {
    type: REGISTER_EMAIL,
    payload: {
      registerEmail: registerEmail,
    },
  };
};
export const setRegisterChannelname = (registerChannelname) => {
  return {
    type: REGISTER_CHANNELNAME,
    payload: {
      registerChannelname: registerChannelname,
    },
  };
};
export const setIsLoading = (isLoading) => {
  return {
    type: LOGIN_IS_LOADING,
    payload: {
      isLoading: isLoading,
    },
  };
};
export const setToggleForm = (toggleFormName) => {
  return {
    type: LOGIN_REGISTER_TOGGLE_FORM_NAME,
    payload: {
      toggleFormName: toggleFormName,
    },
  };
};

export const authUser = (enqueueSnackbar) => {
  return function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      let username = getState().LoginReducer.loginUsername;
      let password = getState().LoginReducer.loginPassword;

      ApiCalls.callLoginWebApi(username, password)
        .then((responseJson) => {
          dispatch(setIsLoading(false));
          console.log(responseJson.Data)
          if (responseJson.Data.haveError) {
            enqueueSnackbar(responseJson.Data.error, {
              variant: "error",
            });
        
          } else {
           
            dispatch(setLoginUsername(""));
            dispatch(setLoginPassword(""));
            auth.setIsAuthenticated(true);
            auth.setAuthSettings(JSON.stringify(responseJson.Data.content));
          
            dispatch(
              setTreeViewSelectedFolderId(
                new resolveSettings().resolveStartupFolderId()
              )
            );
            dispatch(setLoginRedirectToPath("/"));
            return {
              type: LOGIN_USER_AUTHENTICATED,
            };
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      dispatch(setIsLoading(false));
      enqueueSnackbar("Error occured.Please contact admin.", {
        variant: "error",
      });
    }
  };
};
export const sendMailRegisterUser = (enqueueSnackbar) => {
  return function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      let fullname = getState().LoginReducer.registerFullname;
      let city = getState().LoginReducer.registerCity;
      let mobile = getState()
        .LoginReducer.registerMobile.replace(/\*/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/-/g, "")
        .replace(/ /g, "");
      let email = getState().LoginReducer.registerEmail;
      let channelname = getState().LoginReducer.registerChannelname;

      ApiCalls.registerUser(fullname, city, mobile, email, channelname)
        .then((responseJson) => {
          dispatch(setIsLoading(false));

          if (responseJson.status == "200") {
            dispatch(setDialogOkText("OK"));
            dispatch(setDialogTitle("Success"));
            dispatch(
              setDialogContent(
                "We recieved your request. We will get back to you soon."
              )
            );
            dispatch(setDialogCancelText(null));
            dispatch(
              setDialogOkClick(() => {
                dispatch(setDialogOpen(false));
              })
            );
            dispatch(setDialogOpen(true));

            dispatch(setToggleForm("login"));
          } else {
            enqueueSnackbar("Please try again later", { variant: "error" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      dispatch(setIsLoading(false));
      enqueueSnackbar("Error occured.Please contact admin.", {
        variant: "error",
      });
    }
  };
};
