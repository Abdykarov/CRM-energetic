import {$authHost} from "./index";

export const fetchAdmins = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/admins/')
    return data
}

export const fetchSalesmans = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/salesmans/')
    return data
}

export const fetchContacts = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/contacts/')
    return data
}

export const fetchLeads = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/leads/')
    return data
}


export const fetchPotentials = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/potentials/')
    return data
}


export const fetchCurrent = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/currents/')
    return data
}


export const fetchAccepted = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/accepted/')
    return data
}


export const fetchEdr = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/edr/')
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

export const updateToLead = async (id) =>{
    const {data} = await $authHost.get('edr_api/user/to_lead/' + id)
    return data
}


export const updateToPotential = async (id) =>{
    const {data} = await $authHost.get('edr_api/user/to_potential/' + id)
    return data
}


export const updateToCurrent = async (id) =>{
    const {data} = await $authHost.get('edr_api/user/to_current/' + id)
    return data
}


export const updateToAccepted = async (id) =>{
    const {data} = await $authHost.get('edr_api/user/to_accepted/' + id)
    return data
}


export const updateToEdr = async (id) =>{
    const {data} = await $authHost.get('edr_api/user/to_edr/' + id)
    return data
}

export const deleteContract = async (id) =>{
    const {data} = await $authHost.get('edr_api/supercontract/delete/' + id)
    return data
}


export const deleteSysel = async (id) =>{
    const {data} = await $authHost.get('edr_api/sysel/delete/' + id)
    return data
}


export const deleteFve = async (id) =>{
    const {data} = await $authHost.get('edr_api/fve/delete/' + id)
    return data
}

export const deleteHwSun = async (id) =>{
    const {data} = await $authHost.get('edr_api/hw/delete/' + id)
    return data
}


export const deleteEdrRequest = async (id) =>{
    const {data} = await $authHost.get('edr_api/edr_request/delete/' + id)
    return data
}

export const fetchAdminCoint = async () => {
    const {data} = await $authHost.get('edr_api/user/count/admin')
    return data
}

export const createAdmin = async (name, phone, surname, email, username, password) => {
    const {data} = await $authHost.post('edr_api/user/admin',{name, phone, surname, email, username, password})
}