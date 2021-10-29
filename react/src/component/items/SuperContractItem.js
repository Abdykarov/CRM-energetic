/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";
import {
    fetchUserById,
    getDocumentState, setDocumentState,
    setEdrContractGenerated,
    setEdrContractSent,
    setEdrContractSigned,
    setFveSigned,
    updateToLead
} from "../../http/contactAPI";

const LeadItem = ({contact}) => {
    const history = useHistory()
    console.log(contact)
    const [contractStatus, setContractStatus] = useState(contact.edrContractStatus)

    useEffect(() => {
        fetchContractStatus().then(data => {
            setContractStatus(data)
            console.log(contractStatus)
        })
    }, [])

    const fetchContractStatus = async () => {
        return contact.edrContractStatus
    }

    const setContract = async (status) => {
        try {
            let response
            let id = contact.id
            let document = "edrContract"
            response =  await setDocumentState(id, document, status)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <tr>
            <td className="table-user">
                <a href={CONTACT_PROFILE_ROUTE + '/' + contact.id} className="text-body fw-semibold">{contact.name}</a>
            </td>
            <td>
                {contact.edrContractSignedDate}
            </td>
            <td>
                {
                    contact.concurrentFveInstalled ?
                        "Dilčí smlouva"
                        :
                        "Supersmlouva"
                }
            </td>
            <td><a href={CONTACT_PROFILE_ROUTE + '/'+ contact.id} className="action-icon">
                <img src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt="" width="35px"/>
            </a></td>
        </tr>
    );
};

export default LeadItem;