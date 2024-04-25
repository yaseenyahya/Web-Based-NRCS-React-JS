import {
CAMERA_MODAL_TOGGLE
} from "../ActionTypes";
export const setCameraModalToggle = (cameraModalToggle) => {
  return {
    type: CAMERA_MODAL_TOGGLE,
    payload: {
      cameraModalToggle: cameraModalToggle,
    },
  };
};


