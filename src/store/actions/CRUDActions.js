import {
  CRUD_SEARCH_INPUT_TEXT,
  CRUD_SEARCH_TEXT_TYPE,
  CRUD_ARCHIVE_SEARCH_MODAL_TOGGLE,
  CRUD_ARCHIVE_DATE_TYPE_MODAL,
  CRUD_RESET_SEARCH,
  CRUD_PANEL_HEIGHT,
  CRUD_ARCHIVE_DATE_INPUT,
  CRUD_ALL_FOLDER_SEARCH_CALENDER_MODAL,
  CRUD_ALL_FOLDER_SEARCH_INPUT_TEXT,
  CRUD_ALL_FOLDER_SEARCH_TEXT,
  CRUD_ALL_FOLDER_SEARCH_DATE_INPUT,
  CRUD_ALL_FOLDER_TEXT_DATE_TYPE_MODAL,

} from "../ActionTypes";
import { SearchTypes } from "../../components/SearchTypes";
import moment from "moment";
export const setSearchInputText = (searchInputText) => {
  return {
    type: CRUD_SEARCH_INPUT_TEXT,
    payload: {
      searchInputText: searchInputText,
    },
  };
};
export const setSearchTextType = () => {
  return function (dispatch, getState) {
    let searchText = getState().CRUDReducer.searchInputText;
    let searchType =
      getState().CRUDReducer.searchType == null
        ? SearchTypes.Current
        : getState().CRUDReducer.searchType;
    let archiveSearchDate = moment();
    if (searchType == SearchTypes.Archive) {
      archiveSearchDate = getState().CRUDReducer.archiveSearchDate;
    }
    dispatch({
      type: CRUD_SEARCH_TEXT_TYPE,
      payload: {
        searchType: searchType,
        searchText: searchText,
        archiveSearchDate: archiveSearchDate,
      },
    });
  };
};

export const setArchiveDateTypeModal = (
  archiveSearchDate,
  searchType,
  archiveSearchModalToggle
) => {
  return {
    type: CRUD_ARCHIVE_DATE_TYPE_MODAL,
    payload: {
      archiveSearchDate: archiveSearchDate,
      searchType: searchType,
      archiveSearchModalToggle: archiveSearchModalToggle,
      searchText: "",
      searchInputText: "",
    },
  };
};
export const setArchiveDateInput = (
  archiveSearchDateInput,

) => {
  return {
    type: CRUD_ARCHIVE_DATE_INPUT,
    payload: {
      archiveSearchDateInput: archiveSearchDateInput,
     
    },
  };
};
export const setArchiveSearchModalToggle = (archiveSearchModalToggle) => {
  return {
    type: CRUD_ARCHIVE_SEARCH_MODAL_TOGGLE,
    payload: {
      archiveSearchModalToggle: archiveSearchModalToggle,
    },
  };
};
export const resetSearch = () => {
  return {
    type: CRUD_RESET_SEARCH,
    payload: {
      archiveSearchDate: [moment(),moment()],
      searchType: null,
      searchText: "",
      searchInputText: "",
      archiveSearchDateInput:[moment(),moment()],
      allFolderSearchInputText: "",
      allFolderSearchText: "",
      allFolderSearchDate: [moment(), moment()],
      allFolderSearchDateInput: [moment(), moment()],
    },
  };
};
export const setCrudPanelHeight = (crudPanelheight) => {
  return {
    type: CRUD_PANEL_HEIGHT,
    payload: {
      crudPanelheight: crudPanelheight,
    },
  };
};
export const setAllFolderSearchCalenderModalToggle = (allFolderSearchCalenderModalToggle) => {
  return {
    type: CRUD_ALL_FOLDER_SEARCH_CALENDER_MODAL,
    payload: {
      allFolderSearchCalenderModalToggle: allFolderSearchCalenderModalToggle,
    },
  };
};

export const setAllFolderSearchInputText = (allFolderSearchInputText) => {
  return {
    type: CRUD_ALL_FOLDER_SEARCH_INPUT_TEXT,
    payload: {
      allFolderSearchInputText: allFolderSearchInputText,
    },
  };
};

export const setAllFolderSearchText = (allFolderSearchText) => {
  return {
    type: CRUD_ALL_FOLDER_SEARCH_TEXT,
    payload: {
      allFolderSearchText: allFolderSearchText,
    },
  };
};

export const setAllFolderSearchDateInput = (allFolderSearchDateInput) => {
  return {
    type: CRUD_ALL_FOLDER_SEARCH_DATE_INPUT,
    payload: {
      allFolderSearchDateInput: allFolderSearchDateInput,
    },
  };
};
export const setAllFolderTextDateTypeModal = (allFolderSearchText,allFolderSearchDate,searchType,allFolderSearchCalenderModalToggle) => {
  return {
    type: CRUD_ALL_FOLDER_TEXT_DATE_TYPE_MODAL,
    payload: {
      allFolderSearchText: allFolderSearchText,
      allFolderSearchDate:allFolderSearchDate,
      searchType: searchType,
      allFolderSearchCalenderModalToggle:allFolderSearchCalenderModalToggle
    },
  };
};
