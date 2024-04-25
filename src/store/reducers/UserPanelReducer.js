import {
  USER_PANEL_NAVBAR_HEIGHT,
  USER_PANEL_REDIRECT_TO_PATH,
  USER_PANEL_TITLE_CONTAINER_HEIGHT,
  USER_PANEL_WINDOW_SIZE,
  USER_PANEL_LOGOUT,
} from "../ActionTypes";

export const UserPanelReducer = (
  state = {
    userPanelTitleContainerHeight: 0,
    userPanelRedirectToPath: "",
    userPanelNavbarHeight: 0,
    userPanelWindowSize: 0,
  },
  action
) => {
  
  switch (action.type) {
    case USER_PANEL_NAVBAR_HEIGHT:
      return Object.assign({}, state, {
        userPanelNavbarHeight: action.payload.userPanelNavbarHeight,
      });
    case USER_PANEL_REDIRECT_TO_PATH:
      return Object.assign({}, state, {
        userPanelRedirectToPath:
          action.payload.userPanelRedirectToPath,
      });
    case USER_PANEL_TITLE_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        userPanelTitleContainerHeight: action.payload.userPanelTitleContainerHeight,
      });
    case USER_PANEL_WINDOW_SIZE:
      return Object.assign({}, state, {
        userPanelWindowSize: action.payload.userPanelWindowSize,
      });
    case USER_PANEL_LOGOUT:
      return state;
    default:
      return state;
  }
};
