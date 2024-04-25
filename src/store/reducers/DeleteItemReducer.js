import { DELETE_ITEM_BUTTON_LOADING } from "../ActionTypes";
export const DeleteItemReducer = (
  state = {
    deleteItemButtonLoading: false,
  },
  action
) => {
  switch (action.type) {
    case DELETE_ITEM_BUTTON_LOADING:
      return Object.assign({}, state, {
        deleteItemButtonLoading: action.payload.deleteItemButtonLoading,
      });

    default:
      return state;
  }
};
