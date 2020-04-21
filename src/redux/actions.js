import { createAction } from 'redux-actions';

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
    FETCH_RESETPASSWORD,

    SET_LOGIN,
    SET_REGISTER,
    SET_ALL,
    SET_REQUESTS,
    SET_FRIENDS,
    SET_MESSAGES,
    SET_MESSSAGE,
    SET_UPDATE,
    SET_QBINFO
} from './constants';

export function fetchLogin(user) {
    return {
        type: FETCH_LOGIN,
        user: user
    };
};

export function setLogin(res) {
    return {
        type : SET_LOGIN,
        res  : res
    };
};

export function fetchRegister(user) {
    return {
        type: FETCH_REGISTER,
        user: user
    };
};

export function setRegister(res) {
    return {
        type : SET_REGISTER,
        res  : res
    };
};

export function fetchAll() {
    return {
        type: FETCH_ALL
    };
};

export function setAll(res) {
    return {
        type : SET_ALL,
        res  : res
    };
};

export function fetchActivate(username){
    return {
        type: FETCH_ACTIVATE,
        username: username
    }
}

export function fetchSendRequest(id){
    return {
        type: FETCH_SENDREQUEST,
        id: id
    }
}

export function fetchRequests() {
    return {
        type: FETCH_REQUESTS
    };
};

export function setRequests(res) {
    return {
        type : SET_REQUESTS,
        res  : res
    };
};

export function fetchActRequests(id,accept) {
    return {
        type: FETCH_ACTREQUEST,
        id: id,
        accept: accept
    };
};

export function fetchFriends() {
    return {
        type: FETCH_FRIENDS
    };
};

export function setFriends(res) {
    return {
        type : SET_FRIENDS,
        res  : res
    };
};

export function fetchSendMessage(message) {
    return {
        type: FETCH_MESSAGE,
        message: message
    };
};

export function fetchMessages(rec_id) {
    return {
        type: FETCH_MESSAGES,
        rec_id: rec_id
    };
};

export function setMessages(res) {
    return {
        type : SET_MESSAGES,
        res  : res
    };
};

export function fetchUpdate(user) {
    return {
        type: FETCH_UPDATE,
        user: user
    };
};

export function setUpdate(res) {
    return {
        type : SET_UPDATE,
        res  : res
    };
};

export function setQBInfo(info) {
    return {
        type: SET_QBINFO,
        info: info
    }
}

export function makeCall(call){
    return{
        type: FETCH_MAKECALL,
        call: call
    }
}

export function resetPassword(username){
    return{
        type: FETCH_RESETPASSWORD,
        username: username
    }
}