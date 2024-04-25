import {
  HEADER_OPEN_DRAWER,
  HEADER_ANCHOR_EL,
  HEADER_DRAWER_TOP_CONTAINER_HEIGHT,
  HEADER_DRAWER_BOTTOM_CONTAINER_HEIGHT,
} from "../ActionTypes";

export const HeaderReducer = (
  state = {
    headerDrawerOpen: false,
    headerAnchorEl: null,
    drawerTopContainerHeight:0,
    drawerBottomContainerHeight:0
  },
  action
) => {
  switch (action.type) {
    case HEADER_OPEN_DRAWER:
      return Object.assign({}, state, {
        headerDrawerOpen: action.payload.headerDrawerOpen,
      });
    case HEADER_ANCHOR_EL:
      return Object.assign({}, state, {
        headerAnchorEl: action.payload.headerAnchorEl,
      });
      case HEADER_DRAWER_TOP_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        drawerTopContainerHeight: action.payload.drawerTopContainerHeight,
      });
      case HEADER_DRAWER_BOTTOM_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        drawerBottomContainerHeight: action.payload.drawerBottomContainerHeight,
      });
    default:
      return state;
  }
};
