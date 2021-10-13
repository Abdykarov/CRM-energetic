/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";

const FactureItem = ({facture}) => {
    const history = useHistory()
    console.log(facture)
    function roleClassSwitch(param) {
        switch(param) {
            case 'PAID':
                return 'badge bg-soft-success text-success';
            case 'GENERATED':
                return 'badge bg-soft-primary text-primary';
            case 'EXPIRED':
                return 'badge bg-soft-danger text-danger';
            default:
                return 'badge bg-soft-success text-success';
        }
    }

    function roleTextSwitch(param) {
        switch(param) {
            case 'GENERATED':
                return 'ZGENEROVANÝ';
            case 'PAID':
                return 'ZAPLACENÝ';
            case 'EXPIRED':
                return 'VYPRŠENÍ';
            default:
                return 'ZGENEROVANÝ';
        }
    }

    return (
        <tr>
            <td className="table-user">
                <a href={CONTACT_PROFILE_ROUTE + '/' + facture.user.id} className="text-body fw-semibold">{facture.user.name}</a>
            </td>
            <td>
                {facture.user.surname}
            </td>
            <td>
                {facture.createdAt}
            </td>
            <td>
                {facture.dueDate}
            </td>
            <td>
                {facture.varSymbol}
            </td>
            <td>
                {facture.totalPrice}
            </td>
            <td>
                <span className={roleClassSwitch(facture.factureStatus)}>{roleTextSwitch(facture.factureStatus)}</span>
            </td>
            <td>
                <button type="button" className="btn btn-success waves-effect waves-light"><i
                    className="mdi mdi-download"></i></button>
            </td>
            <td>
                <button type="button" className="btn btn-danger waves-effect waves-light"><i
                    className="mdi mdi-close"></i></button>
            </td>
        </tr>
    );
};

export default FactureItem;