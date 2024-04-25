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
import moment from "moment";
export const CRUDReducer = (
  state = {
    searchInputText: "",
    searchText: "",
    archiveSearchDate: [moment(), moment()],
    archiveSearchDateInput: [moment(), moment()],
    searchType: null,
    archiveSearchModalToggle: false,
    crudPanelheight: 0,
    allFolderSearchCalenderModalToggle: false,
    allFolderSearchInputText: "",
    allFolderSearchText: "",
    allFolderSearchDate: [moment(), moment()],
    allFolderSearchDateInput: [moment(), moment()],
  },
  action
) => {
  switch (action.type) {
    case CRUD_SEARCH_INPUT_TEXT:
      return Object.assign({}, state, {
        searchInputText: action.payload.searchInputText,
      });
    case CRUD_ARCHIVE_SEARCH_MODAL_TOGGLE:
      return Object.assign({}, state, {
        archiveSearchModalToggle: action.payload.archiveSearchModalToggle,
      });
    case CRUD_SEARCH_TEXT_TYPE:
      return Object.assign({}, state, {
        searchText: action.payload.searchText,
        searchType: action.payload.searchType,
        archiveSearchDate: action.payload.archiveSearchDate,
      });
    case CRUD_ARCHIVE_DATE_TYPE_MODAL:
      return Object.assign({}, state, {
        archiveSearchDate: action.payload.archiveSearchDate,
        searchType: action.payload.searchType,
        archiveSearchModalToggle: action.payload.archiveSearchModalToggle,
        searchText: action.payload.searchText,
        searchInputText: action.payload.searchInputText,
      });
    case CRUD_RESET_SEARCH:
      return Object.assign({}, state, {
        archiveSearchDate: action.payload.archiveSearchDate,
        searchType: action.payload.searchType,
        searchText: action.payload.searchText,
        searchInputText: action.payload.searchInputText,
        archiveSearchDateInput: action.payload.archiveSearchDateInput,
        allFolderSearchInputText: action.payload.allFolderSearchInputText,
        allFolderSearchText: action.payload.allFolderSearchText,
        allFolderSearchDateInput: action.payload.allFolderSearchDateInput,
        allFolderSearchDate: action.payload.allFolderSearchDate,
      });
    case CRUD_PANEL_HEIGHT:
      return Object.assign({}, state, {
        crudPanelheight: action.payload.crudPanelheight,
      });
    case CRUD_ARCHIVE_DATE_INPUT:
      return Object.assign({}, state, {
        archiveSearchDateInput: action.payload.archiveSearchDateInput,
      });
    case CRUD_ALL_FOLDER_SEARCH_CALENDER_MODAL:
      return Object.assign({}, state, {
        allFolderSearchCalenderModalToggle:
          action.payload.allFolderSearchCalenderModalToggle,
      });
    case CRUD_ALL_FOLDER_SEARCH_INPUT_TEXT:
      return Object.assign({}, state, {
        allFolderSearchInputText: action.payload.allFolderSearchInputText,
      });
    case CRUD_ALL_FOLDER_SEARCH_TEXT:
      return Object.assign({}, state, {
        allFolderSearchText: action.payload.allFolderSearchText,
      });
    case CRUD_ALL_FOLDER_SEARCH_DATE_INPUT:
      return Object.assign({}, state, {
        allFolderSearchDateInput: action.payload.allFolderSearchDateInput,
      });
    case CRUD_ALL_FOLDER_TEXT_DATE_TYPE_MODAL:
      return Object.assign({}, state, {
        allFolderSearchText:  action.payload.allFolderSearchText,
      allFolderSearchDate: action.payload.allFolderSearchDate,
      searchType: action.payload.searchType,
      allFolderSearchCalenderModalToggle: action.payload.allFolderSearchCalenderModalToggle
      });
   
    default:
      return state;
  }
};
