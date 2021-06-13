export const VALIDATE_LOGIN = 'VALIDATE_LOGIN';
export const VALIDATE_LOGIN_COMPLETE = 'VALIDATE_LOGIN_COMPLETE';
export const SET_LOADING = 'SET_LOADING';
export const REMOVE_LOADING = 'REMOVE_LOADING';
export const LOGOUT = 'LOGOUT';

export const validateLogin = (user) => ({
    type: VALIDATE_LOGIN,
    user
})

export const LoginComplete = (isLoginSuccess) => ({
    type: VALIDATE_LOGIN_COMPLETE,
    isLoginSuccess
})

export const setLoading = () => ({
    type: SET_LOADING
})

export const removeLoading = () => ({
    type: REMOVE_LOADING
})

export const Logout = () => ({
    type: LOGOUT
})
