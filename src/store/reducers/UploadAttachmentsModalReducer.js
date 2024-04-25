import {
  UPLOAD_ATTACHMENTS_MODAL_TOGGLE,
  UPLOAD_ATTACHMENTS_MODAL_FILES_DATA,
  UPLOAD_ATTACHMENTS_MODAL_RESET
} from "../ActionTypes";
export const UploadAttachmentsModalReducer = (
  state = {
    uploadAttachmentsModalToggle: false,
    uploadAttachmentsModalFilesData: [],
  },
  action
) => {
  switch (action.type) {
    case UPLOAD_ATTACHMENTS_MODAL_TOGGLE:
      return Object.assign({}, state, {
        uploadAttachmentsModalToggle: action.payload.uploadAttachmentsModalToggle,
      });
    case UPLOAD_ATTACHMENTS_MODAL_FILES_DATA:
      return Object.assign({}, state, {
        uploadAttachmentsModalFilesData: action.payload.uploadAttachmentsModalFilesData,
      });
      case UPLOAD_ATTACHMENTS_MODAL_RESET:
      return Object.assign({}, state, {
        uploadAttachmentsModalFilesData: action.payload.uploadAttachmentsModalFilesData,
      });
    default:
      return state;
  }
};
