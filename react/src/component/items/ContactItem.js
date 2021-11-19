/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";
import {deleteEdrRequest, fetchContacts, setFveDocumentSigned} from "../../http/contactAPI";

const ContactItem = ({contact}) => {
    const history = useHistory()
    const [connectedFveSigned, setConnectedFveSigned] = useState(null)
    useEffect(() => {
        setConnectedFveSigned(contact.connectedFveSigned)
    }, [])
    const setFve = async (e) => {
        try {
            let response
            let id = contact.id
            response =  await setFveDocumentSigned(id)
            setConnectedFveSigned(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    function roleClassSwitch(param) {
        switch(param) {
            case 'NEW':
                return 'badge bg-soft-success text-success';
            case 'LOST':
                return 'badge bg-soft-danger text-danger';
            case 'DEFERRED':
                return 'badge bg-soft-warning text-warning';
            case 'EDR_CANCELLED':
                return 'badge bg-soft-dark text-dark';
            default:
                return 'badge bg-soft-success text-success';
        }
    }

    function roleTextSwitch(param) {
        switch(param) {
            case 'NEW':
                return 'NOVÝ';
            case 'LOST':
                return 'ZTRACENÝ';
            case 'DEFERRED':
                return 'ODLOŽENÝ';
            case 'EDR_CANCELLED':
                return 'ZRUŠENÝ ČLEN';
            default:
                return 'NOVÝ';
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
                <span className={roleClassSwitch(contact.roles[0].name)}>{roleTextSwitch(contact.roles[0].name)}</span>
            </td>
            <td>
                {contact.area === null ? "Nemá kraj" : contact.area.name}
            </td>
            <td>
                {contact.ico}
            </td>
            <td>
                {contact.contactPerson}
            </td>
            <td>
                {contact.salesman === null ? "Nemá oz" : <a href={CONTACT_PROFILE_ROUTE + '/' + contact.salesman.id} className="text-body fw-semibold">{contact.salesman.name} {contact.salesman.surname}</a>}
            </td>
            <td>
                { contact.referal === null ? "Nemá kampan" : <a href={CONTACT_PROFILE_ROUTE + '/' + contact.referal.id} className="text-body fw-semibold">{contact.referal.name} {contact.referal.surname}</a>
                }
            </td>
            <td>
                { (contact.concurrentFveInstalled !== false) ?
                    <div>
                        {contact.concurrentFveName} <br/> {contact.concurrentFveDueDate}
                    </div>
                    :
                    <div>Nemá</div>
                }
            </td>

            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/'+ contact.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};

export default ContactItem;