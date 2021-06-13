import { LOGOUT, SET_LOADING, VALIDATE_LOGIN, VALIDATE_LOGIN_COMPLETE } from "./actions";
const initState = {
    userDetails: [],
    employeeDetails: [],
    isLoginSuccess: false,
    isLoading: false,
    jwtToken: '',
}

const reducers = (state = initState, action) => {
  switch (action.type) {
    case VALIDATE_LOGIN:
      return action.user;
    case VALIDATE_LOGIN_COMPLETE:
        return {
            ...state,
            isLoginSuccess: action.isLoginSuccess ? true : false,
            isLoading: false,
            jwtToken: action.isLoginSuccess
        }
    case SET_LOADING:
        return{
            ...state,
            isLoading: true
        }
    case LOGOUT:
      return{
        ...state,
        isLoginSuccess: false
      }
    default:
      return state;
  }
};

export default reducers