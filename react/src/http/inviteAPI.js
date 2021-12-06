import {$authHost, $host} from "./index";

export const inviteActivate = async (uniqueCode,
                                     name,
                                     surname,
                                     titul,
                                     firmName,
                                     firmLeader,
                                     street,
                                     area,
                                     psc,
                                     rc,
                                     ico,
                                     dic,
                                     phone,
                                     email,
                                     fveStreet1,
                                     fvePsc1,
                                     fveArea1,
                                     fveStreet2,
                                     fvePsc2,
                                     fveArea2,
                                     fveStreet3,
                                     fvePsc3,
                                     fveArea3,
                                     fveStreet4,
                                     fvePsc4,
                                     fveArea4,
                                     fveCapacity,
                                     batteryCapacity) => {
    const {data} = await $host.post('/api/v1/invites', {uniqueCode,
        name,
        surname,
        titul,
        firmName,
        firmLeader,
        street,
        area,
        psc,
        rc,
        ico,
        dic,
        phone,
        email,
        fveStreet1,
        fvePsc1,
        fveArea1,
        fveStreet2,
        fvePsc2,
        fveArea2,
        fveStreet3,
        fvePsc3,
        fveArea3,
        fveStreet4,
        fvePsc4,
        fveArea4,
        fveCapacity,
        batteryCapacity})
    return data
}

export const deleteInvite = async (inviteId) => {
    const {data} = await $authHost.get('api/v1/invites/delete/' + inviteId)
    return data
}

export const fetchInvite = async (uniqueCode) => {
    const {data} = await $authHost.get('api/v1/invites/link/' + uniqueCode)
    return data
}
