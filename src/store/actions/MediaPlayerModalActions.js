import {
  MEDIA_PLAYER_MODAL_FILES,
  MEDIA_PLAYER_MODAL_TOGGLE,
  MEDIA_PLAYER_MODAL_SELECTED_FILE,
  MEDIA_IMAGE_CONTAINER_WIDTH,
  MEDIA_DOWNLOAD_INFO,
} from "../ActionTypes";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "./DialogActions";
import axios from "axios";
export const setMediaPlayerModalFiles = (mediaPlayerModalFiles) => {
  return {
    type: MEDIA_PLAYER_MODAL_FILES,
    payload: {
      mediaPlayerModalFiles: mediaPlayerModalFiles,
    },
  };
};
export const setMediaDownloadInfo = (mediaDownloadInfo) => {
  return {
    type: MEDIA_DOWNLOAD_INFO,
    payload: {
      mediaDownloadInfo: mediaDownloadInfo,
    },
  };
};
export const startMediaDownload = (fileName, fileLink) => {
  return function (dispatch, getState) {
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get(fileLink, {
        responseType: "blob",
        cancelToken: cancelTokenSource.token,
        onDownloadProgress: function (progressEvent) {
          let currentMediaDownloadInfo = getState().MediaPlayerModalReducer
            .mediaDownloadInfo;
          if (currentMediaDownloadInfo) {
            dispatch({
              type: MEDIA_DOWNLOAD_INFO,
              payload: {
                mediaDownloadInfo: {
                  fileName: currentMediaDownloadInfo.fileName,
                  fileLink: currentMediaDownloadInfo.fileLink,
                  cancelToken: currentMediaDownloadInfo.cancelToken,
                  progress: (progressEvent.loaded / progressEvent.total) * 100,
                },
              },
            });
          }
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
        dispatch({
          type: MEDIA_DOWNLOAD_INFO,
          payload: {
            mediaDownloadInfo: null,
          },
        });
      })
      .catch((err) => {
        console.log("media", err);
        if (!axios.isCancel(err)) {
          dispatch(setDialogOkText("OK"));
          dispatch(setDialogTitle("Error"));
          dispatch(setDialogContent("Error occurred while downloading."));
          dispatch(setDialogCancelText(null));
          dispatch(
            setDialogOkClick(() => {
              dispatch(setDialogOpen(false));
            })
          );
          dispatch(setDialogOpen(true));
        }
        dispatch({
          type: MEDIA_DOWNLOAD_INFO,
          payload: {
            mediaDownloadInfo: null,
          },
        });
      });

    dispatch({
      type: MEDIA_DOWNLOAD_INFO,
      payload: {
        mediaDownloadInfo: {
          fileName: fileName,
          fileLink: fileLink,
          cancelToken: cancelTokenSource,
          progress: 0,
        },
      },
    });
  };
};
export const setMediaPlayerModalToggle = (mediaPlayerModalToggle) => {
  return {
    type: MEDIA_PLAYER_MODAL_TOGGLE,
    payload: {
      mediaPlayerModalToggle: mediaPlayerModalToggle,
    },
  };
};
export const setMediaPlayerModalSelectedFile = (
  mediaPlayerModalSelectedFile
) => {
  return {
    type: MEDIA_PLAYER_MODAL_SELECTED_FILE,
    payload: {
      mediaPlayerModalSelectedFile: mediaPlayerModalSelectedFile,
    },
  };
};
export const setMediaImageContainerWidth = (mediaImageContainerWidth) => {
  return {
    type: MEDIA_IMAGE_CONTAINER_WIDTH,
    payload: {
      mediaImageContainerWidth: mediaImageContainerWidth,
    },
  };
};
