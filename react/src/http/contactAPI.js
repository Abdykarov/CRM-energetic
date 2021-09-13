import {$authHost, $host} from "./index";

export const fetchAdmins = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/admins/')
    return data
}

export const fetchManagers = async () =>{
    const {data} = await $authHost.get('edr_api/user/contact/managers/')
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


export const fetchManagerCount = async () => {
    const {data} = await $authHost.get('edr_api/user/count/manager')
    return data
}


export const fetchSalesmanCount = async () => {
    const {data} = await $authHost.get('edr_api/user/count/salesman')
    return data
}

export const createAdmin = async (name, phone, surname, email, username, password) => {
    const {data} = await $authHost.post('edr_api/user/create/admin/',{name, phone, surname, email, username, password})
    return data
}


export const createManager = async (name, phone, surname, email, username, password) => {
    const {data} = await $authHost.post('edr_api/user/create/manager/',{name, phone, surname, email, username, password})
    return data
}

export const createSalesman= async (name, phone, surname, email, username, password, ico, b2b,area) => {
    const {data} = await $authHost.post('edr_api/user/create/salesman/',
        {name, phone, surname, email, username, password, ico, b2b,area})
    return data
}

// management creates new contact
export const createContact = async (name, phone, surname, email, ico,
                                     salesmanId, companyName, city, jobPosition) => {
    const {data} = await $authHost.post('edr_api/user/create/contact/',
        {name, phone, surname, email, ico, salesmanId, companyName, city, jobPosition})
    return data
}


// referal person registrates by referal link
export const createReferalContact = async (name, surname, phone, email, jobPosition, ico, companyName, city) => {
    const {data} = await $host.post('edr_api/user/create/referal-contact/',
        {name, surname, phone, email, jobPosition, ico, companyName, city})
    return data
}
// management creats edr link, and send to the current user by email
export const sendEdrRegistrationLink = async (id) =>{
    const {data} = await $authHost.get('edr_api/edr/registration-link/' + id)
    return data
}


// edr creates new ref link and send to some person
export const createReferalLink = async (id) => {
    const {data} = await $authHost.get('edr_api/edr/referal-link/' + id)
    return data
}

export const fetchReferals = async (id) => {
    const {data} = await $authHost.get('edr_api/edr/referals/' + id)
    return data
}