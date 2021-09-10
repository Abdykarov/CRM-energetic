/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";

const EdrItem = ({edr}) => {
    const history = useHistory()
    console.log(edr)
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
                <a href={CONTACT_PROFILE_ROUTE + '/' + edr.id} className="text-body fw-semibold">{edr.name}</a>
            </td>
            <td>
                {edr.id}
            </td>
            <td>
                {edr.name}
            </td>
            <td>
                {edr.surname}
            </td>
            <td>
                {edr.phone}
            </td>
            <td>{edr.email}</td>
            <td>
                <span className="badge bg-soft-secondary text-secondary">{edr.roles[0].name}</span>
            </td>
            <td>
                {edr.city}
            </td>
            <td>
                {edr.ico}
            </td>
            <td>
                {edr.walletPoints}
            </td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/'+ edr.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};

export default EdrItem;