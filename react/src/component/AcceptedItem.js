/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../utils/const";

const AcceptedItem = ({accepted}) => {
    const history = useHistory()
    console.log(accepted)
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
                <a href={CONTACT_PROFILE_ROUTE + '/' + accepted.id} className="text-body fw-semibold">{accepted.name}</a>
            </td>
            <td>
                {accepted.name}
            </td>
            <td>
                {accepted.surname}
            </td>
            <td>
                {accepted.phone}
            </td>
            <td>{accepted.email}</td>
            <td>
                <span className="badge bg-soft-secondary text-secondary">{accepted.roles[0].name}</span>
            </td>
            <td>
                {accepted.salesmanId}
            </td>
            <td>
                {accepted.companyName}
            </td>
            <td>{accepted.jobPosition}</td>
            <td>{accepted.city}</td>
            <td>{accepted.ico}</td>
            <td>{accepted.b2B}</td>
            <td>{accepted.generatedRequestToEdr ? 'Ano' : 'Ne'}</td>
            <td>{accepted.acceptedRequestToEdr ? 'Ano' : 'Ne'}</td>
            <td>{accepted.generatedFacture ? 'Ano' : 'Ne'}</td>
            <td>{accepted.paidFacture ? 'Ano' : 'Ne'}</td>
            <td>{accepted.sendedConfirmationAboutPayment ? 'Ano' : 'Ne'}</td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/'+ accepted.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};
export default AcceptedItem;