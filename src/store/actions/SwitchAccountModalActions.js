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
import filter from "lodash/filter";
export const setSwitchAccountModalToggle = (switchAccountModalToggle) => {
  return {
    type: SWITCH_ACCOUNT_MODAL_TOGGLE,
    payload: {
      switchAccountModalToggle: switchAccountModalToggle,
    },
  };
};

export const setSwitchAccountModalSearchTextInput = (
  switchAccountModalSearchTextInput
) => {
  return {
    type: SWITCH_ACCOUNT_MODAL_SEARCH_TEXT_INPUT,
    payload: {
      switchAccountModalSearchTextInput: switchAccountModalSearchTextInput,
    },
  };
};
export const setSwitchAccountModalSearchText = (
  switchAccountModalSearchText
) => {
  return {
    type: SWITCH_ACCOUNT_MODAL_SEARCH_TEXT,
    payload: {
      switchAccountModalSearchText: switchAccountModalSearchText,
    },
  };
};

export const switchAccountModalSearch = () => {
  return function (dispatch, getState) {
    dispatch(setSwitchAccountModalLoading(true));
    const switchAccountModalSearchText = getState().SwitchAccountModalReducer
      .switchAccountModalSearchTextInput;
    dispatch(setSwitchAccountModalSearchText(switchAccountModalSearchText));
    let switchAccountModalTableData = getState().SwitchAccountModalReducer
      .switchAccountModalTableData;
    if (switchAccountModalSearchText.trim() != "") {
      let filterUsersTableData = filter(
        switchAccountModalTableData,
        (row) =>
          row.data[0].text
            .toLowerCase()
            .includes(switchAccountModalSearchText.toLowerCase()) ||
          row.data[1].text
            .toLowerCase()
            .includes(switchAccountModalSearchText.toLowerCase()) ||
          row.data[2].text
            .toLowerCase()
            .includes(switchAccountModalSearchText.toLowerCase()) ||
          row.data[3].text
            .toLowerCase()
            .includes(switchAccountModalSearchText.toLowerCase())
      );

      dispatch(setSwitchAccountModalSearchTableData(filterUsersTableData));
      dispatch(setSwitchAccountModalLoading(false));
    }
  };
};

export const setSwitchAccountModalTableData = (switchAccountModalTableData) => {
  return {
    type: SWITCH_ACCOUNT_MODAL_TABLE_DATA,
    payload: {
      switchAccountModalTableData: switchAccountModalTableData,
    },
  };
};
export const setSwitchAccountModalLoading = (switchAccountModalLoading) => {
  return {
    type: SWITCH_ACCOUNT_MODAL_LOADING,
    payload: {
      switchAccountModalLoading: switchAccountModalLoading,
    },
  };
};
export const setSwitchAccountModalSelectedUser = (
  switchAccountModalSelectedUser
) => {
  return {
    type: SWITCH_ACCOUNT_MODAL_SELECTED_USER,
    payload: {
      switchAccountModalSelectedUser: switchAccountModalSelectedUser,
    },
  };
};
export const setSwitchAccountModalMainTopContainerHeight = (
  switchAccountModalMainTopContainerHeight
) => {
  return {
    type: SWITCH_ACCOUNT_MODAL_MAIN_TOP_CONTAINER_HEIGHT,
    payload: {
      switchAccountModalMainTopContainerHeight: switchAccountModalMainTopContainerHeight,
    },
  };
};
export const setSwitchAccountModalSearchTableData = (
  switchAccountModalSearchTableData
) => {
  return {
    type: SWITCH_ACCOUNT_MODAL_SEARCH_TABLE_DATA,
    payload: {
      switchAccountModalSearchTableData: switchAccountModalSearchTableData,
    },
  };
};
export const resetSwitchAccountModal = () => {
  return {
    type: SWITCH_ACCOUNT_MODAL_RESET,
    payload: {
      switchAccountModalSearchTextInput: "",
      switchAccountModalSearchText: "",
      switchAccountModalTableData: null,
      switchAccountModalSearchTableData: null,
    },
  };
};
