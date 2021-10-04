import {$host} from "./index";

export const fetchAreas = async () =>{
    const {data} = await $host.get('edr_api/areas/')
    return data
}