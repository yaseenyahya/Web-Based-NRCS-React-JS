import {
  MOD_DETAILS_MODAL_TOGGLE,
  MOD_DETAILS_MODAL_TITLE,
  MOD_DETAILS_MODAL_CONTENT_TEXT,
  MOD_DETAILS_MODAL_READ_DETAILS,
  MOD_DETAILS_MODAL_READ_DETAILS_CONTAINER_TOGGLE,
  MOD_DETAILS_MODAL_CORRECTION_DETAILS,
  MOD_DETAILS_MODAL_CORRECTION_DETAILS_CONTAINER_TOGGLE,
  MOD_DETAILS_MODAL_ARROW_PREVIOUS_ACTIVE,
  MOD_DETAILS_MODAL_ARROW_NEXT_ACTIVE,
  MOD_DETAILS_MODAL_LOADING,
  MOD_DETAILS_MODAL_RESET,
} from "../ActionTypes";
export const setModDetailsModalToggle = (modDetailsModalToggle) => {
  return {
    type: MOD_DETAILS_MODAL_TOGGLE,
    payload: {
      modDetailsModalToggle: modDetailsModalToggle,
    },
  };
};
export const setModDetailsModalTitle = (modDetailsModalTitle) => {
  return {
    type: MOD_DETAILS_MODAL_TITLE,
    payload: {
      modDetailsModalTitle: modDetailsModalTitle,
    },
  };
};
export const setModDetailsModalContentText = (modDetailsModalContentText) => {
  return {
    type: MOD_DETAILS_MODAL_CONTENT_TEXT,
    payload: {
      modDetailsModalContentText: modDetailsModalContentText,
    },
  };
};

export const setModDetailsModalReadDetails = (modDetailsModalReadDetails) => {
  return {
    type: MOD_DETAILS_MODAL_READ_DETAILS,
    payload: {
      modDetailsModalReadDetails: modDetailsModalReadDetails,
    },
  };
};
export const setModDetailsModalReadDetailsContainerToggle = (modDetailsModalReadDetailsContainerToggle) => {
  return {
    type: MOD_DETAILS_MODAL_READ_DETAILS_CONTAINER_TOGGLE,
    payload: {
      modDetailsModalReadDetailsContainerToggle: modDetailsModalReadDetailsContainerToggle,
    },
  };
};

export const setModDetailsModalCorrectionDetails = (
  modDetailsModalCorrectionDetails
) => {
  return {
    type: MOD_DETAILS_MODAL_CORRECTION_DETAILS,
    payload: {
      modDetailsModalCorrectionDetails: modDetailsModalCorrectionDetails,
    },
  };
};
export const setModDetailsModalCorrectionDetailsContainerToggle = (
  modDetailsModalCorrectionDetailsContainerToggle
) => {
  return {
    type: MOD_DETAILS_MODAL_CORRECTION_DETAILS_CONTAINER_TOGGLE,
    payload: {
      modDetailsModalCorrectionDetailsContainerToggle: modDetailsModalCorrectionDetailsContainerToggle,
    },
  };
};
export const setModDetailsModalArrowPreviousActive = (
  modDetailsModalArrowPreviousActive
) => {
  return {
    type: MOD_DETAILS_MODAL_ARROW_PREVIOUS_ACTIVE,
    payload: {
      modDetailsModalArrowPreviousActive: modDetailsModalArrowPreviousActive,
    },
  };
};
export const setModDetailsModalArrowNextActive = (
  modDetailsModalArrowNextActive
) => {
  return {
    type: MOD_DETAILS_MODAL_ARROW_NEXT_ACTIVE,
    payload: {
      modDetailsModalArrowNextActive: modDetailsModalArrowNextActive,
    },
  };
};
export const setModDetailsModalLoading = (modDetailsModalLoading) => {
  return {
    type: MOD_DETAILS_MODAL_LOADING,
    payload: {
      modDetailsModalLoading: modDetailsModalLoading,
    },
  };
};
export const setModDetailsModalReset = () => {
  return {
    type: MOD_DETAILS_MODAL_RESET,
    payload: {
      modDetailsModalTitle: "",
      modDetailsModalContentText: "",
      modDetailsModalReadDetails: null,
      modDetailsModalReadDetailsContainerToggle:false,
      modDetailsModalCorrectionDetails: null,
      modDetailsModalCorrectionDetailsContainerToggle: false,
      modDetailsModalArrowPreviousActive: false,
      modDetailsModalArrowNextActive: true,
      modDetailsModalLoading: true,
    },
  };
};
