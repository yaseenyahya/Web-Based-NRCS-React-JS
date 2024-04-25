import {
  SOPPER_MODAL_TOGGLE,
  SOPPER_MODAL_TEXT,
  SOPPER_MODAL_TEXT_LOADING
} from "../ActionTypes";
export const SopperModalReducer = (
  state = {
    sopperModalToggle: false,
    sopperModalText: '',
    sopperModalTextLoading:true
  },
  action
) => {
  switch (action.type) {
    case SOPPER_MODAL_TOGGLE:
      return Object.assign({}, state, {
        sopperModalToggle: action.payload.sopperModalToggle,
      });
    case SOPPER_MODAL_TEXT:
      return Object.assign({}, state, {
        sopperModalText: action.payload.sopperModalText,
      });
      case SOPPER_MODAL_TEXT_LOADING:
      return Object.assign({}, state, {
        sopperModalTextLoading: action.payload.sopperModalTextLoading,
      });
  
    default:
      return state;
  }
};
