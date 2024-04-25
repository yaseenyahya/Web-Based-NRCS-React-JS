import {
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  LOGIN_IS_LOADING,
  LOGIN_REGISTER_TOGGLE_FORM_NAME,
  LOGIN_REDIRECT_TO_PATH,
  LOGIN_USER_AUTHENTICATED,
  
  REGISTER_FULLNAME,
  REGISTER_CITY,
  REGISTER_MOBILE,
  REGISTER_EMAIL,
  REGISTER_CHANNELNAME,
} from "../ActionTypes";

export const LoginReducer = (
  state = {
    loginUsername: "",
    loginPassword: "",
    loginRedirectToPath:"",

    registerFullname: "",
    registerCity: "",
    registerMobile: "",
    registerEmail: "",
    registerChannelname: "",

    isLoading: false,
    toggleFormName: "login",
    windowHeight: 0,

  },
  action
) => {
  switch (action.type) {
    case LOGIN_USERNAME:
      return Object.assign({}, state, {
        loginUsername: action.payload.loginUsername,
      });
    case LOGIN_PASSWORD:
      return Object.assign({}, state, {
        loginPassword: action.payload.loginPassword,
      });

    case REGISTER_FULLNAME:
      return Object.assign({}, state, {
        registerFullname: action.payload.registerFullname,
      });
    case REGISTER_CITY:
      return Object.assign({}, state, {
        registerCity: action.payload.registerCity,
      });
    case REGISTER_MOBILE:
      return Object.assign({}, state, {
        registerMobile: action.payload.registerMobile,
      });
    case REGISTER_EMAIL:
      return Object.assign({}, state, {
        registerEmail: action.payload.registerEmail,
      });
    case REGISTER_CHANNELNAME:
      return Object.assign({}, state, {
        registerChannelname: action.payload.registerChannelname,
      });

    case LOGIN_REDIRECT_TO_PATH:
      return Object.assign({}, state, {
        loginRedirectToPath: action.payload.loginRedirectToPath,
      });

    case LOGIN_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload.isLoading,
      });
    case LOGIN_REGISTER_TOGGLE_FORM_NAME:
      return Object.assign({}, state, {
        toggleFormName: action.payload.toggleFormName,
      });
    case LOGIN_USER_AUTHENTICATED:
        return state;
    default:
      return state;
  }
};
