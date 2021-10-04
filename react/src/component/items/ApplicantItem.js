/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";
import {setEdrContractGenerated, setEdrContractSent, setEdrContractSigned} from "../../http/contactAPI";

const ApplicantItem = ({applicant}) => {
    const history = useHistory()
    console.log(applicant)
    const [hwGeneratedState, setHwGeneratedState] = useState(null)
    const [hwSentState, setHwSentState] = useState(null)
    const [hwSignedState, setHwSignedState] = useState(null)
    useEffect(() => {
        setHwGeneratedState(applicant.hwsunMonitorGenerated)
        setHwSentState(applicant.hwsunMonitorSent)
        setHwSignedState(applicant.hwsunMonitorSigned)
    }, [])
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
                <a href={CONTACT_PROFILE_ROUTE + '/'+ applicant.id} className="action-icon"> <i
                    className="mdi mdi-square-edit-outline"></i></a>
            </td>
        </tr>
    );
};

export default ApplicantItem;