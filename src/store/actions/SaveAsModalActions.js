import {
  SAVE_AS_MODAL_TOGGLE,
  SAVE_AS_MODAL_SELECTED_FOLDER_INFO,
  SAVE_AS_MODAL_RADIO_DATA,
  SAVE_AS_MODAL_LOADING,
  SAVE_AS_MODAL_RADIO_MAIN_TOP_CONTAINER_HEIGHT,
  SAVE_AS_MODAL_RADIO_MAIN_BOTTOM_CONTAINER_HEIGHT,
} from "../ActionTypes";
import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import omit from "lodash/omit";
export const setSaveAsModalToggle = (saveAsModalToggle) => {
  return {
    type: SAVE_AS_MODAL_TOGGLE,
    payload: {
      saveAsModalToggle: saveAsModalToggle,
    },
  };
};
export const setSaveAsModalSelectedFolderInfo = (
  saveAsModalSelectedFolderInfo
) => {
  return {
    type: SAVE_AS_MODAL_SELECTED_FOLDER_INFO,
    payload: {
      saveAsModalSelectedFolderInfo: saveAsModalSelectedFolderInfo,
    },
  };
};
export const setSaveAsModalRadioData = (saveAsModalRadioData) => {
  return {
    type: SAVE_AS_MODAL_RADIO_DATA,
    payload: {
      saveAsModalRadioData: saveAsModalRadioData,
    },
  };
};
export const saveToFolder = (enqueueSnackbar) => {
  return function (dispatch, getState) {
    dispatch(setSaveAsModalLoading(true));
    let parentId = getState().SaveAsModalReducer.saveAsModalSelectedFolderInfo
      .parentId;
    let folderId = getState().SaveAsModalReducer.saveAsModalSelectedFolderInfo
      .folderId;

    let uploadFiles = getState().TreeViewReducer.treeViewItemInfo.info
      .uploadfileserilize;
    if (uploadFiles && uploadFiles.length > 0)
      uploadFiles = JSON.parse(uploadFiles);
    else uploadFiles = [];

    uploadFiles = uploadFiles.map(function (o) {
      return Object.assign(
        {
          filenameCreated: o.filename,
        },
        omit(o, "filename")
      );
    });
    console.log("saveas",uploadFiles)
    ApiCalls.addNewReport(
      new resolveSettings().resolveUserId(),
      folderId,
      getState().TreeViewReducer.treeViewItemInfo.info.subject,
      getState().TreeViewReducer.treeViewItemInfo.info.slugtext,
      parentId,
      new resolveSettings().resolveFolderSettings(parentId).FolderType,
      JSON.stringify(uploadFiles)
    )
      .then((responseJson) => {
        if (!responseJson.Data) {
          dispatch(setSaveAsModalLoading(false));
          enqueueSnackbar("Error occured. Please try again.", {
            variant: "error",
          });
        } else {
          dispatch(setSaveAsModalLoading(false));
          dispatch(setSaveAsModalToggle(false));
          dispatch(setSaveAsModalSelectedFolderInfo(null));
          enqueueSnackbar("Report add successfully.", {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        dispatch(setSaveAsModalLoading(false));
        enqueueSnackbar("Error occured.Please contact admin.", {
          variant: "error",
        });
      });
  };
};

export const setSaveAsModalLoading = (saveAsModalLoading) => {
  return {
    type: SAVE_AS_MODAL_LOADING,
    payload: {
      saveAsModalLoading: saveAsModalLoading,
    },
  };
};
export const setSaveAsModalRadioMainTopContainerHeight = (
  saveAsModalRadioMainTopContainerHeight
) => {
  return {
    type: SAVE_AS_MODAL_RADIO_MAIN_TOP_CONTAINER_HEIGHT,
    payload: {
      saveAsModalRadioMainTopContainerHeight: saveAsModalRadioMainTopContainerHeight,
    },
  };
};
export const setSaveAsModalRadioMainBottomContainerHeight = (
  saveAsModalRadioMainBottomContainerHeight
) => {
  return {
    type: SAVE_AS_MODAL_RADIO_MAIN_BOTTOM_CONTAINER_HEIGHT,
    payload: {
      saveAsModalRadioMainBottomContainerHeight: saveAsModalRadioMainBottomContainerHeight,
    },
  };
};
