import { SET_TOKEN, SET_SHOW_LOGIN_MODAL, SET_IS_LOGIN_MODAL, SET_SHOW_CREATE_POST_MODAL } from './constants';

export const setToken = payload => ({
    type: SET_TOKEN,
    payload
});

export const setShowLoginModal = payload => ({
    type: SET_SHOW_LOGIN_MODAL,
    payload
});

export const setIsLoginModal = payload => ({
    type: SET_IS_LOGIN_MODAL,
    payload
});

export const setShowCreatePostModal = payload => ({
    type: SET_SHOW_CREATE_POST_MODAL,
    payload
})