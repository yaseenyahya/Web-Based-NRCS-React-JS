import {
  EDIT_ITEM_MODAL_TOGGLE,
  EDIT_ITEM_MODAL_LOADING,
  EDIT_ITEM_MODAL_FOLDER_DATA,
  EDIT_ITEM_MODAL_SUBJECT,
  EDIT_ITEM_MODAL_CONTENT,
  EDIT_ITEM_MODAL_RESET,
  EDIT_ITEM_MODAL_MAIN_TOP_CONTAINER_HEIGHT,
  EDIT_ITEM_MODAL_MAIN_MIDDLE_CONTAINER_HEIGHT,
  EDIT_ITEM_MODAL_MAIN_BOTTOM_CONTAINER_HEIGHT,
} from "../ActionTypes";
import ApiCalls from "../../api/ApiCalls";
import { resolveSettings } from "../../auth/resolveSettings";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "./DialogActions";
import { uploadFileStatusType } from "../../components/UploadAttachmentsModal/uploadFileStatusType";
import uploadIncludes from "../../components/UploadAttachmentsModal/includes";
import omit from "lodash/omit";
export const setEditItemModalToggle = (editItemModalToggle) => {
  return {
    type: EDIT_ITEM_MODAL_TOGGLE,
    payload: {
      editItemModalToggle: editItemModalToggle,
    },
  };
};
export const setEditItemModalLoading = (editItemModalLoading) => {
  return {
    type: EDIT_ITEM_MODAL_LOADING,
    payload: {
      editItemModalLoading: editItemModalLoading,
    },
  };
};

export const setEditItemModalFolderData = (editItemModalFolderData) => {
  return {
    type: EDIT_ITEM_MODAL_FOLDER_DATA,
    payload: {
      editItemModalFolderData: editItemModalFolderData,
    },
  };
};

export const setEditItemModalSubject = (editItemModalSubject) => {
  return {
    type: EDIT_ITEM_MODAL_SUBJECT,
    payload: {
      editItemModalSubject: editItemModalSubject,
    },
  };
};

export const setEditItemModalContent = (editItemModalContent) => {
  return {
    type: EDIT_ITEM_MODAL_CONTENT,
    payload: {
      editItemModalContent: editItemModalContent,
    },
  };
};
export const setEditItemModalMainTopContainerHeight = (
  editItemModalMainTopContainerHeight
) => {
  return {
    type: EDIT_ITEM_MODAL_MAIN_TOP_CONTAINER_HEIGHT,
    payload: {
      editItemModalMainTopContainerHeight: editItemModalMainTopContainerHeight,
    },
  };
};
export const setEditItemModalMainMiddleContainerHeight = (
  editItemModalMainMiddleContainerHeight
) => {
  return {
    type: EDIT_ITEM_MODAL_MAIN_MIDDLE_CONTAINER_HEIGHT,
    payload: {
      editItemModalMainMiddleContainerHeight: editItemModalMainMiddleContainerHeight,
    },
  };
};
export const setEditItemModalMainBottomContainerHeight = (
  editItemModalMainBottomContainerHeight
) => {
  return {
    type: EDIT_ITEM_MODAL_MAIN_BOTTOM_CONTAINER_HEIGHT,
    payload: {
      editItemModalMainBottomContainerHeight: editItemModalMainBottomContainerHeight,
    },
  };
};
export const resetEditItemModal = () => {
  return {
    type: EDIT_ITEM_MODAL_RESET,
    payload: {
      editItemModalLoading: false,
      editItemModalFolderData: null,
      editItemModalSubject: "",
      editItemModalContent: "",
    },
  };
};
export const editItemToFolder = (enqueueSnackbar) => {
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
          dispatchEditItemToFolder(dispatch, getState,enqueueSnackbar);
          
        })
      );
      dispatch(setDialogOpen(true));
    } else {
      dispatchEditItemToFolder(dispatch, getState,enqueueSnackbar);
    }
    
  };
};


const dispatchEditItemToFolder=(dispatch, getState,enqueueSnackbar)=>{
  dispatch(setEditItemModalLoading(true));

    let folderId = getState().TreeViewReducer.treeViewItemInfo.info
      .innerfolderid;
    let subject = getState().EditItemModalReducer.editItemModalSubject;
    let content = getState().EditItemModalReducer.editItemModalContent;
    let itemId = getState().TreeViewReducer.treeViewItemInfo.info.id;
    let mainFolderId = getState().TreeViewReducer.treeViewItemInfo.info
      .mainfolderid;
    let type = getState().TreeViewReducer.treeViewItemInfo.info.type;
    let uploadFiles = new uploadIncludes().getUploadFilesbyStatus(
      getState().UploadAttachmentsModalReducer
        .uploadAttachmentsModalFilesData,
      uploadFileStatusType.uploaded
    );
    uploadFiles = uploadFiles.map(function (o) {
      return Object.assign(
        {
          filenameCreated: o.filename,
          already_upload_status:o.type
        },
        omit(o, "filename")
        
      );
    });
  
    ApiCalls.updateReport(
      folderId == null ? mainFolderId : folderId,
      new resolveSettings().resolveUserId(),
      itemId,
      subject,
      content,
      type,
      JSON.stringify(
        uploadFiles
      )
    )
      .then((responseJson) => {
        if (!responseJson.Data) {
          dispatch(setEditItemModalLoading(false));
          enqueueSnackbar("Error occured. Please try again.", {
            variant: "error",
          });
        } else {
          dispatch(setEditItemModalLoading(false));

          dispatch(setDialogOkText("Close"));
          dispatch(setDialogTitle("Confirm"));
          dispatch(setDialogContent("Report saved succesfully."));
          dispatch(setDialogCancelText("Edit"));
          dispatch(
            setDialogOkClick(() => {
              dispatch(setDialogOpen(false));
              dispatch(setEditItemModalToggle(false));
            })
          );
          dispatch(setDialogOpen(true));
        }
      })
      .catch((error) => {
        dispatch(setEditItemModalLoading(false));
        enqueueSnackbar("Error occured.Please contact admin.", {
          variant: "error",
        });
      });
}
