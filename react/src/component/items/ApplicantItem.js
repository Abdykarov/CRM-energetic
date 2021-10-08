/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";
import {
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
    console.log(applicant)
    const [hwGeneratedState, setHwGeneratedState] = useState(null)
    const [hwSentState, setHwSentState] = useState(null)
    const [hwSignedState, setHwSignedState] = useState(null)

    const [syselGeneratedState, setSyselGeneratedState] = useState(null)
    const [syselSentState, setSyselSentState] = useState(null)
    const [syselSignedState, setSyselSignedState] = useState(null)

    const [fveGeneratedState, setFveGeneratedState] = useState(null)
    const [fveSentState, setFveSentState] = useState(null)
    const [fveSignedState, setFveSignedState] = useState(null)

    const [edrRequestGeneratedState, setEdrRequestGeneratedState] = useState(null)
    const [edrRequestSentState, setEdrRequestSentState] = useState(null)
    const [edrRequestSignedState, setEdrRequestSignedState] = useState(null)
    const [edrRequestAcceptedState, setEdrRequestAcceptedState] = useState(null)

    const [factureGeneratedState, setFactureGeneratedState] = useState(null)
    const [factureSentState, setFactureSentState] = useState(null)
    const [facturePaidState, setFacturePaidState] = useState(null)

    useEffect(() => {
        setHwGeneratedState(applicant.hwsunMonitorGenerated)
        setHwSentState(applicant.hwsunMonitorSent)
        setHwSignedState(applicant.hwsunMonitorSigned)

        setSyselGeneratedState(applicant.syselAgreementGenerated)
        setSyselSentState(applicant.syselAgreementSent)
        setSyselSignedState(applicant.syselAgreementSigned)

        setFveGeneratedState(applicant.connectedFveGenerated)
        setFveSentState(applicant.requestToEdrSigned)
        setFveSignedState(applicant.requestToEdrSigned)

        setEdrRequestGeneratedState(applicant.requestToEdrGenerated)
        setEdrRequestSentState(applicant.requestToEdrSent)
        setEdrRequestSignedState(applicant.requestToEdrSigned)
        setEdrRequestAcceptedState(applicant.requestToEdrAccepted)

        setFactureGeneratedState(applicant.factureGenerated)
        setFactureSentState(applicant.factureSent)
        setFacturePaidState(applicant.facturePaid)
    }, [])

    // HW
    const setHwGenerated = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setHwDocumentGenerated(id)
            setHwGeneratedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setHwSent = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setHwDocumentSent(id)
            setHwSentState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setHwSigned = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setHwDocumentSigned(id)
            setHwSignedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    //SYSEL
    const setSyselGenerated = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setSyselDocumentGenerated(id)
            setSyselGeneratedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setSyselSent = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setSyselDocumentSent(id)
            setSyselSentState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setSyselSigned = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setSyselDocumentSigned(id)
            setSyselSignedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    //FVE
    const setFveGenerated = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setFveDocumentGenerated(id)
            setFveGeneratedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setFveSent = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setFveDocumentSent(id)
            setFveSentState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setFveSigned = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setFveDocumentSigned(id)
            setFveSignedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    //REQUEST
    const setEdrRequestGenerated = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setEdrRequestDocumentGenerated(id)
            setEdrRequestGeneratedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setEdrRequestSent = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setEdrRequestDocumentSent(id)
            setEdrRequestSentState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    const setEdrRequestSigned = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setEdrRequestDocumentSigned(id)
            setEdrRequestSignedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    //FACTURE
    const setFactureGenerated = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setFactureDocumentGenerated(id)
            setFactureGeneratedState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setFactureSent = async (e) => {
        try {
            let response
            let id = applicant.id
            response =  await setFactureDocumentSent(id)
            setFactureSentState(true)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
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
                <span className="badge bg-soft-success text-success">{applicant.roles[0].name}</span>
            </td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/' + applicant.salesman.id} className="text-body fw-semibold">{applicant.salesman.name} {applicant.salesman.surname}</a>
            </td>
            <td>
                {
                    applicant.contactPerson === null ?
                        "Nemá"
                        :
                        applicant.contactPerson
                }
            </td>
            <td>
                {applicant.area.name}
            </td>
            <td>{applicant.ico}</td>
            <td>
                {
                    applicant.referal === null ?
                        "Nemá"
                        :
                        <a href={CONTACT_PROFILE_ROUTE + '/' + applicant.referal.id} className="text-body fw-semibold">{applicant.referal.name} {applicant.referal.surname}</a>

                }
            </td>
            <td>
                <div className="form-check">
                    {(applicant.hwsunMonitorGenerated === false) ?
                        <input type="checkbox" onChange={setHwGenerated} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck1">vygenerovaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.hwsunMonitorSent === false) ?
                        <input type="checkbox" onChange={setHwSent} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">odeslaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.hwsunMonitorSigned === false) ?
                        <input type="checkbox" onChange={setHwSigned} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">podepsaný dodatek</label>
                </div>
            </td>
            <td>
                <div className="form-check">
                    {(applicant.syselAgreementGenerated === false) ?
                        <input type="checkbox" onChange={setSyselGenerated} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck1">vygenerovaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.syselAgreementSent === false) ?
                        <input type="checkbox" onChange={setSyselSent} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">odeslaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.syselAgreementSigned === false) ?
                        <input type="checkbox" onChange={setSyselSigned} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">podepsaný dodatek</label>
                </div>
            </td>
            <td>
                <div className="form-check">
                    {(applicant.connectedFveGenerated === false) ?
                        <input type="checkbox" onChange={setFveGenerated} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck1">vygenerovaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.connectedFveSent === false) ?
                        <input type="checkbox" onChange={setFveSent} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">odeslaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.connectedFveSigned === false) ?
                        <input type="checkbox" onChange={setFveSigned} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">podepsaný dodatek</label>
                </div>
            </td>
            <td>
                <div className="form-check">
                    {(applicant.requestToEdrGenerated === false) ?
                        <input type="checkbox" onChange={setEdrRequestGenerated} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck1">vygenerovaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.requestToEdrSent === false) ?
                        <input type="checkbox" onChange={setEdrRequestSent} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">odeslaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.requestToEdrSigned === false) ?
                        <input type="checkbox" onChange={setEdrRequestSigned} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">podepsaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.requestToEdrAccepted === false) ?
                        <input disabled type="checkbox" className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label">schvalený úcházeč</label>
                </div>
            </td>
            <td>
                <div className="form-check">
                    {(applicant.factureGenerated === false) ?
                        <input type="checkbox" onChange={setFactureGenerated} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck1">vygenerovaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.factureSent === false) ?
                        <input type="checkbox" onChange={setFactureSent} className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">odeslaný dodatek</label>
                </div>
                <div className="form-check">
                    {(applicant.facturePaid === false) ?
                        <input disabled type="checkbox" className="form-check-input"
                        />
                        :
                        <input checked disabled type="checkbox" className="form-check-input"
                        />
                    }
                    <label className="form-check-label"
                           htmlFor="customCheck2">zaplacená faktura</label>
                </div>
            </td>
            <td>
                <a href={CONTACT_PROFILE_ROUTE + '/'+ applicant.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};

export default ApplicantItem;