import * as USER_CONSTANTS from '../constants/users';

async function wait(duration = 1000) {
    await new Promise(resolve => setTimeout(resolve, duration));
}

const saveRequest = () => ({
    type: USER_CONSTANTS.SAVE_USER_REQUEST,
})

const saveReceived = (data) => ({
    type: USER_CONSTANTS.SAVE_USER_RECEIVED,
    data,
})

async function saveUser(data, dispatch) {
    let users = [];
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    await wait(2000);
    dispatch(saveReceived(users));
}

const updateRequest = () => ({
    type: USER_CONSTANTS.UPDATE_USER_REQUEST,
})

const updateReceived = (data) => ({
    type: USER_CONSTANTS.UPDATE_USER_RECEIVED,
    data,
})

async function updateUser(data, dispatch) {
    let users = [];
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }
    users = users.map(eachUser => {
        if (eachUser.id === data.id) {
            return ({
                id: data.id,
                name: data.name,
                email: data.email,
            });
        }
        return eachUser;
    });
    localStorage.setItem('users', JSON.stringify(users));
    await wait(2000);
    dispatch(updateReceived(users));
}

export const postUsersData = (data) => dispatch => {
    if (data.mode === 'edit') {
        dispatch(updateRequest());
        updateUser(data, dispatch);
    } else {
        dispatch(saveRequest());
        saveUser(data, dispatch);
    }
}

const userDataInit = (data) => ({
    type: USER_CONSTANTS.USERS_DATA_INIT,
    data,
})

export const fetchUsersData = () => dispatch => {
    let users = [];
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }
    dispatch(userDataInit(users));
}



const deleteRequest = () => ({
    type: USER_CONSTANTS.DELETE_USER_REQUEST,
})

const deleteReceived = (data) => ({
    type: USER_CONSTANTS.DELETE_USER_RECEIVED,
    data,
})

async function deleteUser(data, dispatch) {
    let users = [];
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }
    users = users.filter(eachUser => eachUser.id !== data.id);
    localStorage.setItem('users', JSON.stringify(users));
    await wait(2000);
    dispatch(deleteReceived(users));
}

export const deleteUsersData = (data) => dispatch => {
    dispatch(deleteRequest());
    deleteUser(data, dispatch);
}


// 8888888888888888888888888888

const saveTodoRequest = () => ({
    type: USER_CONSTANTS.SAVE_TODO_REQUEST,
})

const saveTodoReceived = (data) => ({
    type: USER_CONSTANTS.SAVE_TODO_RECEIVED,
    data,
})

async function saveUserTodo(data, dispatch) {
    let todos = [];
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(data);
    localStorage.setItem('todos', JSON.stringify(todos));
    await wait(2000);
    dispatch(saveTodoReceived(todos));
}


export const postUsersTodoData = (data) => dispatch => {
    dispatch(saveTodoRequest());
    saveUserTodo(data, dispatch);
}

const userTodoDataInit = (data) => ({
    type: USER_CONSTANTS.TODO_DATA_INIT,
    data,
})

export const fetchUsersTodoData = () => dispatch => {
    let todos = [];
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    dispatch(userTodoDataInit(todos));
}

const deleteTodoRequest = () => ({
    type: USER_CONSTANTS.DELETE_TODO_REQUEST,
})

const deleteTodoReceived = (data) => ({
    type: USER_CONSTANTS.DELETE_TODO_RECEIVED,
    data,
})

async function deleteUserTodo(data, dispatch) {
    let todos = [];
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos = todos.filter(eachUser => eachUser.id !== data.id);
    localStorage.setItem('todos', JSON.stringify(todos));
    await wait(2000);
    dispatch(deleteTodoReceived(todos));
}

export const deleteUsersTodoData = (data) => dispatch => {
    dispatch(deleteTodoRequest());
    deleteUserTodo(data, dispatch);
}
