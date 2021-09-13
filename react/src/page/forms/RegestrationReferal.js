import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {edrRegistrate} from "../../http/userAPI";
import {LOGIN_ROUTE, MANAGER_ROUTE} from "../../utils/const";
import {createManager, createReferalContact} from "../../http/contactAPI";

const RegestrationReferal = observer(() => {
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [ico, setIco] = useState('')
    const [companyName, setCompanyName] = useState(null)
    const [city, setCity] = useState(null)
    const [jobPosition, setJobPosition] = useState(null)
    const history = useHistory()
    const {referalLink} = useParams()
    const referealCreate = async () => {

        try {
            let response
            response = await createReferalContact(name, surname, phone, email, jobPosition, ico, companyName, city)
            history.push(LOGIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <div className="referal_registration">
            <header>
                <div className="navbar-custom">
                    <div className="container-fluid">

                        <div className="logo-box">
                            <a href="index.html" className="logo logo-dark text-center">
                <span className="logo-sm">
                    <img src="/images/logo-sm.png" alt="" height="22"/>

                </span>
                                <span className="logo-lg">
                    <img src="/images/logo-dark.png" alt="" height="20"/>
                </span>
                            </a>

                            <a href="/" className="logo logo-light text-center">
                <span className="logo-sm">
                    <img src="/images/logo-sm.png" alt="" height="22"/>
                </span>
                                <span className="logo-lg">
                    <img src="/images/logoEDR.png" alt="" width={200}/>
                </span>
                            </a>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>

            </header>
            <div>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="#">UBold</a></li>
                                            <li className="breadcrumb-item"><a href="#">CRM</a></li>
                                            <li className="breadcrumb-item active">Vytvořit klienta</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Kontaktní formulář</h4>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="nameInput" className="form-label">Jméno <span
                                                        className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="nameInput"
                                                           placeholder="Jméno" required/>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="surnameInput" className="form-label">Přijmení <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="surnameInput"
                                                           placeholder="Přijmení" required/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="phoneInput" className="form-label">Telefon <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="phoneInput"
                                                           placeholder="+420 123 123 123" required/>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="emailInput" className="form-label">Email <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="emailInput"
                                                           placeholder="Email" required />
                                                </div>


                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="companyInput" className="form-label">Název společnosti</label>
                                                    <input type="text" className="form-control" id="companyInput"
                                                           placeholder="Název společnosti" />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="jobInput" className="form-label">Pracovní pozice</label>
                                                    <input type="text" className="form-control" id="jobInput"
                                                           placeholder="Pracovní pozice" />
                                                </div>


                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-8">
                                                    <label htmlFor="cityInput" className="form-label">Město</label>
                                                    <input type="text" className="form-control" id="cityInput"/>
                                                </div>
                                                <div className="mb-3 col-md-4">
                                                    <label htmlFor="icoInput" className="form-label">Psč <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="icoInput" required/>
                                                </div>
                                            </div>

                                            <button onClick={referealCreate} type="button"
                                                    className="btn btn-primary waves-effect waves-light">Vytvořit
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            </div>
        </div>
    );
});

export default RegestrationReferal;