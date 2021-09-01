import {$authHost} from "./index";

export const fetchContacts = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/contacts/')
    return data
}

export const fetchLeads = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/leads/')
    return data
}

export const fetchUserByUsername = async (username) =>{
    const {data} = await $authHost.get('edr_api/user/account/' + username)
    return data
}

export const fetchUserById = async (id) =>{
    const {data} = await $authHost.get('edr_api/user/' + id)
    return data
}