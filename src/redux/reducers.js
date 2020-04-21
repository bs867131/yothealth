import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

import {
    SET_LOGIN,
    SET_REGISTER,
    SET_ALL,
    SET_REQUESTS,
    SET_FRIENDS,
    SET_MESSAGES,
    SET_UPDATE,
    SET_QBINFO
} from './constants';

const initialState = fromJS({
	loginResponse: null,
	registerResponse: null,
	users: [],
    requests: [],
    friends:[],
    messages:[],
    updateResponse: null,
    QBInfo: null 
});

export default function sales (state = initialState, action) {
    switch (action.type) {
    	case SET_LOGIN:
    		return state.set('loginResponse',action.res);
    	case SET_REGISTER:
    		return state.set('registerResponse',action.res);
    	case SET_ALL:
    		return state.set('users', action.res);
        case SET_REQUESTS:
            return state.set('requests', action.res);
        case SET_FRIENDS:
            return state.set('friends', action.res);
        case SET_MESSAGES:
            return state.set('messages', action.res);
        case SET_UPDATE:
            return state.set('updateResponse', action.res);
        case SET_QBINFO:
            return state.set('QBInfo', action.info);
        default:
            return state;
    }
}
