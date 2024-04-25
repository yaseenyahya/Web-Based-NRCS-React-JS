import {
  RUNDOWN_LOADING,
  RUNDOWN_DATA,
  RUNDOWN_TABLE_DATA,
  RUNDOWN_SELECTED_ITEM_DATA,
  RUNDOWN_HEADER_TEXT,
  RUNDOWN_MAIN_TOP_PANEL_HEIGHT,
  RUNDOWN_FONT_SIZE
} from "../ActionTypes";
export const setRundownLoading = (rundownLoading) => {
  return {
    type: RUNDOWN_LOADING,
    payload: {
      rundownLoading: rundownLoading,
    },
  };
};
export const setRundownData = (rundownData) => {
  return {
    type: RUNDOWN_DATA,
    payload: {
      rundownData: rundownData,
    },
  };
};
export const setRundownTableData = (rundownTableData) => {
  return {
    type: RUNDOWN_TABLE_DATA,
    payload: {
      rundownTableData: rundownTableData,
    },
  };
};
export const setRundownSelectedItemData = (rundownSelectedItemData) => {
  return {
    type: RUNDOWN_SELECTED_ITEM_DATA,
    payload: {
      rundownSelectedItemData: rundownSelectedItemData,
    },
  };
};
export const setRundownHeaderText = (rundownHeaderText) => {
  return {
    type: RUNDOWN_HEADER_TEXT,
    payload: {
      rundownHeaderText: rundownHeaderText,
    },
  };
};
export const setRundownMainTopPanelHeight = (rundownMainTopPanelHeight) => {
  return {
    type: RUNDOWN_MAIN_TOP_PANEL_HEIGHT,
    payload: {
      rundownMainTopPanelHeight: rundownMainTopPanelHeight,
    },
  };
};
export const setRundownFontSize = (rundownFontSize) => {
  return {
    type: RUNDOWN_FONT_SIZE,
    payload: {
      rundownFontSize: rundownFontSize,
    },
  };
};