import {
  SWITCH_ACCOUNT_MODAL_TOGGLE,
  SWITCH_ACCOUNT_MODAL_SEARCH_TEXT_INPUT,
  SWITCH_ACCOUNT_MODAL_SEARCH_TEXT,
  SWITCH_ACCOUNT_MODAL_TABLE_DATA,
  SWITCH_ACCOUNT_MODAL_LOADING,
  SWITCH_ACCOUNT_MODAL_SELECTED_USER,
  SWITCH_ACCOUNT_MODAL_MAIN_TOP_CONTAINER_HEIGHT,
  SWITCH_ACCOUNT_MODAL_SEARCH_TABLE_DATA,
  SWITCH_ACCOUNT_MODAL_RESET,
} from "../ActionTypes";
export const SwitchAccountModalReducer = (
  state = {
    switchAccountModalToggle: false,
    switchAccountModalSearchTextInput: "",
    switchAccountModalSearchText: "",
    switchAccountModalTableData: null,
    switchAccountModalLoading: true,
    switchAccountModalSelectedUser: null,
    switchAccountModalMainTopContainerHeight: 74,
    switchAccountModalSearchTableData: null,
  },
  action
) => {
  switch (action.type) {
    case SWITCH_ACCOUNT_MODAL_TOGGLE:
      return Object.assign({}, state, {
        switchAccountModalToggle: action.payload.switchAccountModalToggle,
      });
    case SWITCH_ACCOUNT_MODAL_SEARCH_TEXT_INPUT:
      return Object.assign({}, state, {
        switchAccountModalSearchTextInput:
          action.payload.switchAccountModalSearchTextInput,
      });
    case SWITCH_ACCOUNT_MODAL_SEARCH_TEXT:
      return Object.assign({}, state, {
        switchAccountModalSearchText:
          action.payload.switchAccountModalSearchText,
      });
    case SWITCH_ACCOUNT_MODAL_TABLE_DATA:
      return Object.assign({}, state, {
        switchAccountModalTableData: action.payload.switchAccountModalTableData,
      });
    case SWITCH_ACCOUNT_MODAL_LOADING:
      return Object.assign({}, state, {
        switchAccountModalLoading: action.payload.switchAccountModalLoading,
      });
    case SWITCH_ACCOUNT_MODAL_SELECTED_USER:
      return Object.assign({}, state, {
        switchAccountModalSelectedUser:
          action.payload.switchAccountModalSelectedUser,
      });
    case SWITCH_ACCOUNT_MODAL_MAIN_TOP_CONTAINER_HEIGHT:
      return Object.assign({}, state, {
        switchAccountModalMainTopContainerHeight:
          action.payload.switchAccountModalMainTopContainerHeight,
      });
    case SWITCH_ACCOUNT_MODAL_SEARCH_TABLE_DATA:
      return Object.assign({}, state, {
        switchAccountModalSearchTableData:
          action.payload.switchAccountModalSearchTableData,
      });
    case SWITCH_ACCOUNT_MODAL_RESET:
      return Object.assign({}, state, {
        switchAccountModalSearchTextInput:
          action.payload.switchAccountModalSearchTextInput,
          switchAccountModalSearchText:
          action.payload.switchAccountModalSearchText,
          switchAccountModalTableData:
          action.payload.switchAccountModalTableData,
          switchAccountModalSearchTableData:
          action.payload.switchAccountModalSearchTableData,
      });
    default:
      return state;
  }
};
