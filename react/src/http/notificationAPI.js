import {$authHost} from "./index";

export const fetchNotifications = async () =>{
    const {data} = await $authHost.get('edr_api/notifications')
    return data
}

