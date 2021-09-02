import React from 'react';
import {CONTACT_PROFILE_ROUTE} from "../utils/const";

const CurrentItem = ({current}) => {
    console.log(current)
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
                <a href={CONTACT_PROFILE_ROUTE + '/' + current.id} className="text-body fw-semibold">{current.name}</a>
            </td>
            <td>
                {current.name}
            </td>
            <td>
                {current.surname}
            </td>
            <td>
                {current.phone}
            </td>
            <td>{current.email}</td>
            <td>
                <span className="badge bg-soft-secondary text-secondary">{current.roles[0].name}</span>
            </td>
            <td>
                {current.salesmanId}
            </td>
            <td>
                {current.companyName}
            </td>
            <td>
                {current.jobPosition}
            </td>
            <td>
                {current.city}
            </td>
            <td>{current.ico}</td>
            <td>{current.b2B}</td>
            <td>{current.hwsunMonitor ? 'Ano' : 'Ne'}</td>
            <td>{current.syselAgreement ? 'Ano' : 'Ne'}</td>
            <td>{current.connectdFVE ? 'Ano' : 'Ne'}</td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/'+ current.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};

export default CurrentItem;