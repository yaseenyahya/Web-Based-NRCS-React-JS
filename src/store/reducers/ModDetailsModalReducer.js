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

export const ModDetailsModalReducer = (
  state = {
    modDetailsModalToggle: false,
    modDetailsModalTitle: "",
    modDetailsModalContentText: "",
    modDetailsModalReadDetails: null,
    modDetailsModalReadDetailsContainerToggle: false,
    modDetailsModalCorrectionDetails: null,
    modDetailsModalCorrectionDetailsContainerToggle: false,
    modDetailsModalArrowPreviousActive: false,
    modDetailsModalArrowNextActive: true,
    modDetailsModalLoading: true,
  },
  action
) => {
  switch (action.type) {
    case MOD_DETAILS_MODAL_TOGGLE:
      return Object.assign({}, state, {
        modDetailsModalToggle: action.payload.modDetailsModalToggle,
      });
    case MOD_DETAILS_MODAL_TITLE:
      return Object.assign({}, state, {
        modDetailsModalTitle: action.payload.modDetailsModalTitle,
      });
    case MOD_DETAILS_MODAL_CONTENT_TEXT:
      return Object.assign({}, state, {
        modDetailsModalContentText: action.payload.modDetailsModalContentText,
      });
    case MOD_DETAILS_MODAL_READ_DETAILS:
      return Object.assign({}, state, {
        modDetailsModalReadDetails: action.payload.modDetailsModalReadDetails,
      });
    case MOD_DETAILS_MODAL_READ_DETAILS_CONTAINER_TOGGLE:
      return Object.assign({}, state, {
        modDetailsModalReadDetailsContainerToggle:
          action.payload.modDetailsModalReadDetailsContainerToggle,
      });

    case MOD_DETAILS_MODAL_CORRECTION_DETAILS:
      return Object.assign({}, state, {
        modDetailsModalCorrectionDetails:
          action.payload.modDetailsModalCorrectionDetails,
      });
    case MOD_DETAILS_MODAL_CORRECTION_DETAILS_CONTAINER_TOGGLE:
      return Object.assign({}, state, {
        modDetailsModalCorrectionDetailsContainerToggle:
          action.payload.modDetailsModalCorrectionDetailsContainerToggle,
      });
    case MOD_DETAILS_MODAL_ARROW_PREVIOUS_ACTIVE:
      return Object.assign({}, state, {
        modDetailsModalArrowPreviousActive:
          action.payload.modDetailsModalArrowPreviousActive,
      });
    case MOD_DETAILS_MODAL_ARROW_NEXT_ACTIVE:
      return Object.assign({}, state, {
        modDetailsModalArrowNextActive:
          action.payload.modDetailsModalArrowNextActive,
      });
    case MOD_DETAILS_MODAL_LOADING:
      return Object.assign({}, state, {
        modDetailsModalLoading: action.payload.modDetailsModalLoading,
      });
    case MOD_DETAILS_MODAL_RESET:
      return Object.assign({}, state, {
        modDetailsModalTitle: action.payload.modDetailsModalTitle,
        modDetailsModalContentText: action.payload.modDetailsModalContentText,
        modDetailsModalReadDetails: action.payload.modDetailsModalReadDetails,
        modDetailsModalReadDetailsContainerToggle:
          action.payload.modDetailsModalReadDetailsContainerToggle,
        modDetailsModalCorrectionDetails:
          action.payload.modDetailsModalCorrectionDetails,
        modDetailsModalCorrectionDetailsContainerToggle:
          action.payload.modDetailsModalCorrectionDetailsContainerToggle,
        modDetailsModalArrowPreviousActive:
          action.payload.modDetailsModalArrowPreviousActive,
        modDetailsModalArrowNextActive:
          action.payload.modDetailsModalArrowNextActive,
        modDetailsModalLoading: action.payload.modDetailsModalLoading,
      });
    default:
      return state;
  }
};
