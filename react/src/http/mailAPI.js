import {$authHost, $host} from "./index";

export const fetchInboxCrm = async () =>{
    const {data} = await $authHost.get('edr_api/mail/inbox-crm')
    return data
}