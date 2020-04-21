import { API } from './config';
import {AsyncStorage,Alert} from 'react-native';

export function login (user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    };
    console.log(`${API}/users/authenticate`);
    return fetch(`${API}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if(user.active)
            storeUser(user);
        return user;
    });
}

async function storeUser(user){
    await AsyncStorage.setItem('@user', JSON.stringify(user));
}

export function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    
    return fetch(`${API}/users/register`, requestOptions).then(handleResponse);
}

export function resetPassword(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username})
    };
    
    return fetch(`${API}/users/reset`, requestOptions).then(handleResponse);
}

export async function makeVideocall(call) {
    const user = await authHeader();
    const header = await createHeader(user.token);
    header['Content-Type'] = 'application/json';

    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(call)
    };
    console.log(`${API}/users/makecall`);
    return fetch(`${API}/users/makecall`, requestOptions).then(handleResponse);
}

export async function update(user) {
    const usero = await authHeader();

    const form_data  = new FormData();
    form_data.append("username", user.username);
    form_data.append("firstName", user.firstName);
    form_data.append("lastName", user.lastName);

    if(user.password)
        form_data.append("password", user.password);

    if(user.file){
        var name = user.file.path;
        name = name.split("/");
        name = name[name.length-1];
        form_data.append("profile_file", {
            uri: user.file.path, 
            name: name, 
            type: user.file.mime
        });
    }

    console.log(form_data);
    console.log( {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + usero.token
        });

    return fetch(`${API}/users`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + usero.token
        },
        body: form_data
    })
    .then(res => res.json()).then(res => { return res; }).catch(res => { console.log(res);});
}

export async function getall() {
    const user = await authHeader();
    const header = await createHeader(user.token);

    const requestOptions = {
        method: 'GET',
        headers: header
    };
    
    return fetch(`${API}/users/all/`+user._id, requestOptions).then(handleResponse);
}

export async function getRequests() {
    const user = await authHeader();
    const header = await createHeader(user.token);

    const requestOptions = {
        method: 'GET',
        headers: header
    };
    
    return fetch(`${API}/users/requests/`+user._id, requestOptions).then(handleResponse);
}

export async function getFriends() {
    const user = await authHeader();
    const header = await createHeader(user.token);

    const requestOptions = {
        method: 'GET',
        headers: header
    };
    
    return fetch(`${API}/users/friends/`+user._id, requestOptions).then(handleResponse);
}

export async function getMessages(rec_id) {
    const user = await authHeader();
    const header = await createHeader(user.token);

    const requestOptions = {
        method: 'GET',
        headers: header
    };
    
    return fetch(`${API}/users/message/`+user._id+`/`+rec_id, requestOptions).then(handleResponse);
}

export async function sendMessage(message) {
    const user = await authHeader();
    const header = await createHeader(user.token);
    header['Content-Type'] = 'application/json';

    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(message)
    };
    // Alert.alert(JSON.stringify(message))
    return fetch(`${API}/users/message`, requestOptions).then(handleResponse);
}

export async function actRequests(id, accept) {
    const user = await authHeader();
    const header = await createHeader(user.token);

    const requestOptions = {
        method: accept ? 'GET' : 'DELETE',
        headers: header
    };
    // Alert.alert(JSON.stringify(requestOptions))
    return fetch(`${API}/users/request/`+id, requestOptions).then(handleResponse);
}

export async function sendRequest(id) {
    const user = await authHeader();
    const header = await createHeader(user.token);

    const requestOptions = {
        method: 'GET',
        headers: header
    };
    
    return fetch(`${API}/users/request/`+user._id+`/`+id, requestOptions).then(handleResponse);
}

export function activate(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id})
    };
    return fetch(`${API}/users/activate`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data)
        return data;
    });
}

async function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(await AsyncStorage.getItem('@user'));

    if (user && user.token) {
        return user;
    } else {
        return {};
    }
}

async function createHeader(token){
    return { 'Authorization': 'Bearer ' + token };
}