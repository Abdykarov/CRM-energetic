import {$authHost, $host} from "./index";

export const findLeads = async (contactsSize, pageNumber) => {

    const {data} = await $authHost.get('api/v1/leads/findAll'+'?size=' + contactsSize + '&page=' + pageNumber)
    return data

}
export const getFilteredLeads = async (contactName, contactSurname, filterType, contactsSize, pageNumber) =>{
    console.log(contactName, contactSurname, filterType, contactsSize, pageNumber);
    if(contactName === '' && contactSurname === ''){
        const {data} = await $authHost.get('api/v1/leads/filter' + '?filterType=' + filterType + '&size=' + contactsSize + '&page=' + pageNumber)
        return data
    }
    else if (contactName === '' && contactSurname !== ''){
        const {data} = await $authHost.get('api/v1/leads/filter' + '?filterType=' + filterType +
            '&surname=' + contactSurname + '&size=' + contactsSize + '&page=' + pageNumber)
        return data
    }
    else if (contactName !== '' && contactSurname === ''){
        const {data} = await $authHost.get('api/v1/leads/filter' + '?filterType=' + filterType +
            '&name=' + contactName + '&size=' + contactsSize + '&page=' + pageNumber)
        return data
    }
    else{
        const {data} = await $authHost.get('api/v1/leads/filter' + '?filterType=' + filterType +
            '&name=' + contactName + '&surname=' + contactSurname + '&size=' + contactsSize + '&page=' + pageNumber)
        return data
    }
}
