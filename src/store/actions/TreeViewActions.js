import {
  TREE_VIEW_DATA,
  TREE_VIEW_SELECTED_FOLDER_ID,
  TREE_VIEW_LOADING,
  TREE_VIEW_SELECTED_ITEM_INFO,
  TREE_VIEW_TOGGLE_GROUP_VIEW,
  TREE_VIEW_DATA_CLONE,
  TREE_VIEW_FONT_SIZE
} from "../ActionTypes";
import cloneDeep from "lodash/cloneDeep";
import compact from "lodash/compact"
import { auth } from "../../auth/auth";
import { TreeviewType } from "../../components/react-treeview/TreeviewType";
export const setTreeViewData = (treeViewData) => {
  return function (dispatch, getState) {
    const treeViewToggleGroupViewStatus = getState().TreeViewReducer.treeViewToggleGroupView;
    dispatch({
      type: TREE_VIEW_DATA_CLONE,
      payload: {
        treeViewDataClone: treeViewData,
      },
    });
    if(!treeViewToggleGroupViewStatus){
      treeViewData = cloneDeep(treeViewData);
      treeViewData =    [].concat(
        ...treeViewData.map((obj) => {
          if (obj.type == TreeviewType.Parent) return obj.children;
          else return obj;
        })
      ); 
      
      treeViewData = compact(treeViewData); //remove empty arrays
    }
    dispatch({
      type: TREE_VIEW_DATA,
      payload: {
        treeViewData: treeViewData,
      },
    });
  };
};
export const setTreeViewLoading = (treeViewLoading) => {
  return {
    type: TREE_VIEW_LOADING,
    payload: {
      treeViewLoading: treeViewLoading,
    },
  };
};
export const setTreeViewSelectedFolderId = (treeViewFolderId) => {
  auth.setStartupFolderId(treeViewFolderId);
  return {
    type: TREE_VIEW_SELECTED_FOLDER_ID,
    payload: {
      treeViewFolderId: treeViewFolderId,
    },
  };
};
export const setTreeViewSelectedItemInfo = (treeViewItemInfo) => {
  return {
    type: TREE_VIEW_SELECTED_ITEM_INFO,
    payload: {
      treeViewItemInfo: treeViewItemInfo,
    },
  };
};
export const setTreeViewToggleGroupView = (treeViewToggleGroupView) => {
  return {
    type: TREE_VIEW_TOGGLE_GROUP_VIEW,
    payload: {
      treeViewToggleGroupView: treeViewToggleGroupView,
    },
  };
};
export const setTreeViewFontSize = (treeViewFontSize) => {
  return {
    type: TREE_VIEW_FONT_SIZE,
    payload: {
      treeViewFontSize: treeViewFontSize,
    },
  };
};