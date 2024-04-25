import {
  UPLOAD_ATTACHMENTS_MODAL_TOGGLE,
  UPLOAD_ATTACHMENTS_MODAL_FILES_DATA,
  UPLOAD_ATTACHMENTS_MODAL_RESET,
} from "../ActionTypes";
import _ from "lodash";
import { uploadFileStatusType } from "../../components/UploadAttachmentsModal/uploadFileStatusType";
import * as tus from "tus-js-client";
import { resolveSettings } from "../../auth/resolveSettings";
import UploadAttachmentsModalIncludes from "../../components/UploadAttachmentsModal/includes";
export const setUploadAttachmentsModalToggle = (
  uploadAttachmentsModalToggle
) => {
  return {
    type: UPLOAD_ATTACHMENTS_MODAL_TOGGLE,
    payload: {
      uploadAttachmentsModalToggle: uploadAttachmentsModalToggle,
    },
  };
};
export const startUploadIfNotStartedLastFile = (enqueueSnackbar) => {
  return async function (dispatch, getState) {
    
    if(new resolveSettings().resolveFolderName() != "."){
    var uploadAttachmentsModalFilesData_ = getState()
      .UploadAttachmentsModalReducer.uploadAttachmentsModalFilesData;
      
    const uploadAttachmentsModalFilesDataUploading = _.find(
      uploadAttachmentsModalFilesData_,
      (file) => file.status == uploadFileStatusType.uploading
    );

    if (uploadAttachmentsModalFilesDataUploading == undefined) {
      var uploadAttachmentsModalFilesDataReverse = _.cloneDeep(
        uploadAttachmentsModalFilesData_
      ).reverse();
      var currentFileObj = _.find(
        uploadAttachmentsModalFilesDataReverse,
        (item) =>
          item.status == uploadFileStatusType.failed ||
          item.status == uploadFileStatusType.pending
      );
     
      if (currentFileObj) {
        await new UploadAttachmentsModalIncludes().createFileNameIfNotCreated(
          currentFileObj
        );

        if (currentFileObj.status == uploadFileStatusType.pending || currentFileObj.status == uploadFileStatusType.failed) {
          var upload = new tus.Upload(currentFileObj.fileForUpload, {
            endpoint: new resolveSettings().resolveFileUploadFolderSource(),
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
              filename:
                currentFileObj.filenameCreated != undefined
                  ? currentFileObj.filenameCreated
                  : currentFileObj.filename,
              dir:  new resolveSettings().resolveFolderName(),
            },
            onError: function (error) {
             console.log(error)
              const uploadAttachmentsModalFilesDataForUpdate = getState()
                .UploadAttachmentsModalReducer.uploadAttachmentsModalFilesData;
              const uploadAttachmentsModalFilesDataForUpdateFile = _.find(
                uploadAttachmentsModalFilesDataForUpdate,
                (file) => file.filename == currentFileObj.filename
              );
              if (uploadAttachmentsModalFilesDataForUpdateFile) {
                uploadAttachmentsModalFilesDataForUpdateFile.status =
                  uploadFileStatusType.failed;
                dispatch({
                  type: UPLOAD_ATTACHMENTS_MODAL_FILES_DATA,
                  payload: {
                    uploadAttachmentsModalFilesData: _.cloneDeep(
                      uploadAttachmentsModalFilesDataForUpdate
                    ),
                  },
                });
              }
              setTimeout(()=>{
                dispatch(startUploadIfNotStartedLastFile(enqueueSnackbar));
              },1000)
             
            },
            onProgress: function (bytesUploaded, bytesTotal) {
            
              var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
              const uploadAttachmentsModalFilesDataForUpdate = getState()
                .UploadAttachmentsModalReducer.uploadAttachmentsModalFilesData;

              const uploadAttachmentsModalFilesDataForUpdateFile = _.find(
                uploadAttachmentsModalFilesDataForUpdate,
                (file) => file.filename == currentFileObj.filename
              );
              if (uploadAttachmentsModalFilesDataForUpdateFile) {
                uploadAttachmentsModalFilesDataForUpdateFile.uploadStatusPercentage = percentage;

                dispatch({
                  type: UPLOAD_ATTACHMENTS_MODAL_FILES_DATA,
                  payload: {
                    uploadAttachmentsModalFilesData: _.cloneDeep(
                      uploadAttachmentsModalFilesDataForUpdate
                    ),
                  },
                });
              }else{
              upload.abort();
              dispatch(startUploadIfNotStartedLastFile(enqueueSnackbar));
              }
            },
            onSuccess: function () {
              const uploadAttachmentsModalFilesDataForUpdate = getState()
                .UploadAttachmentsModalReducer.uploadAttachmentsModalFilesData;
              const uploadAttachmentsModalFilesDataForUpdateFile = _.find(
                uploadAttachmentsModalFilesDataForUpdate,
                (file) => file.filename == currentFileObj.filename
              );
              if (uploadAttachmentsModalFilesDataForUpdateFile) {
                uploadAttachmentsModalFilesDataForUpdateFile.filename =
                  currentFileObj.filenameCreated;
                uploadAttachmentsModalFilesDataForUpdateFile.status =
                  uploadFileStatusType.uploaded;
                dispatch({
                  type: UPLOAD_ATTACHMENTS_MODAL_FILES_DATA,
                  payload: {
                    uploadAttachmentsModalFilesData: _.cloneDeep(
                      uploadAttachmentsModalFilesDataForUpdate
                    ),
                  },
                });
              }
              dispatch(startUploadIfNotStartedLastFile(enqueueSnackbar));
            },
          });

          uploadAttachmentsModalFilesData_ = getState()
            .UploadAttachmentsModalReducer.uploadAttachmentsModalFilesData;
          const uploadAttachmentsModalFilesDataCurrentFileObj = _.find(
            uploadAttachmentsModalFilesData_,
            (file) => file.filename == currentFileObj.filename
          );
          if (uploadAttachmentsModalFilesDataCurrentFileObj) {
            uploadAttachmentsModalFilesDataCurrentFileObj.tusUploadObj = upload;
            uploadAttachmentsModalFilesDataCurrentFileObj.status =
              uploadFileStatusType.uploading;
          }
          // Start the upload
          upload.start();

          dispatch({
            type: UPLOAD_ATTACHMENTS_MODAL_FILES_DATA,
            payload: {
              uploadAttachmentsModalFilesData: _.cloneDeep(
                uploadAttachmentsModalFilesData_
              ),
            },
          });
        }
      }
    }
  }else{
    enqueueSnackbar(`Directory not found. Please contact admin.`, {
      variant: "error",
    });
  }
  };
};
export const addUploadAttachmentsModalFilesData = (
  uploadAttachmentsModalFilesData,
  enqueueSnackbar
) => {
  return async function (dispatch, getState) {
    const uploadAttachmentsModalFilesData_ = getState()
      .UploadAttachmentsModalReducer.uploadAttachmentsModalFilesData;

    uploadAttachmentsModalFilesData.map((fileData) => {
      if (
        _.find(
          uploadAttachmentsModalFilesData_,
          (file) => file.filename == fileData.filename
        ) == undefined
      )
        uploadAttachmentsModalFilesData_.push(fileData);
      else
        enqueueSnackbar(`File ${fileData.filename} already exist.`, {
          variant: "error",
        });
    });
    dispatch({
      type: UPLOAD_ATTACHMENTS_MODAL_FILES_DATA,
      payload: {
        uploadAttachmentsModalFilesData: _.cloneDeep(
          uploadAttachmentsModalFilesData_
        ),
      },
    });

    dispatch(startUploadIfNotStartedLastFile(enqueueSnackbar));
  };
};
export const setUploadAttachmentsModalFilesData = (
  uploadAttachmentsModalFilesData
) => {
  return function (dispatch, getState) {
    dispatch({
      type: UPLOAD_ATTACHMENTS_MODAL_FILES_DATA,
      payload: {
        uploadAttachmentsModalFilesData: _.cloneDeep(
          uploadAttachmentsModalFilesData
        ),
      },
    });
  };
};
export const resetUploadAttachmentsModal = () => {
  return {
    type: UPLOAD_ATTACHMENTS_MODAL_RESET,
    payload: {
      uploadAttachmentsModalFilesData: [],
    },
  };
};
