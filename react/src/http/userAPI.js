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


export const edr_registrate = async () => {
    const {data} = await $host.post('edr_api/user/edr_registrate')
    return data
}