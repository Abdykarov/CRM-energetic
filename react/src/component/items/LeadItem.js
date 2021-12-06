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

    function edrContractStateFactory(param) {
        switch(param) {
            case 'GENERATED':
                return 'Vygenerovaný';
            case 'SENT':
                return 'Odeslaný';
            case 'SIGNED':
                return 'Podepsaný';
            default:
                return 'Žádný';
        }
    }


    return (
        <tr>
            <td>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                           id="customCheck2" />
                    <label className="form-check-label"
                           htmlFor="customCheck2">&nbsp;</label>
                </div>
            </td>
            <td><a href={CONTACT_PROFILE_ROUTE + '/'+ contact.id} className="action-icon">
                <img src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt="" width="35px"/>
            </a></td>
            <td className="table-user">
                <a href={CONTACT_PROFILE_ROUTE + '/' + contact.id} className="text-body fw-semibold">{contact.name}</a>
            </td>
            <td>
                {contact.name}
            </td>
            <td>
                {contact.surname}
            </td>
            <td>
                {
                    contact.male ?
                        "Muž"
                        :
                        "Žena"
                }
            </td>
            <td>
                {contact.phone}
            </td>
            <td>{contact.email}</td>
            <td>
                <span className='badge bg-soft-success text-success'>{contact.roles[0].name}</span>
            </td>
            <td>
                {contact.area.name}
            </td>
            <td>
                {contact.ico}
            </td>
            <td>
                {contact.contactPerson}
            </td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/' + contact.salesman.id} className="text-body fw-semibold">{contact.salesman.name} {contact.salesman.surname}</a>
            </td>
            <td>
                { contact.referal === null ? "Nemá kampan" : <a href={CONTACT_PROFILE_ROUTE + '/' + contact.referal.id} className="text-body fw-semibold">{contact.referal.name} {contact.referal.surname}</a>
                }
            </td>
            <td>
                <div className="document_state">
                    {edrContractStateFactory(contact.edrContractStatus)}
                </div>
            </td>
        </tr>
    );
};

export default LeadItem;