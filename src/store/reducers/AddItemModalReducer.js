import {
  ADD_ITEM_MODAL_TOGGLE,
  ADD_ITEM_MODAL_LOADING,
  ADD_ITEM_MODAL_SELECTED_FOLDER_ID,
  ADD_ITEM_MODAL_FOLDER_DATA,
  ADD_ITEM_MODAL_SUBJECT,
  ADD_ITEM_MODAL_CONTENT,
  ADD_ITEM_MODAL_RESET,
  ADD_ITEM_MODAL_MAIN_TOP_CONTAINER_HEIGHT,
  ADD_ITEM_MODAL_MAIN_MIDDLE_CONTAINER_HEIGHT,
  ADD_ITEM_MODAL_MAIN_BOTTOM_CONTAINER_HEIGHT,
} from "../ActionTypes";
export const AddItemModalReducer = (
  state = {
    addItemModalToggle: false,
    addItemModalLoading: false,
    addItemModalSelectedFolderId: null,
    addItemModalFolderData: null,
    addItemModalSubject: "",
    addItemModalContent: "",
    addItemModalMainTopContainerHeight: 0,
    addItemModalMainMiddleContainerHeight: 0,
    addItemModalMainBottomContainerHeight: 0,
  },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_MODAL_TOGGLE:
      return Object.assign({}, state, {
        addItemModalToggle: action.payload.addItemModalToggle,
      });
    case ADD_ITEM_MODAL_LOADING:
      return Object.assign({}, state, {
        addItemModalLoading: action.payload.addItemModalLoading,
      });
    case ADD_ITEM_MODAL_SELECTED_FOLDER_ID:
      return Object.assign({}, state, {
        addItemModalSelectedFolderId:
          action.payload.addItemModalSelectedFolderId,
      });
    case ADD_ITEM_MODAL_FOLDER_DATA:
      return Object.assign({}, state, {
        addItemModalFolderData: action.payload.addItemModalFolderData,
      });
    case ADD_ITEM_MODAL_SUBJECT:
      return Object.assign({}, state, {
        addItemModalSubject: action.payload.addItemModalSubject,
      });
    case ADD_ITEM_MODAL_CONTENT:
      return Object.assign({}, state, {
        addItemModalContent: action.payload.addItemModalContent,
      });
    case ADD_ITEM_MODAL_MAIN_TOP_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        addItemModalMainTopContainerHeight:
          action.payload.addItemModalMainTopContainerHeight,
      });
    case ADD_ITEM_MODAL_MAIN_MIDDLE_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        addItemModalMainMiddleContainerHeight:
          action.payload.addItemModalMainMiddleContainerHeight,
      });
    case ADD_ITEM_MODAL_MAIN_BOTTOM_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        addItemModalMainBottomContainerHeight:
          action.payload.addItemModalMainBottomContainerHeight,
      });
    case ADD_ITEM_MODAL_RESET:
      return Object.assign({}, state, {
        addItemModalLoading: action.payload.addItemModalLoading,
        addItemModalSelectedFolderId:
          action.payload.addItemModalSelectedFolderId,
        addItemModalFolderData: action.payload.addItemModalFolderData,
        addItemModalSubject: action.payload.addItemModalSubject,
        addItemModalContent: action.payload.addItemModalContent,
      });
    default:
      return state;
  }
};
