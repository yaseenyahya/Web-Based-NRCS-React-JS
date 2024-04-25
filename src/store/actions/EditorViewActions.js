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
export const setEditorViewReportSopperLoading = (editorViewReportSopperLoading) => {
  return {
    type: EDITOR_VIEW_REPORT_SOPPER_LOADING,
    payload: {
      editorViewReportSopperLoading: editorViewReportSopperLoading,
    },
  };
};
export const setEditorViewReportSopperStatus = (editorViewReportSopperStatus) => {
  return {
    type: EDITOR_VIEW_REPORT_SOPPER_STATUS,
    payload: {
      editorViewReportSopperStatus: editorViewReportSopperStatus,
    },
  };
};
export const setEditorViewModificationDetailsModalToggle = (editorViewModificationDetailsModalToggle) => {
  return {
    type: EDITOR_VIEW_MODIFICATION_DETAILS_MODAL_TOGGLE,
    payload: {
      editorViewModificationDetailsModalToggle: editorViewModificationDetailsModalToggle,
    },
  };
};
export const setEditorViewSopperModalToggle = (editorViewSopperModalToggle) => {
  return {
    type: EDITOR_VIEW_SOPPER_MODAL_TOGGLE,
    payload: {
      editorViewSopperModalToggle: editorViewSopperModalToggle,
    },
  };
};
export const setEditorViewSopperModalText = (editorViewSopperModalText) => {
  return {
    type: EDITOR_VIEW_SOPPER_MODAL_TEXT,
    payload: {
      editorViewSopperModalText: editorViewSopperModalText,
    },
  };
};
export const setEditorViewSopperModalLoading = (editorViewSopperModalLoading) => {
  return {
    type: EDITOR_VIEW_SOPPER_MODAL_LOADING,
    payload: {
      editorViewSopperModalLoading: editorViewSopperModalLoading,
    },
  };
};
export const setEditorViewMainTopPanelHeight = (editorViewMainTopPanelHeight) => {
  return {
    type: EDITOR_VIEW_MAIN_TOP_PANEL_HEIGHT,
    payload: {
      editorViewMainTopPanelHeight: editorViewMainTopPanelHeight,
    },
  };
};
export const setEditorViewScrollAvailable = (editorViewScrollAvailable) => {
  return {
    type: EDITOR_VIEW_SCROLL_AVAILABLE,
    payload: {
      editorViewScrollAvailable: editorViewScrollAvailable,
    },
  };
};
export const setEditorViewFontSize = (editorViewFontSize) => {
  return {
    type: EDITOR_VIEW_FONT_SIZE,
    payload: {
      editorViewFontSize: editorViewFontSize,
    },
  };
};