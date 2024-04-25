import {
  USER_PANEL_NAVBAR_HEIGHT,
  USER_PANEL_TITLE_CONTAINER_HEIGHT,
  USER_PANEL_WINDOW_SIZE,
  USER_PANEL_LOGOUT,
  USER_PANEL_REDIRECT_TO_PATH
} from "../ActionTypes";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "./DialogActions";
export const setUserPanelTitleContainerHeight = (
  userPanelTitleContainerHeight
) => {
  return {
    type: USER_PANEL_TITLE_CONTAINER_HEIGHT,
    payload: {
      userPanelTitleContainerHeight: userPanelTitleContainerHeight,
    },
  };
};

export const setuserPanelWindowSize = (
  userPanelWindowSize
) => {

  return {
    type: USER_PANEL_WINDOW_SIZE,
    payload: {
      userPanelWindowSize: userPanelWindowSize,
    },
  };
};

export const setUserPanelNavbarHeight = (
  userPanelNavbarHeight
) => {
  return {
    type: USER_PANEL_NAVBAR_HEIGHT,
    payload: {
      userPanelNavbarHeight: userPanelNavbarHeight,
    },
  };
};

export const setUserPanelRedirectToPath = (
  userPanelRedirectToPath
) => {
  return {
    type: USER_PANEL_REDIRECT_TO_PATH,
    payload: {
      userPanelRedirectToPath: userPanelRedirectToPath,
    },
  };
};
export const setUserPanelLogout = (
  
) => {
  return function (dispatch, getState) {
    dispatch(setDialogOkText("Yes"));
    dispatch(setDialogTitle("Confirm"));
    dispatch(
      setDialogContent(
        "Are you sure you want to logout?"
      )
    );
    dispatch(setDialogCancelText("No"));
    dispatch(
      setDialogOkClick(() => {
        dispatch(setDialogOpen(false));
        dispatch(setUserPanelRedirectToPath("/loginregister"));
      })
    );
    dispatch(setDialogOpen(true));

  return {
    type: USER_PANEL_LOGOUT,
  };
}
};