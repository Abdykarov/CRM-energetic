/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../utils/const";

const ContactItem = ({contact}) => {
    const history = useHistory()
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
                {contact.id}
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
                <span className="badge bg-soft-secondary text-secondary">{contact.roles[0].name}</span>
            </td>
            <td>
                {contact.salesmanId}
            </td>
            <td>
                {contact.companyName}
            </td>
            <td>
                {contact.jobPosition}
            </td>
            <td>
                {contact.city}
            </td>
            <td>{contact.ico}</td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/'+ contact.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};

export default ContactItem;