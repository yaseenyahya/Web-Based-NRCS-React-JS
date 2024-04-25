import {
  CAMERA_MODAL_TOGGLE
} from "../ActionTypes";
export const CameraModalReducer = (
  state = {
    cameraModalToggle: false,
  },
  action
) => {
  switch (action.type) {
    case CAMERA_MODAL_TOGGLE:
      return Object.assign({}, state, {
        cameraModalToggle: action.payload.cameraModalToggle,
      });
    default:
      return state;
  }
};
