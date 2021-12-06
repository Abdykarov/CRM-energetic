/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";
import {
    setDocumentState,
    setEdrContractGenerated,
    setEdrContractSent,
    setEdrContractSigned, setEdrRequestDocumentGenerated, setEdrRequestDocumentSent, setEdrRequestDocumentSigned,
    setFactureDocumentGenerated,
    setFactureDocumentSent, setFveDocumentGenerated, setFveDocumentSent, setFveDocumentSigned,
    setHwDocumentGenerated,
    setHwDocumentSent,
    setHwDocumentSigned,
    setSyselDocumentGenerated,
    setSyselDocumentSent,
    setSyselDocumentSigned
} from "../../http/contactAPI";
import {$authHost} from "../../http";

const ApplicantItem = ({applicant}) => {
    const history = useHistory()
    const [hwSunMonitorStatus, setHwSunMonitorStatus] = useState(applicant.hwsunMonitorStatus)
    const [syselAgreementStatus, setSyselAgreementStatus] = useState(applicant.syselAgreementStatus)
    const [connectedFveStatus, setConnectedFveStatus] = useState(applicant.connectedFveStatus)
    const [requestToEdrStatus, setRequestToEdrStatus] = useState(applicant.requestToEdrStatus)
    const [factureStatus, setFactureStatus] = useState(applicant.factureStatus)

    const setHwSunMonitor = async (status) => {
        try {
            let response
            let id = applicant.id
            let document = "hwSunMonitor"
            response =  await setDocumentState(id, document, status)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setSyselAgreement = async (status) => {
        try {
            let response
            let id = applicant.id
            let document = "syselAgreement"
            response =  await setDocumentState(id, document, status)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setConnectedFve = async (status) => {
        try {
            let response
            let id = applicant.id
            let document = "connectedFve"
            response =  await setDocumentState(id, document, status)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setRequestToEdr = async (status) => {
        try {
            let response
            let id = applicant.id
            let document = "requestToEdr"
            response =  await setDocumentState(id, document, status)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setFacture = async (status) => {
        try {
            let response
            let id = applicant.id
            let document = "facture"
            response =  await setDocumentState(id, document, status)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    function roleTextSwitch(param) {
        switch(param) {
            case 'SIGNED':
                return 'Podepsaný';
            default:
                return 'Nepodepsaný';
        }
    }

    function factureStateFactory(param) {
        switch(param) {
            case 'GENERATED':
                return 'Vygenerovaný';
            case 'SENT':
                return 'Odeslaný';
            case 'PAID':
                return 'Zaplácený';
            default:
                return 'Žádný';
        }
    }

    function edrRequestStateFactory(param) {
        switch(param) {
            case 'GENERATED':
                return 'Vygenerovaný';
            case 'SENT':
                return 'Odeslaný';
            case 'SIGNED':
                return 'Zaplácený';
            case 'ACCEPTED':
                return 'Schválený';
            default:
                return 'Žádný';
        }
    }
    return (
        <tr className="applicant-table">
            <td>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                           id="customCheck2" />
                    <label className="form-check-label"
                           htmlFor="customCheck2">&nbsp;</label>
                </div>
            </td>
            <td><a href={CONTACT_PROFILE_ROUTE + '/'+ applicant.id} className="action-icon">
                <img src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt="" width="35px"/>
            </a></td>
            <td className="table-user">
                <a href={CONTACT_PROFILE_ROUTE + '/' + applicant.id} className="text-body fw-semibold">{applicant.name}</a>
            </td>
            <td>
                {applicant.name}
            </td>
            <td>
                {applicant.surname}
            </td>
            <td>
                {applicant.phone}
            </td>
            <td>{applicant.email}</td>
            <td>
                <span className='badge bg-soft-success text-success'>{applicant.roles[0].name}</span>
            </td>
            <td>
                {applicant.area.name}
            </td>
            <td>
                {applicant.ico}
            </td>
            <td>
                {applicant.contactPerson}
            </td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/' + applicant.salesman.id} className="text-body fw-semibold">{applicant.salesman.name} {applicant.salesman.surname}</a>
            </td>
            <td>
                { applicant.referal === null ? "Nemá kampan" : <a href={CONTACT_PROFILE_ROUTE + '/' + applicant.referal.id} className="text-body fw-semibold">{applicant.referal.name} {applicant.referal.surname}</a>
                }
            </td>
            <td>
                <div className="document_state">
                    {roleTextSwitch(hwSunMonitorStatus)}
                </div>
            </td>
            <td>
                <div className="document_state">
                    {roleTextSwitch(syselAgreementStatus)}
                </div>

            </td>
            <td>
                <div className="document_state">
                    {roleTextSwitch(connectedFveStatus)}
                </div>
            </td>
            <td>
                <div className="document_state">
                    {edrRequestStateFactory(requestToEdrStatus)}
                </div>
            </td>
            <td>
                <div className="document_state">
                    {factureStateFactory(factureStatus)}
                </div>
            </td>
        </tr>
    );
};

export default ApplicantItem;