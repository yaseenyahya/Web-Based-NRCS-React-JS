import {
  ADD_ITEM_MODAL_TOGGLE,
  ADD_ITEM_MODAL_LOADING,
  ADD_ITEM_MODAL_SELECTED_FOLDER_ID,
  ADD_ITEM_MODAL_FOLDER_DATA,
  ADD_ITEM_MODAL_SUBJECT,
  ADD_ITEM_MODAL_CONTENT,
  ADD_ITEM_MODAL_RESET,
  ADD_ITEM_MODAL_MAIN_TOP_CONTAINER_HEIGHT,
  ADD_ITEM_MODAL_MAIN_MIDDLE_CONTAINER_HEIGHT,
  ADD_ITEM_MODAL_MAIN_BOTTOM_CONTAINER_HEIGHT,
} from "../ActionTypes";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "./DialogActions";
import ApiCalls from "../../api/ApiCalls";
import { resetUploadAttachmentsModal } from "./UploadAttachmentsModalActions";
import { resolveSettings } from "../../auth/resolveSettings";
import { uploadFileStatusType } from "../../components/UploadAttachmentsModal/uploadFileStatusType";
import uploadIncludes from "../../components/UploadAttachmentsModal/includes";
import omit from "lodash/omit";
export const setAddItemModalToggle = (addItemModalToggle) => {
  return {
    type: ADD_ITEM_MODAL_TOGGLE,
    payload: {
      addItemModalToggle: addItemModalToggle,
    },
  };
};
export const setAddItemModalLoading = (addItemModalLoading) => {
  return {
    type: ADD_ITEM_MODAL_LOADING,
    payload: {
      addItemModalLoading: addItemModalLoading,
    },
  };
};
export const setAddItemModalSelectedFolderId = (
  addItemModalSelectedFolderId
) => {
  return {
    type: ADD_ITEM_MODAL_SELECTED_FOLDER_ID,
    payload: {
      addItemModalSelectedFolderId: addItemModalSelectedFolderId,
    },
  };
};

export const setAddItemModalFolderData = (addItemModalFolderData) => {
  return {
    type: ADD_ITEM_MODAL_FOLDER_DATA,
    payload: {
      addItemModalFolderData: addItemModalFolderData,
    },
  };
};

export const setAddItemModalSubject = (addItemModalSubject) => {
  return {
    type: ADD_ITEM_MODAL_SUBJECT,
    payload: {
      addItemModalSubject: addItemModalSubject,
    },
  };
};

export const setAddItemModalContent = (addItemModalContent) => {
  return {
    type: ADD_ITEM_MODAL_CONTENT,
    payload: {
      addItemModalContent: addItemModalContent,
    },
  };
};
export const setAddItemModalMainTopContainerHeight = (
  addItemModalMainTopContainerHeight
) => {
  return {
    type: ADD_ITEM_MODAL_MAIN_TOP_CONTAINER_HEIGHT,
    payload: {
      addItemModalMainTopContainerHeight: addItemModalMainTopContainerHeight,
    },
  };
};
export const setAddItemModalMainMiddleContainerHeight = (
  addItemModalMainMiddleContainerHeight
) => {
  return {
    type: ADD_ITEM_MODAL_MAIN_MIDDLE_CONTAINER_HEIGHT,
    payload: {
      addItemModalMainMiddleContainerHeight: addItemModalMainMiddleContainerHeight,
    },
  };
};
export const setAddItemModalMainBottomContainerHeight = (
  addItemModalMainBottomContainerHeight
) => {
  return {
    type: ADD_ITEM_MODAL_MAIN_BOTTOM_CONTAINER_HEIGHT,
    payload: {
      addItemModalMainBottomContainerHeight: addItemModalMainBottomContainerHeight,
    },
  };
};
export const resetAddItemModal = () => {
  return {
    type: ADD_ITEM_MODAL_RESET,
    payload: {
      addItemModalLoading: false,
      addItemModalSelectedFolderId: null,
      addItemModalFolderData: null,
      addItemModalSubject: "",
      addItemModalContent: "",
    },
  };
};
export const addItemToFolder = (enqueueSnackbar) => {
  return function (dispatch, getState) {
    let pendingOrUploadingUploadFiles = new uploadIncludes().getUploadFilesbyTwoStatus(
      getState().UploadAttachmentsModalReducer.uploadAttachmentsModalFilesData,
      uploadFileStatusType.pending,
      uploadFileStatusType.uploading
    );
    let failedUploadFiles = new uploadIncludes().getUploadFilesbyStatus(
      getState().UploadAttachmentsModalReducer.uploadAttachmentsModalFilesData,
      uploadFileStatusType.failed
    );

    if (
      pendingOrUploadingUploadFiles.length > 0 ||
      failedUploadFiles.length > 0
    ) {
      var pendingText =
      pendingOrUploadingUploadFiles.length +
      (pendingOrUploadingUploadFiles.length > 1 ? " files are" : " file is") +
      " uploading. Are you sure want to continue?";

    var failedText =
    failedUploadFiles.length +
      (failedUploadFiles.length > 1 ? " files are" : " file is") +
      " failed uploading. Are you sure want to continue?";
      dispatch(setDialogOkText("Continue"));
      dispatch(setDialogTitle("Confirm"));
      dispatch(setDialogContent( pendingOrUploadingUploadFiles.length > 0 ? pendingText : failedText));
      dispatch(setDialogCancelText("Cancel"));
      dispatch(
        setDialogOkClick(() => {
          dispatch(setDialogOpen(false));
          dispatchAddItemToFolder(dispatch, getState,enqueueSnackbar);
          
        })
      );
      dispatch(setDialogOpen(true));
    } else {
      dispatchAddItemToFolder(dispatch, getState,enqueueSnackbar);
    }
  };
};

const dispatchAddItemToFolder=(dispatch, getState,enqueueSnackbar)=>{
  dispatch(setAddItemModalLoading(true));
      let folderId = getState().AddItemModalReducer
        .addItemModalSelectedFolderId;
      let subject = getState().AddItemModalReducer.addItemModalSubject;
      let content = getState().AddItemModalReducer.addItemModalContent;
      let mainFolderId = getState().TreeViewReducer.treeViewFolderId;
      let uploadFiles = new uploadIncludes().getUploadFilesbyStatus(
        getState().UploadAttachmentsModalReducer
          .uploadAttachmentsModalFilesData,
        uploadFileStatusType.uploaded
      );
      uploadFiles = uploadFiles.map(function (o) {
        return Object.assign(
          {
            filenameCreated: o.filename,
            already_upload_status: o.type,
          },
          omit(o, "filename")
        );
      });
     var mainFolderSettings = new resolveSettings().resolveFolderSettings(mainFolderId);
     
     if(mainFolderSettings.sendToBureau){
      alert(mainFolderSettings.sendToBureau)
      ApiCalls.addNewReportWithBureauSend(
        new resolveSettings().resolveUserId(),
        folderId == null ? mainFolderId : folderId,
        subject,
        content,
        mainFolderId,
        mainFolderSettings.FolderType,
        JSON.stringify(uploadFiles),
        mainFolderSettings.BureauSendReportID,
        mainFolderSettings.BureauSendNewstype,
        mainFolderSettings.BureauID
      )
        .then((responseJson) => {
          if (responseJson.Data.hasError) {
            dispatch(setAddItemModalLoading(false));
            enqueueSnackbar(responseJson.Data.error, {
              variant: "error",
            });
          } else {
            dispatch(setAddItemModalToggle(false));
            dispatch(resetAddItemModal());
            dispatch(resetUploadAttachmentsModal());
            enqueueSnackbar("Report add successfully.", {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          dispatch(setAddItemModalLoading(false));
          enqueueSnackbar("Error occured.Please contact admin.", {
            variant: "error",
          });
        });

     }else{
     
     ApiCalls.addNewReport(
        new resolveSettings().resolveUserId(),
        folderId == null ? mainFolderId : folderId,
        subject,
        content,
        mainFolderId,
        mainFolderSettings.FolderType,
        JSON.stringify(uploadFiles)
      )
        .then((responseJson) => {
          if (!responseJson.Data) {
            dispatch(setAddItemModalLoading(false));
            enqueueSnackbar("Error occured. Please try again.", {
              variant: "error",
            });
          } else {
            dispatch(setAddItemModalToggle(false));
            dispatch(resetAddItemModal());
            dispatch(resetUploadAttachmentsModal());
            enqueueSnackbar("Report add successfully.", {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          dispatch(setAddItemModalLoading(false));
          enqueueSnackbar("Error occured.Please contact admin.", {
            variant: "error",
          });
        });
      }
}
