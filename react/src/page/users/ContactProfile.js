/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {
    deleteContract, deleteEdrRequest, deleteFve, deleteSysel,
    fetchUserById, sendEdrRegistrationLink,
    updateToAccepted,
    updateToCurrent, updateToEdr,
    updateToLead,
    updateToPotential, uploadSignedContract
} from "../../http/contactAPI";
import {useHistory, useParams} from "react-router-dom";
import {DASHBOARD_ROUTE, LOGIN_ROUTE} from "../../utils/const";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {edrRegistrate} from "../../http/userAPI";
import {fetchCommunicationByUserId} from "../../http/mailAPI";

const ContactProfile = observer(() => {
    const {user} = useContext(Context)
    const {communication} = useContext(Context)
    const [contact, setContact] = useState({info: []})
    const [selectedContractFile, setSelectedContractFile] = useState(null)
    const [role,setRole] = useState('')
    const [signedContract, setSignedContract] = useState('')
    const [hwsunMonitor, setHwSunMonitor] = useState('')
    const [connectedFVE, setConnectedFVE] = useState('')
    const [syselAgreement, setSyselAgreement] = useState('')
    const [edrRequest, setEdrRequest] = useState('')
    const [selectedHWFile, setSelectedHWFile] = useState(null)
    const [selectedConnectedFveFile, setSelectedConnectedFVE] = useState(null)
    const [selectedSyselAgreementFile, setSelectedSyselAgreementFile] = useState(null)
    const [selectedEdrRequest, setSelectedEdrRequest] = useState(null)
    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
        fetchUserById(id).then(data => {
            setContact(data)
            setSignedContract(data.signedContract)
            setHwSunMonitor(data.hwsunMonitor)
            setConnectedFVE(data.connectedFVE)
            setSyselAgreement(data.syselAgreement)
            setEdrRequest(data.signedRequestToEdr)
            setRole(data.roles[0].name)
        })
        fetchCommunicationByUserId(id).then(data => {
            communication.setContacts(data)
            console.log(data)
        })
    }, [])
    console.log(contact)

    // REQEUST TO EDR

    const generateEdrRequest= async () => {
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

    const fetchEdrRequest = async () => {
        fetch(process.env.REACT_APP_API_URL + "edr_api/edr_request/fetch/" + id, {
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


    // CONTACT ROLES

    const changeToLead = async () => {
        try {
            let response
            response = await updateToLead(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const changeToPotential = async () => {
        try {
            let response
            response = await updateToPotential(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const changeToCurrent = async () => {
        try {
            let response
            response = await updateToCurrent(id)
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const changeToAccepted = async () => {
        try {
            let response
            response = await updateToAccepted(id)
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
            response = await createEdrLink(id)
            history.push(LOGIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }



    return (
        <div>
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
                                            <p className="text-muted">@ {role}</p>

                                            <button type="button"
                                                    className="btn btn-success btn-xs waves-effect mb-2 waves-light">Zavolat
                                            </button>
                                            <button type="button"
                                                    className="btn btn-danger btn-xs waves-effect mb-2 waves-light">Odeslat email
                                            </button>

                                            <div className="text-start mt-3">
                                                <h4 className="font-13 text-uppercase">Role : {role} </h4>

                                                <p className="text-muted mb-2 font-13"><strong>Jméno a přijmení :</strong>
                                                    <span className="ms-2">{contact.name + ' ' + contact.surname}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Telefon :</strong><span
                                                    className="ms-2">{contact.phone}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span
                                                    className="ms-2">{contact.email}</span></p>

                                                <p className="text-muted mb-1 font-13"><strong>Město :</strong> <span
                                                    className="ms-2">{contact.city}</span></p>
                                                <p className="text-muted mb-1 font-13"><strong>Psč :</strong> <span
                                                    className="ms-2">{contact.ico}</span></p>
                                                {
                                                    (role === "LEAD") ?
                                                        <div>
                                                            <p className="text-muted mb-1 font-13"><strong>Vygenerovaná smlouva :</strong> <span
                                                                className="ms-2">{ contact.generatedContract ? 'Ano' : 'Ne'}</span></p>
                                                            <p className="text-muted mb-1 font-13"><strong>Podepsaná smlouva :</strong> <span
                                                                className="ms-2">{ contact.signedContract ? 'Ano' : 'Ne'}</span></p>
                                                        </div>
                                                        : <div></div>
                                                }
                                                {
                                                    (role === "APPLICANT") ?
                                                        <div>
                                                            <p className="text-muted mb-1 font-13"><strong>Vygenerovaná smlouva :</strong> <span
                                                                className="ms-2">{ contact.generatedContract ? 'Ano' : 'Ne'}</span></p>
                                                            <p className="text-muted mb-1 font-13"><strong>Podepsaná smlouva :</strong> <span
                                                                className="ms-2">{ contact.signedContract ? 'Ano' : 'Ne'}</span></p>
                                                            <p className="text-muted mb-1 font-13"><strong>Hardware Sun monitor :</strong> <span
                                                                className="ms-2">{ contact.hwsunMonitor ? 'Ano' : 'Ne'}</span></p>
                                                            <p className="text-muted mb-1 font-13"><strong>Smlouva sysel :</strong> <span
                                                                className="ms-2">{ contact.syselAgreement ? 'Ano' : 'Ne'}</span></p>
                                                            <p className="text-muted mb-1 font-13"><strong>Fve dokument :</strong> <span
                                                                className="ms-2">{ contact.connectedFVE ? 'Ano' : 'Ne'}</span></p>
                                                            <p className="text-muted mb-1 font-13"><strong>Podepsaná přihláška :</strong> <span
                                                                className="ms-2">{ contact.signedRequestToEdr ? 'Ano' : 'Ne'}</span></p>
                                                        </div>
                                                        : <div></div>
                                                }
                                            </div>


                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-8 col-xl-8">
                                    <div className="card">
                                        <div className="card-body">
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
                                            <div className="tab-content">

                                                <div className="tab-pane show active" id="attachments">

                                                    <h5>Přílohy</h5>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            {
                                                                (role === "LEAD") ?
                                                                    <div className="col-md-6">
                                                                        <h3>Supersmlouva</h3>
                                                                        <button onClick={generateSupercontract} type="button" className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                        className="mdi mdi-cloud-outline me-1"></i> Vygenerovat supersmlouvu
                                                                    </button>
                                                                        <button type="button"
                                                                                className="mb-3 btn btn-dark waves-effect waves-light"><i
                                                                            className="mdi mdi-cloud-outline me-1"></i> Zaslat supersmlouvu do mailu
                                                                        </button>
                                                                        <br/><br/>
                                                                        <div className="mb-3">
                                                                        { (!signedContract) ?
                                                                            <div className="mb-3">
                                                                                <label htmlFor="example-fileinput" className="form-label">
                                                                                    Přidat podepsanou smlouvu</label>
                                                                                <input type="file" onChange={e => setSelectedContractFile(e.target.files[0])} id="example-fileinput"
                                                                                       className="form-control"/>
                                                                                <button onClick={saveContract} type="button"
                                                                                        className="mt-3 btn btn-primary waves-effect waves-light">Uložit podepsanou smlouvu
                                                                                </button>
                                                                            </div>
                                                                            :
                                                                            <div>
                                                                                <button onClick={fetchSupercontract} type="button"
                                                                                        className="btn btn-success waves-effect waves-light">Stahnout podepsanou smlouvu
                                                                                </button>
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
                                                                    <div className="col-md-6">
                                                                        <h3>Supersmlouva</h3>
                                                                        <button onClick={generateSupercontract} type="button" className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                            className="mdi mdi-cloud-outline me-1"></i> Vygenerovat supersmlouvu
                                                                        </button>
                                                                        <button type="button"
                                                                                className="mb-3 btn btn-dark waves-effect waves-light"><i
                                                                            className="mdi mdi-cloud-outline me-1"></i> Zaslat supersmlouvu do mailu
                                                                        </button>
                                                                        <br/><br/>
                                                                        <div className="mb-3">
                                                                            { (!signedContract) ?
                                                                                <div className="mb-3">
                                                                                    <label htmlFor="example-fileinput" className="form-label">
                                                                                        Přidat podepsanou smlouvu</label>
                                                                                    <input type="file" onChange={e => setSelectedContractFile(e.target.files[0])} id="example-fileinput"
                                                                                           className="form-control"/>
                                                                                    <button onClick={saveContract} type="button"
                                                                                            className="mt-3 btn btn-primary waves-effect waves-light">Uložit podepsanou smlouvu
                                                                                    </button>
                                                                                </div>
                                                                                :
                                                                                <div>
                                                                                    <button onClick={fetchSupercontract} type="button"
                                                                                            className="btn btn-success waves-effect waves-light">Stahnout podepsanou smlouvu
                                                                                    </button>
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
                                                                (role === "NEW") ?
                                                                    <div className="col-md-6">
                                                                        <h3>Nemáte žádné přílohy</h3>
                                                                    </div>

                                                                    : <div></div>
                                                            }
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="tab-pane" id="edit">
                                                    <div className="row">
                                                        <div className="col-md-12 mb-6">
                                                            <h5 className="mb-4 text-uppercase"><i
                                                                className="mdi mdi-account-circle me-1"></i> Změna stavu</h5>
                                                            {
                                                                (role === "NEW")?
                                                                    <div className="row">
                                                                       <div className="col-md-6">
                                                                           <button onClick={changeToLead} type="button"
                                                                                   className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na Lead

                                                                           </button>
                                                                           <div className="mb-3 form-check">
                                                                               <input type="checkbox" className="form-check-input"
                                                                                      id="customCheck1"/>
                                                                               <label className="form-check-label"
                                                                                      htmlFor="customCheck1">Potvrdit</label>
                                                                           </div>
                                                                       </div>
                                                                        <div className="col-md-6">
                                                                            <button type="button"
                                                                                    className="btn btn-info waves-effect waves-light">Kontrola přechodu
                                                                            </button>
                                                                        </div>
                                                                    </div> : <div></div>
                                                            }
                                                            {
                                                                (role === "OLD")?
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <button onClick={changeToLead} type="button"
                                                                                    className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na Lead

                                                                            </button>
                                                                            <div className="mb-3 form-check">
                                                                                <input type="checkbox" className="form-check-input"
                                                                                       id="customCheck1"/>
                                                                                <label className="form-check-label"
                                                                                       htmlFor="customCheck1">Potvrdit</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <button type="button"
                                                                                    className="btn btn-info waves-effect waves-light">Kontrola přechodu
                                                                            </button>
                                                                        </div>
                                                                    </div> : <div></div>
                                                            }
                                                            {
                                                                (role === "LEAD")?
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <button onClick={changeToPotential} type="button"
                                                                                    className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na Příležitosti

                                                                            </button>
                                                                            <div className="mb-3 form-check">
                                                                                <input type="checkbox" className="form-check-input"
                                                                                       id="customCheck1"/>
                                                                                <label className="form-check-label"
                                                                                       htmlFor="customCheck1">Potvrdit</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <button type="button"
                                                                                    className="btn btn-info waves-effect waves-light">Kontrola přechodu
                                                                            </button>
                                                                        </div>
                                                                    </div> : <div></div>
                                                            }
                                                            {
                                                                (role === "APPLICANT")?
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <button onClick={sendEdrRegistration} type="button"
                                                                                    className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na EDR a odeslat odkaz na registraci v sýstemu

                                                                            </button>
                                                                            <div className="mb-3 form-check">
                                                                                <input type="checkbox" className="form-check-input"
                                                                                       id="customCheck1"/>
                                                                                <label className="form-check-label"
                                                                                       htmlFor="customCheck1">Potvrdit</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <button type="button"
                                                                                    className="btn btn-info waves-effect waves-light">Kontrola přechodu
                                                                            </button>
                                                                        </div>
                                                                    </div> : <div></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <form>
                                                        <h5 className="mb-4 text-uppercase"><i
                                                            className="mdi mdi-account-circle me-1"></i> Osobní informace</h5>
                                                        <div className="row">

                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="firstname" className="form-label">Jméno</label>
                                                                    <input value={contact.name} type="text" className="form-control"
                                                                           id="firstname" placeholder="Enter first name" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="lastname" className="form-label">Příjmení</label>
                                                                    <input value={contact.surname} type="text" className="form-control"
                                                                           id="lastname" placeholder="Enter last name"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="lastname" className="form-label">Telefon</label>
                                                                    <input value={contact.phone} type="number" className="form-control"
                                                                           id="lastname" placeholder="Enter last name"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="lastname" className="form-label">Email</label>
                                                                    <input value={contact.email} type="name" className="form-control"
                                                                           id="lastname" placeholder="Enter last name"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="lastname" className="form-label">Město</label>
                                                                    <input value={contact.city} type="name" className="form-control"
                                                                           id="lastname" placeholder="Enter last name"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="lastname" className="form-label">PSČ</label>
                                                                    <input value={contact.ico} type="name" className="form-control"
                                                                           id="lastname" placeholder="Enter last name"/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="text-end">
                                                            <button type="submit"
                                                                    className="btn btn-success waves-effect waves-light mt-2">
                                                                <i className="mdi mdi-content-save"></i> Save
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row mt-3">

                                <div className="col-xl-8">
                                    <div className="email-communication">
                                        <h4>Komunikace OZ s klientem</h4>
                                        <ul className="conversation-list" data-simplebar="init">
                                            <li className="clearfix">
                                                <div className="chat-avatar">
                                                    <img src="/images/users/user-5.jpg" alt="James Z"
                                                         className="rounded" />
                                                        <i>10:02</i>
                                                </div>
                                                <div className="conversation-text">
                                                    <div className="ctext-wrap">
                                                        <i>James Z</i>
                                                        <p>

                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="conversation-actions dropdown">
                                                    <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                                            aria-expanded="false"><i
                                                        className="mdi mdi-dots-vertical font-16"></i></button>

                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a className="dropdown-item" href="#">Copy Message</a>
                                                        <a className="dropdown-item" href="#">Edit</a>
                                                        <a className="dropdown-item" href="#">Delete</a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="clearfix odd">
                                                <div className="chat-avatar">
                                                    <img src="/images/users/user-1.jpg" alt="Geneva M"
                                                         className="rounded" />
                                                        <i>10:03</i>
                                                </div>
                                                <div className="conversation-text">
                                                    <div className="ctext-wrap">
                                                        <i>Geneva M</i>
                                                        <p>

                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="conversation-actions dropdown">
                                                    <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                                            aria-expanded="false"><i
                                                        className="mdi mdi-dots-vertical font-16"></i></button>

                                                    <div className="dropdown-menu">
                                                        <a className="dropdown-item" href="#">Copy Message</a>
                                                        <a className="dropdown-item" href="#">Edit</a>
                                                        <a className="dropdown-item" href="#">Delete</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>

                                        <div className="row">
                                            <div className="col">
                                                <div className="mt-2 bg-light p-3 rounded">
                                                    <form className="needs-validation" noValidate="" name="chat-form"
                                                          id="chat-form">
                                                        <div className="row">
                                                            <div className="col mb-2 mb-sm-0">
                                                                <input type="text" className="form-control border-0"
                                                                       placeholder="Enter your text" required="" />
                                                                    <div className="invalid-feedback">
                                                                        Please enter your messsage
                                                                    </div>
                                                            </div>
                                                            <div className="col-sm-auto">
                                                                <div className="btn-group">
                                                                    <a href="#" className="btn btn-light"><i
                                                                        className="fe-paperclip"></i></a>
                                                                    <button type="submit"
                                                                            className="btn btn-success chat-send w-100">
                                                                        <i className="fe-send"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="notes">
                                        <div className="row mt-3">
                                            <div className="col">
                                                <h5 className="mb-2 font-size-16">Poznamky backoffice</h5>

                                                <div className="d-flex align-items-start mt-3 p-1">
                                                    <img src="/images/users/user-9.jpg"
                                                         className="me-2 rounded-circle" alt="Arya Stark" height="36"/>
                                                        <div className="w-100">
                                                            <h5 className="mt-0 mb-0 font-size-14">
                                                                <span
                                                                    className="float-end text-muted font-12">4:30am</span>
                                                                Arya Stark
                                                            </h5>
                                                            <p className="mt-1 mb-0 text-muted">
                                                                Should I review the last 3 years legal documents as
                                                                well?
                                                            </p>
                                                        </div>
                                                </div>


                                                    <div className="d-flex align-items-start mt-2 p-1">
                                                        <img src="/images/users/user-5.jpg"
                                                             className="me-2 rounded-circle" alt="Dominc B" height="36" />
                                                            <div className="w-100">
                                                                <h5 className="mt-0 mb-0 font-size-14">
                                                                    <span
                                                                        className="float-end text-muted font-12">3:30am</span>
                                                                    Gary Somya
                                                                </h5>
                                                                <p className="mt-1 mb-0 text-muted">
                                                                    @Arya FYI..I have created some general guidelines
                                                                    last year.
                                                                </p>
                                                            </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                <div className="border rounded">
                                                    <form action="#">
                                                        <textarea rows="3" className="form-control border-0 resize-none"
                                                                  placeholder="Váší poznámka...."></textarea>
                                                        <div
                                                            className="p-2 bg-light d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <a href="#"
                                                                   className="btn btn-sm px-2 font-16 btn-light"><i
                                                                    className="mdi mdi-cloud-upload-outline"></i></a>
                                                                <a href="#"
                                                                   className="btn btn-sm px-2 font-16 btn-light"><i
                                                                    className="mdi mdi-at"></i></a>
                                                            </div>
                                                            <button type="submit" className="btn btn-sm btn-success"><i
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

                        </div>


                    </div>

                    <footer className="footer">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6">
                                    <script>document.write(new Date().getFullYear())</script>
                                    &copy; UBold theme by <a href="">Coderthemes</a>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-md-end footer-links d-none d-sm-block">
                                        <a href="javascript:void(0);">About Us</a>
                                        <a href="javascript:void(0);">Help</a>
                                        <a href="javascript:void(0);">Contact Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
        </div>
    );
});

export default ContactProfile;