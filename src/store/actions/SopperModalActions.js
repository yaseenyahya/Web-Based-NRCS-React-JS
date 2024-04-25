import {
  SOPPER_MODAL_TOGGLE,
  SOPPER_MODAL_TEXT,
  SOPPER_MODAL_TEXT_LOADING
} from "../ActionTypes";
export const setSopperModalToggle = (sopperModalToggle) => {
  return {
    type: SOPPER_MODAL_TOGGLE,
    payload: {
      sopperModalToggle: sopperModalToggle,
    },
  };
};
export const setSopperModalText = (sopperModalText) => {
  return {
    type: SOPPER_MODAL_TEXT,
    payload: {
      sopperModalText: sopperModalText,
    },
  };
};
export const setSopperModalTextLoading = (sopperModalTextLoading) => {
  return {
    type: SOPPER_MODAL_TEXT_LOADING,
    payload: {
      sopperModalTextLoading: sopperModalTextLoading,
    },
  };
};


