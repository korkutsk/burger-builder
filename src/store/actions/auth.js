import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId,
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationData');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSingUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        // Update auth key query parameter
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[your key]';
        if (!isSingUp) {
             // Update auth key query parameter
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[your key]';
        };

        axios.post(url, authData)
            .then(response => {
                const expirationData = new Date(new Date().getTime() + (response.data.expiresIn * 1000));

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationData', expirationData);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationData = new Date(localStorage.getItem('expirationData'));
            if (expirationData > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationData.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            };
        }
    };
};