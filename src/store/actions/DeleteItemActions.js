import { DELETE_ITEM_BUTTON_LOADING } from "../ActionTypes";
import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import {setTreeViewSelectedItemInfo} from "./TreeViewActions";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "./DialogActions";
export const setDeleteItemButtonLoading = (deleteItemButtonLoading) => {
  return {
    type: DELETE_ITEM_BUTTON_LOADING,
    payload: {
      deleteItemButtonLoading: deleteItemButtonLoading,
    },
  };
};
export const deleteItem = (enqueueSnackbar) => {
  return function (dispatch, getState) {
    dispatch(setDialogOkText("Yes"));
    dispatch(setDialogTitle("Confirm"));
    dispatch(
      setDialogContent(
        "Are you sure you want to delete this item?"
      )
    );
    dispatch(setDialogCancelText("No"));
    dispatch(
      setDialogOkClick(() => {
        dispatch(setDeleteItemButtonLoading(true));
    let itemId = getState().TreeViewReducer.treeViewItemInfo.info.id;
    let itemType = getState().TreeViewReducer.treeViewItemInfo.info.type;
    dispatch(setDialogOpen(false));
    ApiCalls.deleteReport(itemId,
      itemType,
      new resolveSettings().resolveUserId()
    )
      .then((responseJson) => {
        if (!responseJson.Data) {
          enqueueSnackbar("Error occured. Please try again.", {
            variant: "error",
          });
          dispatch(setDeleteItemButtonLoading(false));
        }else{
          dispatch(setTreeViewSelectedItemInfo(null));
     
          enqueueSnackbar("Report deleted successfully.", {
            variant: "success",
          });
        }
        dispatch(setDeleteItemButtonLoading(false));
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        dispatch(setDeleteItemButtonLoading(false));
      });
      })
    );
    dispatch(setDialogOpen(true));
   
    //  });
  };
};
