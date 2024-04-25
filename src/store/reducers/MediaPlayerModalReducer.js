import {
  MEDIA_PLAYER_MODAL_FILES,
  MEDIA_PLAYER_MODAL_TOGGLE,
  MEDIA_PLAYER_MODAL_SELECTED_FILE,
  MEDIA_IMAGE_CONTAINER_WIDTH,
  MEDIA_DOWNLOAD_INFO
} from "../ActionTypes";
export const MediaPlayerModalReducer = (
  state = {
    mediaPlayerModalFiles: null,
    mediaPlayerModalToggle: false,
    mediaImageContainerWidth:0,
    mediaDownloadInfo:null
  },
  action
) => {
  switch (action.type) {
    case MEDIA_PLAYER_MODAL_FILES:
      return Object.assign({}, state, {
        mediaPlayerModalFiles: action.payload.mediaPlayerModalFiles,
      });
      case MEDIA_DOWNLOAD_INFO:
        return Object.assign({}, state, {
          mediaDownloadInfo: action.payload.mediaDownloadInfo,
        });
    case MEDIA_PLAYER_MODAL_TOGGLE:
      return Object.assign({}, state, {
        mediaPlayerModalToggle: action.payload.mediaPlayerModalToggle,
      });
      case MEDIA_PLAYER_MODAL_SELECTED_FILE:
      return Object.assign({}, state, {
        mediaPlayerModalSelectedFile: action.payload.mediaPlayerModalSelectedFile,
      });
      case MEDIA_IMAGE_CONTAINER_WIDTH:
        return Object.assign({}, state, {
          mediaImageContainerWidth: action.payload.mediaImageContainerWidth,
        });
    default:
      return state;
  }
};
