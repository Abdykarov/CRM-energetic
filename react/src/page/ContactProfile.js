/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {
    createInvite,
    deleteContract,
    deleteEdrRequest,
    deleteFve,
    deleteSysel,
    deleteUser,
    deleteUserFacture,
    fetchUserById,
    sendEdrRegistrationLink,
    sendInviteLink,
    setEdrContractGenerated,
    setEdrContractSent,
    setEdrContractSigned,
    updateToAccepted,
    updateToApplicant,
    updateToCurrent,
    updateToEdr,
    updateToLead,
    updateToLost,
    updateToPotential,
    updateUserEntity,
    uploadSignedContract
} from "../http/contactAPI";
import {useHistory, useParams} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE, CONTACTS_ROUTE, DASHBOARD_ROUTE, LEAD_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {edrRegistrate, login} from "../http/userAPI";
import {createEdrNote, fetchCommunicationByUserId, fetchEdrNotesByUserId} from "../http/mailAPI";
import Footer from "../component/Footer";
import {deleteFactureByUserId, fetchFactureByUserId, fetchInviteByUserId, generateFacture} from "../http/factureAPI";
import FactureTable from "../component/tables/FactureTable";
import {deleteInvite} from "../http/inviteAPI";

const ContactProfile = observer(() => {
    const {user} = useContext(Context)
    const {communication} = useContext(Context)
    const {notes} = useContext(Context)
    const [contact, setContact] = useState({info: []})
    const [selectedContractFile, setSelectedContractFile] = useState(null)
    const [role,setRole] = useState('')
    const [facture,setFacture] = useState(null)
    const [invite,setInvite] = useState(null)
    const [generatedFacture, setGeneratedFacture] = useState('')
    const [updatedName, setUpdatedName] = useState('')
    const [updatedSurname, setUpdatedSurname] = useState('')
    const [updatedPhone, setUpdatedPhone] = useState('')
    const [updatedIco, setUpdatedIco] = useState('')
    const [updatedContactPerson, setUpdatedContactPerson] = useState('')
    const [updatedEmail, setUpdatedEmail] = useState('')
    const [areaName,setAreaName] = useState('')
    const [referalName,setReferalName] = useState('')
    const [referalSurname,setReferalSurname] = useState('')
    const [salesmanName,setSalesmanName] = useState('')
    const [salesmanSurname,setSalesmanSurname] = useState('')
    const [signedContract, setSignedContract] = useState(null)
    const [signedRequestToEdr, setSignedRequestToEdr] = useState(null)
    const [hwsunMonitor, setHwSunMonitor] = useState(null)
    const [connectedFVE, setConnectedFVE] = useState(null)
    const [syselAgreement, setSyselAgreement] = useState(null)
    const [edrRequest, setEdrRequest] = useState(null)
    const [selectedHWFile, setSelectedHWFile] = useState(null)
    const [selectedConnectedFveFile, setSelectedConnectedFVE] = useState(null)
    const [selectedSyselAgreementFile, setSelectedSyselAgreementFile] = useState(null)
    const [selectedEdrRequest, setSelectedEdrRequest] = useState(null)
    const [noteMessage,setNoteMessage] = useState('')
    const {id} = useParams()
    const history = useHistory()
    const [contractGenerated, setContractGenerated] = useState(null)
    const [contractSent, setContractSent] = useState(null)
    const [contractSigned, setContractSigned] = useState(null)


    useEffect(() => {

        fetchUserById(id).then(data => {
            setContact(data)
            setContractSigned(data.edrContractSigned)
            setContractSent(data.edrContractSent)
            setContractGenerated(data.edrContractGenerated)
            setSignedContract(data.edrContractSigned)
            setConnectedFVE(data.connectedFveSigned)
            setSignedRequestToEdr(data.requestToEdrSigned)
            setRole(data.roles[0].name)
            setUpdatedName(data.name)
            setUpdatedSurname(data.surname)
            setUpdatedPhone(data.phone)
            setUpdatedEmail(data.email)
            setUpdatedIco(data.ico)
            if(data.factureGenerated){
                let userId = id;
                fetchFactureByUserId(userId).then(data => {
                    setFacture(data);
                    console.log(data)
                })
            }
            if(data.requestToEdrGenerated){
                let userId = id;
                fetchInviteByUserId(userId).then(data => {
                    setInvite(data);
                    console.log(data)
                })
            }
            console.log(data)
        })

        fetchEdrNotesByUserId(id).then(data => {
            notes.setNotes(data)
            console.log(data)
        })
        fetchCommunicationByUserId(id).then(data => {
            communication.setContacts(data)
            console.log(data)
        })
    }, [])

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
    // REQEUST TO EDR

    const generateEdrRequest= async () => {
        try {
            let response
            response = await createInvite(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const sendInvite = async () => {
        try {
            let response
            response = await sendInviteLink(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const fetchEdrRequest = async () => {
        fetch(process.env.REACT_APP_API_URL + "edr_api/edr_request/generate/" + id, {
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

    const fetchFacture = async () => {
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

    const deleteRequest = async () => {
        try {
            let response
            response = await deleteEdrRequest(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const deleteFactureFunc = async () => {
        try {
            let response
            response = await deleteUserFacture(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const saveRequest = async () => {
        if (!(selectedEdrRequest == null)){

            let formData = new FormData();
            formData.append('file', selectedEdrRequest);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            axios.post(
                process.env.REACT_APP_API_URL + "edr_api/edr_request/save/" + id,
                formData,
                {
                    headers: {
                        "Authorization": 'Bearer '+ localStorage.getItem('token'),
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    // SYSEL AGREEMENT
    const fetchSyselAgreement = async () => {
        fetch(process.env.REACT_APP_API_URL + "edr_api/sysel/fetch/" + id, {
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

    const deleteSyselAgreement = async () => {
        try {
            let response
            response = await deleteSysel(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const saveSyselAgreement = async () => {
        if (!(selectedSyselAgreementFile == null)){

            let formData = new FormData();
            formData.append('file', selectedSyselAgreementFile);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            axios.post(
                process.env.REACT_APP_API_URL + "edr_api/sysel/save/" + id,
                formData,
                {
                    headers: {
                        "Authorization": 'Bearer '+ localStorage.getItem('token'),
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    // Connected FVE
    const fetchConnectedFve = async () => {
        fetch(process.env.REACT_APP_API_URL + "edr_api/fve/fetch/" + id, {
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

    const deleteConnectedFve = async () => {
        try {
            console.log(1)
            let response
            response = await deleteFve(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const saveConnectedFVE = async () => {
        if (!(selectedConnectedFveFile == null)){

            let formData = new FormData();
            formData.append('file', selectedConnectedFveFile);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            axios.post(
                process.env.REACT_APP_API_URL + "edr_api/fve/save/" + id,
                formData,
                {
                    headers: {
                        "Authorization": 'Bearer '+ localStorage.getItem('token'),
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    // HW FILE
    const fetchHwSunMonitor = async () => {
        fetch(process.env.REACT_APP_API_URL + "edr_api/hw/fetch/" + id, {
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

    const deleteHwSunMonitor= async () => {
        try {
            let response
            response = await deleteHwSun(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const saveHwFile = async () => {
        if (!(selectedHWFile == null)){

            let formData = new FormData();
            formData.append('file', selectedHWFile);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            axios.post(
                process.env.REACT_APP_API_URL + "edr_api/hw/save/" + id,
                formData,
                {
                    headers: {
                        "Authorization": 'Bearer '+ localStorage.getItem('token'),
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    // SUPER CONTRACT
    const generateSupercontract = async () => {
        fetch(process.env.REACT_APP_API_URL + "edr_api/supercontract/generate/" + id, {
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

    const fetchSupercontract = async () => {
        fetch(process.env.REACT_APP_API_URL + "edr_api/supercontract/fetch/" + id, {
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

    const deleteSignedContract = async () => {
        try {
            let response
            response = await deleteContract(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const saveContract = async () => {
        if (!(selectedContractFile == null)){

            let formData = new FormData();
            formData.append('file', selectedContractFile);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            axios.post(
                process.env.REACT_APP_API_URL + "edr_api/supercontract/save/" + id,
                formData,
                {
                    headers: {
                        "Authorization": 'Bearer '+ localStorage.getItem('token'),
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const removeInvite = async () => {
        try {
            let response;
            let inviteId = invite.id;
            response =  await deleteInvite(inviteId)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
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
    // CONTACT ROLES

    const changeToLead = async () => {
        try {
            let response
            response = await updateToLead(id)
            history.push(LEAD_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const changeToLost = async () => {
        try {
            let response
            response = await updateToLost(id)
            history.push(CONTACTS_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const deleteContact = async () => {
        try {
            let response
            response = await deleteUser(id)
            history.push(CONTACTS_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const changeToApplicant = async () => {
        try {
            let response
            response = await updateToApplicant(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const changeToEdr = async () => {
        try {
            let response
            response = await updateToEdr(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    // Generate referal link, save to db and send to the client
    const sendEdrRegistration = async () => {
        try {
            let response
            response = await sendEdrRegistrationLink(id)
            history.push(LOGIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    // notes
    const createNote = async () => {
        try {
            let data;
            let managerId = user.id;
            let userId = id;
            let message = noteMessage;

            data = await createEdrNote(managerId, userId, message);
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const updateUser = async () => {
        try {
            let data;
            let userId = id;
            let editorId = user.id;
            let name = updatedName;
            let surname = updatedSurname;
            let phone = updatedPhone;
            let email = updatedEmail;
            let ico = updatedIco;

            data = await updateUserEntity(userId, editorId, name, surname, phone, email, ico);
            window.location.reload();
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

    const confirmLead = async () => {
        document.getElementById("lead-modal").classList.add("show");
    }

    const confirmLost = async () => {
        document.getElementById("lost-modal").classList.add("show");
    }

    const confirmDelete = async () => {
        document.getElementById("delete-modal").classList.add("show");
    }

    const closeLead = async () => {
        document.getElementById("lead-modal").classList.remove("show");
    }

    const closeLost = async () => {
        document.getElementById("lost-modal").classList.remove("show");
    }

    const closeDelete = async () => {
        document.getElementById("delete-modal").classList.remove("show");
    }

    const confirmApplicant = async () => {
        document.getElementById("applicant-modal").classList.add("show");
    }

    const closeApplicant = async () => {
        document.getElementById("applicant-modal").classList.remove("show");
    }

    const createFacture = async () => {
        try {
            let data;
            let userId = contact.id;
            data = await generateFacture(userId);
            setGeneratedFacture(true);
            fetchFactureByUserId(userId).then(data => {
                setFacture(data);
                console.log(data)
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const showFacturePopup = async () => {
        try {
            let data;
            let userId = contact.id;
            data = await generateFacture(userId);
            document.getElementById("facture-modal").classList.add("show");
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const closeFacturePopup = async () => {
        document.getElementById("facture-modal").classList.remove("show");
    }

    function roleClassSwitch(param) {
        switch(param) {
            case 'NEW':
                return 'badge bg-soft-success text-success';
            case 'LOST':
                return 'badge bg-soft-danger text-danger';
            case 'DEFERRED':
                return 'badge bg-soft-warning text-warning';
            case 'EDR_CANCELLED':
                return 'badge bg-soft-dark text-dark';
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
            case 'CC':
                return 'CALL CENTRUM';
            case 'SALESMAN':
                return 'OBCHODNÍ ZÁSTUPCE';
            case 'ADMIN':
                return 'ADMIN';
            case 'MANAGER':
                return 'MANAŽER';
            case 'GENERATED':
                return 'ZGENEROVANÝ';
            case 'PAID':
                return 'ZAPLACENÝ';
            case 'EXPIRED':
                return 'VYPRŠENÍ';
            case 'NEW':
                return 'NOVÝ';
            case 'EDR':
                return 'EDR';
            case 'APPLICANT':
                return 'UCHAZEČ';
            case 'LOST':
                return 'ZTRACENÝ';
            case 'DEFERRED':
                return 'ODLOŽENÝ';
            case 'EDR_CANCELLED':
                return 'ZRUŠENÝ ČLEN';
            default:
                return 'NOVÝ';
        }
    }



    return (
        <div>
            <div id="facture-modal" className="modal fade" tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content modal-filled bg-success">
                        <div className="modal-body p-4">
                            <div className="text-center">
                                <i className="dripicons-checkmark h1 text-white"></i>
                                <h4 className="mt-2 text-white">Děkuji!</h4>
                                <p className="mt-3 text-white">Faktura byla uspěšně vygenerovaná.</p>
                                <button onClick={closeFacturePopup} type="button" className="btn btn-light my-2" data-bs-dismiss="modal">Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="lead-modal" tabIndex="-1" aria-labelledby="scrollableModalTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="scrollableModalTitle">Potvrzení přechodu</h5>
                            <button onClick={closeLead} type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Opravdu chcete změnit stav na Lead?
                            </p>
                            <button onClick={changeToLead} type="button"
                                    className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na Lead
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeLead} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="lost-modal" tabIndex="-1" aria-labelledby="scrollableModalTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="scrollableModalTitle">Potvrzení přechodu</h5>
                            <button onClick={closeLost} type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Opravdu chcete změnit stav na Ztracený?
                            </p>
                            <button onClick={changeToLost} type="button"
                                    className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na Ztracený
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeLost} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="delete-modal" tabIndex="-1" aria-labelledby="scrollableModalTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="scrollableModalTitle">Potvrzení smazaní</h5>
                            <button onClick={closeDelete} type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Opravdu chcete smazat klienta?
                            </p>
                            <button onClick={deleteContact} type="button"
                                    className="mb-3 btn btn-primary waves-effect waves-light">Smazat
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeDelete} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="applicant-modal" tabIndex="-1" aria-labelledby="scrollableModalTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="scrollableModalTitle">Potvrzení přechodu</h5>
                            <button onClick={closeApplicant} type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Opravdu chcete změnit stav na Ucházeč?
                            </p>
                            <button onClick={changeToApplicant} type="button"
                                    className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na Ucházeč
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeApplicant} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
                <div className="content-page">
                    <div className="content">

                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href={DASHBOARD_ROUTE}>Main</a>
                                                </li>
                                                <li className="breadcrumb-item active">Profile</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Profile</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 col-xl-4">
                                    <div className="card text-center">
                                        <div className="card-body">
                                            <img src="/images/users/user-5.jpg"
                                                 className="rounded-circle avatar-lg img-thumbnail"
                                                 alt="profile-image" />

                                            <h4 className="mb-0">{contact.name + ' ' + contact.surname}</h4>
                                              <p className="text-muted"><span className={roleClassSwitch(role)}>{roleTextSwitch(role)}</span>
                                            </p>

                                            <p
                                                    className="btn btn-danger btn-xs email-btn  mb-2 waves-light"> {contact.email}
                                            </p>

                                            <div className="text-start mt-3">
                                                <h4 className="font-13 text-uppercase">Role :
                                                    <span className={roleClassSwitch(role)}>{roleTextSwitch(role)}</span>
                                                </h4>

                                                <p className="text-muted mb-2 font-13"><strong>Jméno a přijmení :</strong>
                                                    <span className="ms-2">{contact.name + ' ' + contact.surname}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Telefon :</strong><span
                                                    className="ms-2">{contact.phone}</span></p>

                                            </div>


                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-8 col-xl-8">
                                    <div className="card">
                                        <div className="card-body">
                                                {
                                                    (role === "ADMIN" || role === "MANAGER" || role === "SALESMAN" || role === "CC") ?
                                                        <ul className="nav nav-pills nav-fill navtab-bg">
                                                            <li className="nav-item">
                                                                <a href="#edit" data-bs-toggle="tab" aria-expanded="false"
                                                                   className="nav-link active">
                                                                    Edit profile
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        :
                                                    <ul className="nav nav-pills nav-fill navtab-bg">
                                                        <li className="nav-item">
                                                            <a href="#attachments" data-bs-toggle="tab" aria-expanded="true"
                                                               className="nav-link active">
                                                                Přílohy
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a href="#edit" data-bs-toggle="tab" aria-expanded="false"
                                                               className="nav-link">
                                                                Edit profile
                                                            </a>
                                                        </li>
                                                    </ul>
                                                }
                                            <div className="tab-content">
                                                {(role === "ADMIN" || role === "MANAGER" || role === "SALESMAN" || role === "CC") ?
                                                    <div className="tab-pane show" id="attachments">
                                                    </div>
                                                    :
                                                    <div className="tab-pane show active" id="attachments">
                                                        <h5>Přílohy</h5>

                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                {
                                                                    (role === "LEAD") ?
                                                                        <div className="col-md-12">
                                                                            <h3>Supersmlouva</h3>
                                                                            <button onClick={generateSupercontract} type="button" className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                                className="mdi mdi-cloud-outline me-1"></i> Vygenerovat supersmlouvu
                                                                            </button> <br/>
                                                                            <button onClick={generateSupercontract} type="button" className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                                className="mdi mdi-cloud-outline me-1"></i> Vygenerovat dilčí supersmlouvu
                                                                            </button>
                                                                            <br/><br/>
                                                                            <div className="mb-3">
                                                                                { (contact.edrContractSigned !== true) ?
                                                                                    <div className="mb-3">
                                                                                        <label htmlFor="example-fileinput" className="form-label">
                                                                                            Přidat podepsanou super nebo dilčí smlouvu</label>
                                                                                        <input type="file" onChange={e => setSelectedContractFile(e.target.files[0])} id="example-fileinput"
                                                                                               className="form-control"/> <br/>
                                                                                        <button onClick={saveContract} type="button"
                                                                                                className="mt-3 btn btn-primary waves-effect waves-light">Uložit podepsanou smlouvu
                                                                                        </button>
                                                                                    </div>
                                                                                    :
                                                                                    <div>
                                                                                        <button onClick={fetchSupercontract} type="button"
                                                                                                className="btn btn-success waves-effect waves-light">Stahnout podepsanou smlouvu
                                                                                        </button> <br/>
                                                                                        <button onClick={deleteSignedContract} type="button"
                                                                                                className="mt-3 btn btn-danger waves-effect waves-light">Odstranit podepsanou smlouvu
                                                                                        </button>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        : <div></div>
                                                                }
                                                                {
                                                                    (role === "APPLICANT") ?
                                                                        <div className="col-md-12">
                                                                            <h4>Příhláška</h4>

                                                                            <button onClick={generateEdrRequest} type="button" className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                                className="mdi mdi-cloud-outline me-1"></i> Vygenerovat příhlášku do sýstemu
                                                                            </button> <br/>
                                                                            <button onClick={fetchEdrRequest} type="button" className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                                className="mdi mdi-cloud-outline me-1"></i> Vytisknout příhlášku
                                                                            </button> <br/>
                                                                            <button type="button" onClick={sendInvite} className="mb-3 btn btn-dark waves-effect waves-light"><i
                                                                                className="mdi mdi-cloud-outline me-1"></i> Zaslat příhlášku do mailu
                                                                            </button>
                                                                            {
                                                                                invite !== null ?
                                                                                    <div className="table-responsive">
                                                                                        <table className="table table-centered table-nowrap table-striped"
                                                                                               id="products-datatable">
                                                                                            <thead>
                                                                                            <tr>
                                                                                                <th>Dátum vytvoření</th>
                                                                                                <th>Stav příhlášky</th>
                                                                                                <th>Detaily</th>
                                                                                                <th>Odstranit</th>
                                                                                            </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td>{invite.createdAt}</td>
                                                                                                <td>{invite.inviteStatus}</td>
                                                                                                <td><a href={'http://85.255.2.224/registration/view/invite/'+invite.uniqueCode}>Info</a></td>
                                                                                                <td>
                                                                                                    <button type="button" onClick={removeInvite} className="btn btn-danger waves-effect waves-light"><i
                                                                                                        className="mdi mdi-close"></i></button>
                                                                                                </td>
                                                                                              </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div> : ""
                                                                            }
                                                                            <br/><br/>
                                                                            <h4>Faktura</h4>
                                                                            <button onClick={createFacture} type="button" className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                                className="mdi mdi-cloud-outline me-1"></i> Vygenerovat fakturu
                                                                            </button>
                                                                            {
                                                                                facture !== null ?
                                                                                    <div className="table-responsive">
                                                                                        <table className="table table-centered table-nowrap table-striped"
                                                                                               id="products-datatable">
                                                                                            <thead>
                                                                                            <tr>
                                                                                                <th>Jméno</th>
                                                                                                <th>Příjmení</th>
                                                                                                <th>Datum vytvoření</th>
                                                                                                <th>Datum splatností</th>
                                                                                                <th>Variabilní symbol</th>
                                                                                                <th>Částka</th>
                                                                                                <th>Stav faktury</th>
                                                                                                <th>Stahnout</th>
                                                                                                <th>Odstranit</th>
                                                                                            </tr>
                                                                                            </thead>
                                                                                            <tbody>
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
                                                                                                    <button type="button" onClick={fetchFacture} className="btn btn-success waves-effect waves-light"><i
                                                                                                        className="mdi mdi-download"></i></button>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <button type="button" onClick={removeFacture} className="btn btn-danger waves-effect waves-light"><i
                                                                                                        className="mdi mdi-close"></i></button>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div> : ""
                                                                            }


                                                                        </div>
                                                                        : <div></div>
                                                                }

                                                                {
                                                                    (role === "NEW") ?
                                                                        <div className="col-md-6">
                                                                            <h3>Nemáte žádné přílohy</h3>
                                                                        </div>

                                                                        : <div></div>
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                }
                                                {(role === "ADMIN" || role === "MANAGER" || role === "SALESMAN" || role === "CC") ?
                                                    <div className="tab-pane active" id="edit">
                                                        <form>
                                                            <h5 className="mb-4 text-uppercase"><i
                                                                className="mdi mdi-account-circle me-1"></i> Osobní informace</h5>
                                                            <div className="row">

                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="firstname" className="form-label">Jméno</label>
                                                                        <input value={updatedName} onChange={e => setUpdatedName(e.target.value)} type="text" className="form-control"
                                                                               id="firstname" placeholder="Enter first name" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="lastname" className="form-label">Příjmení</label>
                                                                        <input value={updatedSurname} onChange={e => setUpdatedSurname(e.target.value)} type="text" className="form-control"
                                                                               id="lastname" placeholder="Enter last name"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="lastname" className="form-label">Telefon</label>
                                                                        <input value={updatedPhone} onChange={e => setUpdatedPhone(e.target.value)} type="number" className="form-control"
                                                                               id="lastname" placeholder="Enter last name"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="lastname" className="form-label">Email</label>
                                                                        <input value={updatedEmail} onChange={e => setUpdatedEmail(e.target.value)} type="name" className="form-control"
                                                                               id="lastname" placeholder="Enter last name"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="lastname" className="form-label">PSČ</label>
                                                                        <input value={updatedIco} onChange={e => setUpdatedIco(e.target.value)} type="number" className="form-control"
                                                                               id="lastname" placeholder="Enter last name"/>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="text-end">
                                                                <button onClick={updateUser} type="button"
                                                                        className="btn btn-success waves-effect waves-light mt-2">
                                                                    <i className="mdi mdi-content-save"></i> Save
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    :
                                                    <div className="tab-pane" id="edit">
                                                        <div className="row">
                                                            <div className="col-md-12 mb-6">
                                                                {
                                                                    (role === "NEW")?
                                                                        <div className="row">
                                                                            <h5 className="mb-4 text-uppercase"><i
                                                                                className="mdi mdi-account-circle me-1"></i> Změna stavu</h5>
                                                                            <div className="col-md-12">
                                                                                <button onClick={confirmLead} type="button"
                                                                                        className="mb-3 btn btn-primary waves-effect waves-light role_btn">Změnit stav na Lead
                                                                                </button>

                                                                                <button onClick={confirmLost} type="button"
                                                                                        className="mb-3 btn btn-warning waves-effect waves-light role_btn">Změnit stav na Ztracený
                                                                                </button>

                                                                                <button onClick={confirmDelete} type="button"
                                                                                        className="mb-3 btn btn-danger waves-effect waves-light role_btn">Smazat klienta
                                                                                </button>
                                                                            </div>
                                                                        </div> : <div></div>
                                                                }
                                                                {
                                                                    (role === "LOST")?
                                                                        <div className="row">
                                                                            <h5 className="mb-4 text-uppercase"><i
                                                                                className="mdi mdi-account-circle me-1"></i> Změna stavu</h5>
                                                                            <div className="col-md-12">
                                                                                <button onClick={confirmLead} type="button"
                                                                                        className="mb-3 btn btn-primary waves-effect waves-light role_btn">Změnit stav na Lead
                                                                                </button>

                                                                                <button onClick={confirmDelete} type="button"
                                                                                        className="mb-3 btn btn-danger waves-effect waves-light role_btn">Smazat klienta
                                                                                </button>
                                                                            </div>
                                                                        </div> : <div></div>
                                                                }
                                                                {
                                                                    (role === "DEFERRED")?
                                                                        <div className="row">
                                                                            <h5 className="mb-4 text-uppercase"><i
                                                                                className="mdi mdi-account-circle me-1"></i> Změna stavu</h5>
                                                                            <div className="col-md-12">
                                                                                <button onClick={confirmLead} type="button"
                                                                                        className="mb-3 btn btn-primary waves-effect waves-light role_btn">Změnit stav na Lead
                                                                                </button>

                                                                                <button onClick={confirmDelete} type="button"
                                                                                        className="mb-3 btn btn-danger waves-effect waves-light role_btn">Smazat klienta
                                                                                </button>
                                                                            </div>
                                                                        </div> : <div></div>
                                                                }
                                                                {
                                                                    (role === "LEAD")?
                                                                        <div className="row">
                                                                            <h5 className="mb-4 text-uppercase"><i
                                                                                className="mdi mdi-account-circle me-1"></i> Změna stavu</h5>
                                                                            <div className="col-md-12">
                                                                                <button onClick={confirmApplicant} type="button"
                                                                                        className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na úchazeče
                                                                                </button>

                                                                                <button onClick={confirmLost} type="button"
                                                                                        className="mb-3 btn btn-warning waves-effect waves-light role_btn">Změnit stav na Ztracený
                                                                                </button>

                                                                                <button onClick={confirmDelete} type="button"
                                                                                        className="mb-3 btn btn-danger waves-effect waves-light role_btn">Smazat klienta
                                                                                </button>
                                                                            </div>
                                                                        </div> : <div></div>
                                                                }
                                                                {
                                                                    (role === "APPLICANT")?
                                                                        <div className="row">
                                                                            <h5 className="mb-4 text-uppercase"><i
                                                                                className="mdi mdi-account-circle me-1"></i> Změna stavu</h5>
                                                                            <div className="col-md-12">
                                                                                <button onClick={sendEdrRegistration} type="button"
                                                                                        className="mb-3 btn btn-primary waves-effect waves-light">Zgenerirovat a odeslat odkaz na registraci v sýstemu

                                                                                </button>
                                                                                <br/>
                                                                                <button onClick={confirmLost} type="button"
                                                                                        className="mb-3 btn btn-warning waves-effect waves-light role_btn">Změnit stav na Ztracený
                                                                                </button>

                                                                                <button onClick={confirmDelete} type="button"
                                                                                        className="mb-3 btn btn-danger waves-effect waves-light role_btn">Smazat klienta
                                                                                </button>
                                                                            </div>
                                                                        </div> : <div></div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="tab-pane active" id="edit">
                                                            <form>
                                                                <h5 className="mb-4 text-uppercase"><i
                                                                    className="mdi mdi-account-circle me-1"></i> Osobní informace</h5>
                                                                <div className="row">

                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3">
                                                                            <label htmlFor="firstname" className="form-label">Jméno</label>
                                                                            <input value={updatedName} onChange={e => setUpdatedName(e.target.value)} type="text" className="form-control"
                                                                                   id="firstname" placeholder="Enter first name" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3">
                                                                            <label htmlFor="lastname" className="form-label">Příjmení</label>
                                                                            <input value={updatedSurname} onChange={e => setUpdatedSurname(e.target.value)} type="text" className="form-control"
                                                                                   id="lastname" placeholder="Enter last name"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3">
                                                                            <label htmlFor="lastname" className="form-label">Telefon</label>
                                                                            <input value={updatedPhone} onChange={e => setUpdatedPhone(e.target.value)} type="number" className="form-control"
                                                                                   id="lastname" placeholder="Enter last name"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3">
                                                                            <label htmlFor="lastname" className="form-label">Email</label>
                                                                            <input value={updatedEmail} onChange={e => setUpdatedEmail(e.target.value)} type="name" className="form-control"
                                                                                   id="lastname" placeholder="Enter last name"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3">
                                                                            <label htmlFor="lastname" className="form-label">PSČ</label>
                                                                            <input value={updatedIco} onChange={e => setUpdatedIco(e.target.value)} type="name" className="form-control"
                                                                                   id="lastname" placeholder="Enter last name"/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="text-end">
                                                                    <button onClick={updateUser} type="button"
                                                                            className="btn btn-success waves-effect waves-light mt-2">
                                                                        <i className="mdi mdi-content-save"></i> Save
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                }


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {
                                (role === "ADMIN" || role === "MANAGER" || role === "SALESMAN" || role === "CC") ?
                                    ""
                                    :
                                    <div className="row mt-3">

                                        <div className="col-xl-8">
                                            <div className="email-communication">
                                                <h4>Komunikace OZ s klientem</h4>
                                                <ul className="conversation-list" data-simplebar="init">
                                                    {
                                                        communication.contacts.length === 0 ?
                                                        "V současné chvíli neexistuje záznam o komunikaci s klientem"
                                                        :
                                                        communication.contacts.map(mail =>
                                                        mail.emailFrom == contact.email ?
                                                            <li className="clearfix odd" >
                                                                <div className="chat-avatar">
                                                                    <img src="/images/users/user-5.jpg" alt="James Z"
                                                                         className="rounded" />
                                                                </div>
                                                                <div className="conversation-text">
                                                                    <div className="ctext-wrap">
                                                                        <i>{mail.emailFrom}</i>
                                                                        <i>{mail.emailDate}</i>
                                                                        <i>{mail.subject}</i>
                                                                        <p className="ft-intro ft-day1 ft-day2"
                                                                           dangerouslySetInnerHTML={{__html:mail.body}} >
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            :
                                                            <li className="clearfix" >
                                                                <div className="chat-avatar">
                                                                    <img src="/images/users/user-5.jpg" alt="James Z"
                                                                         className="rounded" />
                                                                </div>
                                                                <div className="conversation-text">
                                                                    <div className="ctext-wrap">
                                                                        <i>{mail.emailFrom}</i>
                                                                        <i>{mail.emailDate}</i>
                                                                        <i>{mail.subject}</i>
                                                                        <p className="ft-intro ft-day1 ft-day2"
                                                                           dangerouslySetInnerHTML={{__html:mail.body}} >
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                    )}

                                                </ul>


                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="notes">
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h5 className="mb-2 font-size-16">Poznamky backoffice</h5>

                                                        {notes.notes.map(note =>
                                                            <div className="d-flex align-items-start mt-3 p-1">
                                                                <img src="/images/users/user-9.jpg"
                                                                     className="me-2 rounded-circle" alt="Arya Stark" height="36"/>
                                                                <div className="w-100">
                                                                    <h5 className="mt-0 mb-0 font-size-14">
                                                                <span
                                                                    className="float-end text-muted font-12">{note.createdAt}</span>
                                                                        {note.manager.name}
                                                                        <br/>
                                                                        {note.manager.email}
                                                                    </h5>
                                                                    <p className="mt-1 mb-0 text-muted">
                                                                        {note.message}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col">
                                                        <div className="border rounded">
                                                            <form action="#">
                                                        <textarea  value={noteMessage} onChange={e => setNoteMessage(e.target.value)} rows="3" className="form-control border-0 resize-none"
                                                                   placeholder="Váší poznámka...."></textarea>
                                                                <div
                                                                    className="note-button p-2 bg-light d-flex justify-content-between align-items-center">

                                                                    <button onClick={createNote} type="button" className="btn btn-sm btn-success"><i
                                                                        className="mdi mdi-send me-1"></i>Přidat poznámku
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }

                        </div>


                    </div>

                    <Footer></Footer>
                </div>
        </div>
    );
});

export default ContactProfile;