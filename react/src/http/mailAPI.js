import {$authHost, $host} from "./index";

export const fetchInbox = async () =>{
    const {data} = await $authHost.get('edr_api/mail/fetch/inbox')
    return data
}


export const fetchOutbox = async () =>{
    const {data} = await $authHost.get('edr_api/mail/fetch/outbox')
    return data
}

export const fetchCommunicationByUserId = async (id) =>{
    let url = 'edr_api/mail/'+id+'/communication'
    const {data} = await $authHost.get(url)
    return data
}

export const fetchEdrNotesByUserId = async (id) =>{
    const {data} = await $authHost.get('edr_api/edr-notes/'+id+'/')
    console.log(data)
    return data
}
export const createEdrNote = async (managerId, userId, message) =>{
    const {data} = await $authHost.post('edr_api/edr-notes/', {managerId, userId, message})
    return data
}
