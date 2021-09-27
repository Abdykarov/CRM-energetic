import {$authHost, $host} from "./index";

export const fetchInboxCrm = async () =>{
    const {data} = await $authHost.get('edr_api/mail/inbox-crm')
    return data
}

export const fetchCommunicationByUserId = async (id) =>{
    let url = 'edr_api/mail/'+id+'/communication'
    console.log(url)
    const {data} = await $authHost.get(url)
    return data
}