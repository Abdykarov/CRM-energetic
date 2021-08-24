import {$authHost, $host} from "./index";

export const clientRegistration = async (name, surname, phone, email,) =>{
    const response = await $authHost.post('edr_api/user/client/', {name, surname, phone})
    return response
}

export const managerRegistration = async (email, password) =>{
    const response = await $authHost.post('edr_api/user/manager/', {name, surname, phone})
    return response
}

export const login = async (email, password) =>{
    const response = await $host.post('edr_api/user/login/', {email, password})
    return response
}

export const check = async () => {
    return true
}
