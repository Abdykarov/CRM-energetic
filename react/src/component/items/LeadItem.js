/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";
import {setEdrContractGenerated, setEdrContractSent, setEdrContractSigned, setFveSigned} from "../../http/contactAPI";

const LeadItem = ({contact}) => {
    const history = useHistory()
    const [contractGenerated, setContractGenerated] = useState(null)
    const [contractSent, setContractSent] = useState(null)
    const [contractSigned, setContractSigned] = useState(null)
    useEffect(() => {
        setContractSigned(contact.edrContractSigned)
        setContractSent(contact.edrContractSent)
        setContractGenerated(contact.edrContractGenerated)
    }, [])
    const setGenerated = async (e) => {
        try {
            let response
            let id = contact.id
            response =  await setEdrContractGenerated(id)
            setContractGenerated(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setSent = async (e) => {
        try {
            let response
            let id = contact.id
            response =  await setEdrContractSent(id)
            setContractSent(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setSigned = async (e) => {
        try {
            let response
            let id = contact.id
            response =  await setEdrContractSigned(id)
            setContractSigned(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    console.log(contact)
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
                {contact.phone}
            </td>
            <td>{contact.email}</td>
            <td>
                <span className="badge bg-soft-success text-success">{contact.roles[0].name}</span>
            </td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/' + contact.salesman.id} className="text-body fw-semibold">{contact.salesman.name} {contact.salesman.surname}</a>
            </td>
            <td>
                {
                    contact.contactPerson === null ?
                        "Nemá"
                        :
                        contact.contactPerson
                }
            </td>
            <td>
                {contact.area.name}
            </td>
            <td>
                {
                    contact.referal === null ?
                        "Nemá"
                        :
                        <a href={CONTACT_PROFILE_ROUTE + '/' + contact.referal.id} className="text-body fw-semibold">{contact.referal.name} {contact.referal.surname}</a>

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
                    contact.connectedFveSigned === false ?
                        <div>
                            <div className="form-check">
                                {(contact.edrContractGenerated === false) ?
                                    <input type="checkbox" onChange={setGenerated} className="form-check-input"
                                    />
                                    :
                                    <input checked disabled type="checkbox" className="form-check-input"
                                    />
                                }
                                <label className="form-check-label"
                                       htmlFor="customCheck1">vygenerovaná supersmlouva</label>
                            </div>
                            <div className="form-check">
                                {(contact.edrContractSent === false) ?
                                    <input type="checkbox" onChange={setSent} className="form-check-input"
                                    />
                                    :
                                    <input checked disabled type="checkbox" className="form-check-input"
                                    />
                                }
                                <label className="form-check-label"
                                       htmlFor="customCheck2">odeslaná supersmlouva</label>
                            </div>
                            <div className="form-check">
                                {(contact.edrContractSigned === false) ?
                                    <input type="checkbox" onChange={setSigned} className="form-check-input"
                                    />
                                    :
                                    <input checked disabled type="checkbox" className="form-check-input"
                                    />
                                }
                                <label className="form-check-label"
                                       htmlFor="customCheck2">podepsaná supersmlouva</label>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="form-check">
                                {(contact.edrContractGenerated === false) ?
                                    <input type="checkbox" onChange={setGenerated} className="form-check-input"
                                    />
                                    :
                                    <input checked disabled type="checkbox" className="form-check-input"
                                    />
                                }
                                <label className="form-check-label"
                                       htmlFor="customCheck1">vygenerovaná dilčí smlouva</label>
                            </div>
                            <div className="form-check">
                                {(contact.edrContractSent === false) ?
                                    <input type="checkbox" onChange={setSent} className="form-check-input"
                                    />
                                    :
                                    <input checked disabled type="checkbox" className="form-check-input"
                                    />
                                }
                                <label className="form-check-label"
                                       htmlFor="customCheck2">odeslaná dilčí smlouva</label>
                            </div>
                            <div className="form-check">
                                {(contact.edrContractSigned === false) ?
                                    <input type="checkbox" onChange={setSigned} className="form-check-input"
                                    />
                                    :
                                    <input checked disabled type="checkbox" className="form-check-input"
                                    />
                                }
                                <label className="form-check-label"
                                       htmlFor="customCheck2">podepsaná dilčí smlouva</label>
                            </div>
                        </div>
                }
            </td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/'+ contact.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};

export default LeadItem;