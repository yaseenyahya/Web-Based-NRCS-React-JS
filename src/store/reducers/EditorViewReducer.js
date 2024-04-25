import {
  EDITOR_VIEW_REPORT_SOPPER_LOADING,
  EDITOR_VIEW_REPORT_SOPPER_STATUS,
  EDITOR_VIEW_MODIFICATION_DETAILS_MODAL_TOGGLE,
  EDITOR_VIEW_SOPPER_MODAL_TOGGLE,
  EDITOR_VIEW_SOPPER_MODAL_TEXT,
  EDITOR_VIEW_SOPPER_MODAL_LOADING,
  EDITOR_VIEW_MAIN_TOP_PANEL_HEIGHT,
  EDITOR_VIEW_SCROLL_AVAILABLE,
  EDITOR_VIEW_FONT_SIZE
} from "../ActionTypes";
export const EditorViewReducer = (
  state = {
    editorViewReportSopperLoading: true,
    editorViewReportSopperStatus: false,
    editorViewModificationDetailsModalToggle: false,
    editorViewSopperModalToggle: false,
    editorViewSopperModalText: '',
    editorViewSopperModalLoading: true,
    editorViewMainTopPanelHeight:0,
    editorViewScrollAvailable:false,
    editorViewFontSize:localStorage.getItem("EditorFontSize") || 30
  },
  action
) => {
  switch (action.type) {
    case EDITOR_VIEW_REPORT_SOPPER_LOADING:
      return Object.assign({}, state, {
        editorViewReportSopperLoading: action.payload.editorViewReportSopperLoading,
      });
    case EDITOR_VIEW_REPORT_SOPPER_STATUS:
      return Object.assign({}, state, {
        editorViewReportSopperStatus: action.payload.editorViewReportSopperStatus,
      });
    case EDITOR_VIEW_MODIFICATION_DETAILS_MODAL_TOGGLE:
      return Object.assign({}, state, {
        editorViewModificationDetailsModalToggle: action.payload.editorViewModificationDetailsModalToggle,
      });
    case EDITOR_VIEW_SOPPER_MODAL_TOGGLE:
      return Object.assign({}, state, {
        editorViewSopperModalToggle: action.payload.editorViewSopperModalToggle,
      });
    case EDITOR_VIEW_SOPPER_MODAL_TEXT:
      return Object.assign({}, state, {
        editorViewSopperModalText: action.payload.editorViewSopperModalText,
      });
      case EDITOR_VIEW_SOPPER_MODAL_LOADING:
      return Object.assign({}, state, {
        EDITOR_VIEW_SOPPER_MODAL_LOADING: action.payload.EDITOR_VIEW_SOPPER_MODAL_LOADING,
      });
      case EDITOR_VIEW_MAIN_TOP_PANEL_HEIGHT:
      return Object.assign({}, state, {
        editorViewMainTopPanelHeight: action.payload.editorViewMainTopPanelHeight,
      });
      case EDITOR_VIEW_SCROLL_AVAILABLE:
        return Object.assign({}, state, {
          editorViewScrollAvailable: action.payload.editorViewScrollAvailable,
        });
        case EDITOR_VIEW_FONT_SIZE:
          return Object.assign({}, state, {
            editorViewFontSize: action.payload.editorViewFontSize,
          });
    default:
      return state;
  }
};
