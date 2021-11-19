/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";
import {setDocumentState} from "../../http/contactAPI";
import {deleteFactureByUserId, getDocumentPdf} from "../../http/factureAPI";

const FactureItem = ({facture}) => {
    const history = useHistory()

    const downloadPdf = async () => {
        fetch(process.env.REACT_APP_API_URL + "edr_api/factures/facture-request-pdf/" + facture.id, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            })
        }) // FETCH BLOB FROM IT
            .then((response) => response.blob())
            .then((blob) => { // RETRIEVE THE BLOB AND CREATE LOCAL URL
                var _url = window.URL.createObjectURL(blob);
                window.open(_url, "_blank"); // window.open + focus
            }).catch((err) => {
            console.log(err);
        });
    }

    const removeFacture = async () => {
        try {
            let response
            let id = facture.id
            response =  await deleteFactureByUserId(facture.user.id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

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
                <button onClick={downloadPdf} type="button" className="btn btn-success waves-effect waves-light"><i
                    className="mdi mdi-download"></i></button>
            </td>
            <td>
                <button type="button" onClick={removeFacture} className="btn btn-danger waves-effect waves-light"><i
                    className="mdi mdi-close"></i></button>
            </td>
        </tr>
    );
};

export default FactureItem;