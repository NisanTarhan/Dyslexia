import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    REGISTER_START,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {...state, loading: true};
        case LOGIN_SUCCESS:
            return {...state, loading: false, user: action.payload};
        case LOGIN_FAILED:
            return {...state, loading: false};
        case REGISTER_START:
            return {...state, loading: true};
        case REGISTER_SUCCESS:
            return {...state, loading: false};
        case REGISTER_FAILED:
            return {...state, loading: false};
        default:
            return state;
    }
};
