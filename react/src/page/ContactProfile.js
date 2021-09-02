/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {
    fetchContacts,
    fetchUserById,
    updateToAccepted,
    updateToCurrent, updateToEdr,
    updateToLead,
    updateToPotential
} from "../http/contactAPI";
import {useHistory, useParams} from "react-router-dom";
import {DASHBOARD_ROUTE} from "../utils/const";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const ContactProfile = observer(() => {
    const {user} = useContext(Context)
    const [contact, setContact] = useState({info: []})
    const [role,setRole] = useState('')
    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
        fetchUserById(id).then(data => {
            setContact(data)

            setRole(data.roles[0].name)
        })
    }, [])

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
                                                <p className="text-muted mb-1 font-13"><strong>Odeslaná smlouva :</strong> <span
                                                    className="ms-2">Ne</span></p>
                                                <p className="text-muted mb-1 font-13"><strong>Podepsaná smlouva :</strong> <span
                                                    className="ms-2">Ne</span></p>
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
                                                                        <h3>Supersmlouva</h3> <button type="button"
                                                                                                      className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                        className="mdi mdi-cloud-outline me-1"></i> Vygenerovat supersmlouvu
                                                                    </button>
                                                                        <button type="button"
                                                                                className="mb-3 btn btn-dark waves-effect waves-light"><i
                                                                            className="mdi mdi-cloud-outline me-1"></i> Zaslat supersmlouvu do mailu
                                                                        </button>
                                                                        <br/><br/>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="example-fileinput" className="form-label">
                                                                                Uložit podepsanou smlouvu</label>
                                                                            <input type="file" id="example-fileinput"
                                                                                   className="form-control"/>
                                                                        </div>
                                                                        <button type="submit"
                                                                                className="btn btn-primary waves-effect waves-light">Stahnout podepsanou smlouvu
                                                                        </button>
                                                                    </div>
                                                                    : <div></div>
                                                            }

                                                            {
                                                                (role === "POTENTIAL") ?
                                                                    <div>
                                                                        <h3 className="mb-3">Hardware Sun monitor</h3>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="example-fileinput" className="form-label">
                                                                                Uložit dokument o hw sun monitor</label>
                                                                            <input type="file" id="example-fileinput"
                                                                                   className="form-control"/>
                                                                        </div>
                                                                        <button type="submit"
                                                                                className="mb-6 btn btn-primary waves-effect waves-light">Stahnout dokument o hw sun monitor
                                                                        </button>


                                                                        <h3 className="mt-3 mb-3">Smlouva sysel</h3>
                                                                        <p>Platnost od: </p>
                                                                        <p>Platnost do: </p>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="example-fileinput" className="form-label">
                                                                                Uložit smlouvu sysel</label>
                                                                            <input type="file" id="example-fileinput"
                                                                                   className="form-control"/>
                                                                        </div>
                                                                        <button type="submit"
                                                                                className="mb-3 mr-3 btn btn-primary waves-effect waves-light">Stahnout smlouvu sysel
                                                                        </button>

                                                                        <button type="submit"
                                                                                className="mb-3 btn btn-primary waves-effect waves-light">Zkontrolovat platnost smlouvy sysel
                                                                        </button>


                                                                        <h3>Zapojení FVE Solid Sun</h3>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="example-fileinput" className="form-label">
                                                                                Uložit dokument o zapojení FVE Solid Sun</label>
                                                                            <input type="file" id="example-fileinput"
                                                                                   className="form-control"/>
                                                                        </div>
                                                                        <button type="submit"
                                                                                className="mb-3 btn btn-primary waves-effect waves-light">Stahnout dokument o zapojení FVE Solid Sun
                                                                        </button>

                                                                    </div>
                                                                    : <div></div>
                                                            }

                                                            {
                                                                (role === "CURRENT") ?
                                                                    <div className="col-md-6">
                                                                        <h3>Přihláška</h3> <button type="button"
                                                                                                      className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                        className="mdi mdi-cloud-outline me-1"></i> Vygenerovat přihlášku
                                                                    </button>
                                                                        <button type="button"
                                                                                className="mb-3 btn btn-dark waves-effect waves-light"><i
                                                                            className="mdi mdi-cloud-outline me-1"></i> Zaslat přihlášku do mailu
                                                                        </button>
                                                                        <br/><br/>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="example-fileinput" className="form-label">
                                                                                Uložit podepsanou přihlášku</label>
                                                                            <input type="file" id="example-fileinput"
                                                                                   className="form-control"/>
                                                                        </div>
                                                                        <button type="submit"
                                                                                className="mb-3 btn btn-primary waves-effect waves-light">Stahnout podepsanou přihlášku
                                                                        </button>
                                                                        <h3>Faktura</h3> <button type="button"
                                                                                                   className="mb-3 mt-2 btn btn-info waves-effect waves-light"><i
                                                                        className="mdi mdi-cloud-outline me-1"></i> Vygenerovat fakturu
                                                                    </button>
                                                                        <button type="button"
                                                                                className="mb-3 btn btn-dark waves-effect waves-light"><i
                                                                            className="mdi mdi-cloud-outline me-1"></i> Zaslat fakturu do mailu
                                                                        </button>
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
                                                                (role === "POTENTIAL")?
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <button onClick={changeToCurrent} type="button"
                                                                                    className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na Stavající klient

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
                                                                (role === "CURRENT")?
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <button onClick={changeToAccepted} type="button"
                                                                                    className="mb-3 btn btn-primary waves-effect waves-light">Změnit stav na Přihlášený klient

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
                                                                (role === "ACCEPTED")?
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <button onClick={changeToEdr} type="button"
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