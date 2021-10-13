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
                {
                    (hwSunMonitorStatus === "GENERATED") ?
                        <select value={hwSunMonitorStatus} onChange={e => setHwSunMonitor(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED" selected>Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (hwSunMonitorStatus === "SENT") ?
                        <select value={hwSunMonitorStatus} onChange={e => setHwSunMonitor(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT" selected>Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (hwSunMonitorStatus === "SIGNED") ?
                        <select value={hwSunMonitorStatus} onChange={e => setHwSunMonitor(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED" selected>Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (hwSunMonitorStatus === "NONE") ?
                        <select value={hwSunMonitorStatus} onChange={e => setHwSunMonitor(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option value="NONE" selected={true}>Žádný</option>
                        </select>
                        :
                        ""
                }

            </td>
            <td>
                {
                    (syselAgreementStatus === "GENERATED") ?
                        <select value={syselAgreementStatus} onChange={e => setSyselAgreement(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED" selected>Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (syselAgreementStatus === "SENT") ?
                        <select value={syselAgreementStatus} onChange={e => setSyselAgreement(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT" selected>Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (syselAgreementStatus === "SIGNED") ?
                        <select value={syselAgreementStatus} onChange={e => setSyselAgreement(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED" selected>Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (syselAgreementStatus === "NONE") ?
                        <select value={syselAgreementStatus} onChange={e => setSyselAgreement(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option value="NONE" selected={true}>Žádný</option>
                        </select>
                        :
                        ""
                }

            </td>
            <td>
                {
                    (connectedFveStatus === "GENERATED") ?
                        <select value={connectedFveStatus} onChange={e => setConnectedFve(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED" selected>Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (connectedFveStatus === "SENT") ?
                        <select value={connectedFveStatus} onChange={e => setConnectedFve(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT" selected>Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (connectedFveStatus === "SIGNED") ?
                        <select value={connectedFveStatus} onChange={e => setConnectedFve(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED" selected>Podepsaný</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (connectedFveStatus === "NONE") ?
                        <select value={connectedFveStatus} onChange={e => setConnectedFve(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option value="NONE" selected={true}>Žádný</option>
                        </select>
                        :
                        ""
                }
            </td>
            <td>
                {
                    (requestToEdrStatus === "GENERATED") ?
                        <select value={requestToEdrStatus} onChange={e => setRequestToEdr(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED" selected>Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option value="ACCEPTED">Schválený</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (requestToEdrStatus === "SENT") ?
                        <select value={requestToEdrStatus} onChange={e => setRequestToEdr(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT" selected>Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option value="ACCEPTED">Schválený</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (requestToEdrStatus === "SIGNED") ?
                        <select value={requestToEdrStatus} onChange={e => setRequestToEdr(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED" selected>Podepsaný</option>
                            <option value="ACCEPTED">Schválený</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (requestToEdrStatus === "NONE") ?
                        <select value={requestToEdrStatus} onChange={e => setRequestToEdr(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option value="ACCEPTED">Schválený</option>
                            <option value="NONE" selected={true}>Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (requestToEdrStatus === "ACCEPTED") ?
                        <select value={requestToEdrStatus} onChange={e => setRequestToEdr(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="SIGNED">Podepsaný</option>
                            <option value="ACCEPTED" selected>Schválený</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
            </td>
            <td>
                {
                    (factureStatus === "GENERATED") ?
                        <select value={factureStatus} onChange={e => setFacture(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED" selected>Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="PAID">Zaplácený</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (factureStatus === "SENT") ?
                        <select value={factureStatus} onChange={e => setFacture(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT" selected>Odeslaný</option>
                            <option value="PAID">Zaplácený</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (factureStatus === "PAID") ?
                        <select value={factureStatus} onChange={e => setFacture(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="PAID" selected>Zaplácený</option>
                            <option disabled value="NONE">Žádný</option>
                        </select>
                        :
                        ""
                }
                {
                    (factureStatus === "NONE") ?
                        <select value={factureStatus} onChange={e => setFacture(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                            <option value="GENERATED">Vygenerovaný</option>
                            <option value="SENT">Odeslaný</option>
                            <option value="PAID">Zaplácený</option>
                            <option disabled value="NONE" selected>Žádný</option>
                        </select>
                        :
                        ""
                }
            </td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/'+ applicant.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};

export default ApplicantItem;