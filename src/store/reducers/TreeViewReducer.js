import {
  TREE_VIEW_DATA,
  TREE_VIEW_SELECTED_FOLDER_ID,
  TREE_VIEW_LOADING,
  TREE_VIEW_SELECTED_ITEM_INFO,
  TREE_VIEW_TOGGLE_GROUP_VIEW,
  TREE_VIEW_DATA_CLONE,
  TREE_VIEW_FONT_SIZE
} from "../ActionTypes";
import { resolveSettings } from "../../auth/resolveSettings";
export const TreeViewReducer = (
  state = {
    treeViewFolderId: new resolveSettings().resolveStartupFolderId(),
    treeViewData: [],
    treeViewDataClone: [],
    treeViewLoading: false,
    treeViewToggleGroupView: true,
    treeViewFontSize: localStorage.getItem("TreeViewFontSize") || 16
  },
  action
) => {
  switch (action.type) {
    case TREE_VIEW_DATA:
      return Object.assign({}, state, {
        treeViewData: action.payload.treeViewData,

      });
    case TREE_VIEW_DATA_CLONE:
      return Object.assign({}, state, {
        treeViewDataClone: action.payload.treeViewDataClone,

      });
    case TREE_VIEW_SELECTED_FOLDER_ID:
      return Object.assign({}, state, {
        treeViewFolderId: action.payload.treeViewFolderId,
      });
    case TREE_VIEW_LOADING:
      return Object.assign({}, state, {
        treeViewLoading: action.payload.treeViewLoading,
      });
    case TREE_VIEW_SELECTED_ITEM_INFO:
      return Object.assign({}, state, {
        treeViewItemInfo: action.payload.treeViewItemInfo,
      });
    case TREE_VIEW_TOGGLE_GROUP_VIEW:
      return Object.assign({}, state, {
        treeViewToggleGroupView: action.payload.treeViewToggleGroupView,
      });
    case TREE_VIEW_FONT_SIZE:
      return Object.assign({}, state, {
        treeViewFontSize: action.payload.treeViewFontSize,
      });
    default:
      return state;
  }
};
