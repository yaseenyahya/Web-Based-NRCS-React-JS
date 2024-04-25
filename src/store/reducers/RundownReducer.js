import {
  RUNDOWN_LOADING,
  RUNDOWN_DATA,
  RUNDOWN_TABLE_DATA,
  RUNDOWN_SELECTED_ITEM_DATA,
  RUNDOWN_HEADER_TEXT,
  RUNDOWN_MAIN_TOP_PANEL_HEIGHT,
  RUNDOWN_FONT_SIZE
} from "../ActionTypes";
export const RundownReducer = (
  state = {
    rundownLoading: true,
    rundownData: null,
    rundownTableData: null,
    rundownSelectedItemData: null,
    rundownHeaderText: "",
    rundownMainTopPanelHeight:0,
    rundownFontSize:localStorage.getItem("RundownFontSize") || 18
  },
  action
) => {
  switch (action.type) {
    case RUNDOWN_LOADING:
      return Object.assign({}, state, {
        rundownLoading:
          action.payload.rundownLoading,
      });
    case RUNDOWN_DATA:
      return Object.assign({}, state, {
        rundownData:
          action.payload.rundownData,
      });
    case RUNDOWN_TABLE_DATA:
      return Object.assign({}, state, {
        rundownTableData:
          action.payload.rundownTableData,
      });
    case RUNDOWN_SELECTED_ITEM_DATA:
      return Object.assign({}, state, {
        rundownSelectedItemData: action.payload.rundownSelectedItemData,
      });
    case RUNDOWN_HEADER_TEXT:
      return Object.assign({}, state, {
        rundownHeaderText: action.payload.rundownHeaderText,
      });
      case RUNDOWN_MAIN_TOP_PANEL_HEIGHT:
        return Object.assign({}, state, {
          rundownMainTopPanelHeight: action.payload.rundownMainTopPanelHeight,
        });
        case RUNDOWN_FONT_SIZE:
          return Object.assign({}, state, {
            rundownFontSize: action.payload.rundownFontSize,
          });
    default:
      return state;
  }
};
