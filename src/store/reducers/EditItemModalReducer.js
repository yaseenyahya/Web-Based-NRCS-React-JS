import {
  EDIT_ITEM_MODAL_TOGGLE,
  EDIT_ITEM_MODAL_LOADING,
  EDIT_ITEM_MODAL_FOLDER_DATA,
  EDIT_ITEM_MODAL_SUBJECT,
  EDIT_ITEM_MODAL_CONTENT,
  EDIT_ITEM_MODAL_RESET,
  EDIT_ITEM_MODAL_MAIN_TOP_CONTAINER_HEIGHT,
  EDIT_ITEM_MODAL_MAIN_MIDDLE_CONTAINER_HEIGHT,
  EDIT_ITEM_MODAL_MAIN_BOTTOM_CONTAINER_HEIGHT,
} from "../ActionTypes";
export const EditItemModalReducer = (
  state = {
    editItemModalToggle: false,
    editItemModalLoading: false,
    editItemModalFolderData: null,
    editItemModalSubject: "",
    editItemModalContent: "",
    editItemModalMainTopContainerHeight: 0,
    editItemModalMainMiddleContainerHeight: 0,
    editItemModalMainBottomContainerHeight: 0,
  },
  action
) => {
  switch (action.type) {
    case EDIT_ITEM_MODAL_TOGGLE:
      return Object.assign({}, state, {
        editItemModalToggle: action.payload.editItemModalToggle,
      });
    case EDIT_ITEM_MODAL_LOADING:
      return Object.assign({}, state, {
        editItemModalLoading: action.payload.editItemModalLoading,
      });
    case EDIT_ITEM_MODAL_FOLDER_DATA:
      return Object.assign({}, state, {
        editItemModalFolderData: action.payload.editItemModalFolderData,
      });
    case EDIT_ITEM_MODAL_SUBJECT:
      return Object.assign({}, state, {
        editItemModalSubject: action.payload.editItemModalSubject,
      });
    case EDIT_ITEM_MODAL_CONTENT:
      return Object.assign({}, state, {
        editItemModalContent: action.payload.editItemModalContent,
      });
    case EDIT_ITEM_MODAL_MAIN_TOP_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        editItemModalMainTopContainerHeight:
          action.payload.editItemModalMainTopContainerHeight,
      });
    case EDIT_ITEM_MODAL_MAIN_MIDDLE_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        editItemModalMainMiddleContainerHeight:
          action.payload.editItemModalMainMiddleContainerHeight,
      });
    case EDIT_ITEM_MODAL_MAIN_BOTTOM_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        editItemModalMainBottomContainerHeight:
          action.payload.editItemModalMainBottomContainerHeight,
      });
    case EDIT_ITEM_MODAL_RESET:
      return Object.assign({}, state, {
        editItemModalLoading: action.payload.editItemModalLoading,
        editItemModalFolderData: action.payload.editItemModalFolderData,
        editItemModalSubject: action.payload.editItemModalSubject,
        editItemModalContent: action.payload.editItemModalContent,
      });
    default:
      return state;
  }
};
