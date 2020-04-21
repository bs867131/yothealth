import { delay } from 'redux-saga';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
    FETCH_LOGIN,
    FETCH_REGISTER,
    FETCH_ALL,
    FETCH_ACTIVATE,
    FETCH_SENDREQUEST,
    FETCH_REQUESTS,
    FETCH_ACTREQUEST,
    FETCH_FRIENDS,
    FETCH_MESSAGES,
    FETCH_MESSAGE,
    FETCH_UPDATE,
    FETCH_MAKECALL,
    FETCH_RESETPASSWORD
} from './constants';

import {
    setLogin,
    setRegister,
    setAll,
    setRequests,
    setFriends,
    setMessages,
    setUpdate
} from './actions';

import {
    login,
    register,
    getall,
    activate,
    sendRequest,
    getRequests,
    actRequests,
    getFriends,
    sendMessage,
    getMessages,
    update,
    makeVideocall,
    resetPassword
} from './api';

const asyncLogin = function* (payload) {
    const response = yield call(login, payload.user);
    yield put(setLogin(response));
}

const sagaLogin = function* () {
    yield takeLatest(FETCH_LOGIN, asyncLogin);
}

const asyncRegister = function* (payload) {
    const response = yield call(register, payload.user);
    yield put(setRegister(response));
}

const sagaRegister = function* () {
    yield takeLatest(FETCH_REGISTER, asyncRegister);
}

const asyncGetAll = function* (payload) {
    const response = yield call(getall, payload.user);
    yield put(setAll(response));
}

const sagaGetAll = function* () {
    yield takeLatest(FETCH_ALL, asyncGetAll);
}

const asyncActivate = function* (payload) {
    const response = yield call(activate, payload.username);
}

const sagaActivate = function* () {
    yield takeLatest(FETCH_ACTIVATE, asyncActivate);
}

const asyncSendRequest = function* (payload) {
    const response = yield call(sendRequest, payload.id);
}

const sagaSendRequest = function* () {
    yield takeLatest(FETCH_SENDREQUEST, asyncSendRequest);
}

const asyncRequests = function* (payload) {
    const response = yield call(getRequests);
    yield put(setRequests(response));
}

const sagaRequests = function* () {
    yield takeLatest(FETCH_REQUESTS, asyncRequests);
}

const asyncActRequest = function* (payload) {
    const response = yield call(actRequests, payload.id, payload.accept);
}

const sagaActRequest = function* () {
    yield takeLatest(FETCH_ACTREQUEST, asyncActRequest);
}

const asyncFriends = function* (payload) {
    const response = yield call(getFriends);
    yield put(setFriends(response));
}

const sagaFriends = function* () {
    yield takeLatest(FETCH_FRIENDS, asyncFriends);
}

const asyncMessages = function* (payload) {
    const response = yield call(getMessages, payload.rec_id);
    yield put(setMessages(response));
}

const sagaMessages = function* () {
    yield takeLatest(FETCH_MESSAGES, asyncMessages);
}

const asyncMessage = function* (payload) {
    const response = yield call(sendMessage, payload.message);
}

const sagaMessage = function* () {
    yield takeLatest(FETCH_MESSAGE, asyncMessage);
}

const asyncUpdate = function* (payload) {
    const response = yield call(update, payload.user);
    yield put(setUpdate(response));
}

const sagaUpdate = function* () {
    yield takeLatest(FETCH_UPDATE, asyncUpdate);
}

const asyncMakeCall = function* (payload) {
    const response = yield call(makeVideocall, payload.call);
}

const sagaMakeCall = function* () {
    yield takeLatest(FETCH_MAKECALL, asyncMakeCall);
}

const asyncResetPassword = function* (payload) {
    const response = yield call(resetPassword, payload.username);
}

const sagaResetPassword = function* () {
    yield takeLatest(FETCH_RESETPASSWORD, asyncResetPassword);
}

export default function* watchersRootSaga() {
    yield all ([
        sagaLogin(),
        sagaRegister(),
        sagaGetAll(),
        sagaActivate(),
        sagaSendRequest(),
        sagaRequests(),
        sagaActRequest(),
        sagaFriends(),
        sagaMessages(),
        sagaMessage(),
        sagaUpdate(),
        sagaMakeCall(),
        sagaResetPassword()
    ])
}