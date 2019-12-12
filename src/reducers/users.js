import * as USER_CONSTANTS from '../constants/users';

const initialState = {
    loading: false,
    pageLoading: false,
    usersData: [],
    type: '',
    todosData: [],
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case USER_CONSTANTS.USERS_DATA_INIT: return{
            ...state,
            usersData: action.data,
        }
        case USER_CONSTANTS.SAVE_USER_REQUEST: return{
            ...state,
            loading: true,
        }
        case USER_CONSTANTS.SAVE_USER_RECEIVED: return{
            ...state,
            usersData: action.data,
            loading: false,
            type: action.type,
        }
        case USER_CONSTANTS.DELETE_USER_REQUEST: return{
            ...state,
            pageLoading: true,
        }
        case USER_CONSTANTS.DELETE_USER_RECEIVED: return{
            ...state,
            usersData: action.data,
            pageLoading: false,
            type: action.type,
        }
        case USER_CONSTANTS.UPDATE_USER_REQUEST: return{
            ...state,
            loading: true,
        }
        case USER_CONSTANTS.UPDATE_USER_RECEIVED: return{
            ...state,
            usersData: action.data,
            loading: false,
            type: action.type,
        }

        case USER_CONSTANTS.TODO_DATA_INIT: return{
            ...state,
            todosData: action.data,
        }
        case USER_CONSTANTS.SAVE_TODO_REQUEST: return{
            ...state,
            loading: true,
        }
        case USER_CONSTANTS.SAVE_TODO_RECEIVED: return{
            ...state,
            todosData: action.data,
            loading: false,
            type: action.type,
        }
        case USER_CONSTANTS.DELETE_TODO_REQUEST: return{
            ...state,
            pageLoading: true,
        }
        case USER_CONSTANTS.DELETE_TODO_RECEIVED: return{
            ...state,
            todosData: action.data,
            pageLoading: false,
            type: action.type,
        }
        default: return state;
    }
}

export default userReducer;