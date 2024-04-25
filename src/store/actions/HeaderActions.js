import {
  HEADER_OPEN_DRAWER,
  HEADER_ANCHOR_EL,
  HEADER_DRAWER_TOP_CONTAINER_HEIGHT,
  HEADER_DRAWER_BOTTOM_CONTAINER_HEIGHT,
} from "../ActionTypes";

export const setHeaderDrawerOpen = (headerDrawerOpen) => {
  return {
    type: HEADER_OPEN_DRAWER,
    payload: {
      headerDrawerOpen: headerDrawerOpen,
    },
  };
};
export const setDrawerTopContainerHeight = (drawerTopContainerHeight) => {
  return {
    type: HEADER_DRAWER_TOP_CONTAINER_HEIGHT,
    payload: {
      drawerTopContainerHeight: drawerTopContainerHeight,
    },
  };
};
export const setDrawerBottomContainerHeight = (drawerBottomContainerHeight) => {
  return {
    type: HEADER_DRAWER_BOTTOM_CONTAINER_HEIGHT,
    payload: {
      drawerBottomContainerHeight: drawerBottomContainerHeight,
    },
  };
};

export const setHeaderAnchorEl = (headerAnchorEl) => {
  return {
    type: HEADER_ANCHOR_EL,
    payload: {
      headerAnchorEl: headerAnchorEl,
    },
  };
};
