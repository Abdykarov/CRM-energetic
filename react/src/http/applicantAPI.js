import {$authHost} from "./index";

export const findApplicants = async (contactsSize, pageNumber) => {

    const {data} = await $authHost.get('api/v1/applicants/findAll'+'?size=' + contactsSize + '&page=' + pageNumber)
    return data

}
export const getFilteredApplicants = async (filterType, contactsSize, pageNumber) =>{
    const {data} = await $authHost.get('api/v1/applicants/filter' + '?filterType=' + filterType + '&size=' + contactsSize + '&page=' + pageNumber)
    return data
}
