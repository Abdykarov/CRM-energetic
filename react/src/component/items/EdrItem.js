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
            <td><a href={CONTACT_PROFILE_ROUTE + '/'+ edr.id} className="action-icon">
                <img src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt="" width="35px"/>
            </a></td>
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
        </tr>
    );
};

export default EdrItem;