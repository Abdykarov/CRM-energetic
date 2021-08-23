import {$authHost, $host} from "./index";

export const clientRegistration = async (name, surname, phone) =>{
    const response = await $authHost.post('edr_api/user/client/', {name, surname, phone})
    return response
}

export const clientRegistration = async (name, surname, phone) =>{
    const response = await $authHost.post('edr_api/user/client/', {name, surname, phone})
    return response
}

export const clientRegistration = async (name, surname, phone) =>{
    const response = await $authHost.post('edr_api/user/client/', {name, surname, phone})
    return response
}
