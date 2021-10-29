import {$authHost, $host} from "./index";

export const fetchAllFactures = async () =>{
    const {data} = await $authHost.get('edr_api/factures/')
    return data
}

export const getFilteredFactures = async (search, factureState, filterAttr, sortAttr) =>{
    if(search === ''){
        const {data} = await $authHost.get('edr_api/factures/' + factureState + '/' + filterAttr + '?orderType=' + sortAttr)
        return data
    }else{
        const {data} = await $authHost.get('edr_api/factures/' + factureState + '/' + filterAttr + '?name='+ search +'&orderType=' + sortAttr)
        return data
    }
}

export const fetchFactureByUserId = async (userId) => {
    const {data} = await $authHost.get('edr_api/factures/' + userId)
    return data
}

export const generateFacture = async (userId) => {
    const {data} = await $authHost.post('edr_api/factures/generate-request', {userId})
    return data
}

export const getDocumentPdf = async (factureId) => {
    const {data} = await $authHost.get('edr_api/factures/facture-request-pdf/' + factureId)
    return data
}