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
            <td>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                           id="customCheck2" />
                    <label className="form-check-label"
                           htmlFor="customCheck2">&nbsp;</label>
                </div>
            </td>
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
                {
                    contact.connectedFveSigned === false ?
                        "Ne"
                        :
                        "Ano"
                }
            </td>
            <td>
                    {
                        (contractStatus === "GENERATED") ?
                            <select value={contractStatus} onChange={e => setContract(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                <option value="GENERATED" selected>Vygenerovaný</option>
                                <option value="SENT">Odeslaný</option>
                                <option value="SIGNED">Podepsaný</option>
                                <option value="NONE">Žádný</option>
                            </select>
                            :
                            ""
                    }
                    {
                        (contractStatus === "SENT") ?
                            <select value={contractStatus} onChange={e => setContract(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                <option value="GENERATED">Vygenerovaný</option>
                                <option value="SENT" selected>Odeslaný</option>
                                <option value="SIGNED">Podepsaný</option>
                                <option value="NONE">Žádný</option>
                            </select>
                            :
                            ""
                    }
                    {
                        (contractStatus === "SIGNED") ?
                            <select value={contractStatus} onChange={e => setContract(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                <option value="GENERATED">Vygenerovaný</option>
                                <option value="SENT">Odeslaný</option>
                                <option value="SIGNED" selected>Podepsaný</option>
                                <option value="NONE">Žádný</option>
                            </select>
                            :
                            ""
                    }
                    {
                        (contractStatus === "NONE") ?
                            <select value={contractStatus} onChange={e => setContract(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                <option value="GENERATED">Vygenerovaný</option>
                                <option value="SENT">Odeslaný</option>
                                <option value="SIGNED">Podepsaný</option>
                                <option value="NONE" selected={true}>Žádný</option>
                            </select>
                            :
                            ""
                    }

            </td>
            <td><a href={CONTACT_PROFILE_ROUTE + '/'+ contact.id} className="action-icon">
                <img src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt="" width="35px"/>
            </a></td>
        </tr>
    );
};

export default LeadItem;