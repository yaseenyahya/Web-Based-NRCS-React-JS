import {
  SAVE_AS_MODAL_TOGGLE,
  SAVE_AS_MODAL_SELECTED_FOLDER_INFO,
  SAVE_AS_MODAL_RADIO_DATA,
  SAVE_AS_MODAL_LOADING,
  SAVE_AS_MODAL_RADIO_MAIN_TOP_CONTAINER_HEIGHT,
  SAVE_AS_MODAL_RADIO_MAIN_BOTTOM_CONTAINER_HEIGHT,
} from "../ActionTypes";
export const SaveAsModalReducer = (
  state = {
    saveAsModalToggle: false,
    saveAsModalSelectedFolderInfo: null,
    saveAsModalRadioData: null,
    saveAsModalLoading: false,
    saveAsModalRadioMainTopContainerHeight: 0,
    saveAsModalRadioMainBottomContainerHeight: 0,
  },
  action
) => {
  switch (action.type) {
    case SAVE_AS_MODAL_TOGGLE:
      return Object.assign({}, state, {
        saveAsModalToggle: action.payload.saveAsModalToggle,
      });
    case SAVE_AS_MODAL_SELECTED_FOLDER_INFO:
      return Object.assign({}, state, {
        saveAsModalSelectedFolderInfo:
          action.payload.saveAsModalSelectedFolderInfo,
      });
    case SAVE_AS_MODAL_RADIO_DATA:
      return Object.assign({}, state, {
        saveAsModalRadioData: action.payload.saveAsModalRadioData,
      });
    case SAVE_AS_MODAL_LOADING:
      return Object.assign({}, state, {
        saveAsModalLoading: action.payload.saveAsModalLoading,
      });
    case SAVE_AS_MODAL_RADIO_MAIN_TOP_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        saveAsModalRadioMainTopContainerHeight:
          action.payload.saveAsModalRadioMainTopContainerHeight,
      });
    case SAVE_AS_MODAL_RADIO_MAIN_BOTTOM_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        saveAsModalRadioMainBottomContainerHeight:
          action.payload.saveAsModalRadioMainBottomContainerHeight,
      });
    default:
      return state;
  }
};
