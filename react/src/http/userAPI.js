import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const login = async (username, password) =>{
    const {data} = await $host.post('edr_api/user/login/', {username, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const auth = async () => {
    const {data} = await $authHost.get('edr_api/user/refresh/')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

// current sets his new username and password, and sends edr link
export const edrRegistrate = async (edrLink, username, password) => {
    const {data} = await $host.post('edr_api/user/edr/registrate', {edrLink, username, password})
    return data
}