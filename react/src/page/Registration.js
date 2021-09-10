import React from 'react';
import AcceptedTable from "../component/AcceptedTable";
import {useHistory, useLocation} from "react-router-dom";
import {
    ADMIN_ROUTE,
    REGISTRATION_ADMIN_ROUTE,
    REGISTRATION_CONTACT_ROUTE, REGISTRATION_MANAGER_ROUTE,
    REGISTRATION_REFERAL_ROUTE,
    REGISTRATION_SALESMAN_ROUTE
} from "../utils/const";
import {createAdmin, updateToEdr} from "../http/contactAPI";

const Registration = () => {
    const history = useHistory()
    const location = useLocation()
    const path = location.pathname

    const registrateAdmin = async () => {
        try {
            let response
            response = await createAdmin(name, phone, surname, email, username, password)
            history.push(ADMIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            { path === REGISTRATION_CONTACT_ROUTE ?
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
                                        <h4 className="page-title">Vytvořit klienta</h4>
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

                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="salesmanInput" className="form-label">Obchodní zástupce</label>
                                                        <select id="salesmanInput" className="form-select">
                                                            <option>Obchodní zástupce 1</option>
                                                            <option>Obchodní zástupce 2</option>
                                                            <option>Obchodní zástupce 3</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="example-readonly"
                                                               className="form-label">Stav</label>
                                                        <input type="text" id="example-readonly" className="form-control"
                                                               readOnly="" value="Nový kontakt" />
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

                                                <button type="submit"
                                                        className="btn btn-primary waves-effect waves-light">Vytvořit
                                                </button>

                                            </form>
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
                                    &copy; Design by <a href="">Karlin It Group</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>

                : ""}
            { path === REGISTRATION_SALESMAN_ROUTE ?
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
                                                <li className="breadcrumb-item active">Založit obchodního zástupce </li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Založit obchodního zástupce</h4>
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
                                                        <label htmlFor="areaInput" className="form-label">Kraj</label>
                                                        <input type="text" className="form-control" id="areaInput"
                                                               placeholder="Kraj" />
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="example-readonly"
                                                               className="form-label">Stav</label>
                                                        <input type="text" id="example-readonly" className="form-control"
                                                               readOnly="" value="Obchodní zástupce" />
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="b2bInput" className="form-label">FO/PO</label>
                                                        <select id="b2bInput" className="form-select">
                                                            <option>Fyzická osoba</option>
                                                            <option>Podnikající osoba</option>
                                                        </select>
                                                    </div>

                                                    <div className="row">
                                                        <div className="mb-3 col-md-6">
                                                            <label htmlFor="usernameInput" className="form-label">Username <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="usernameInput" required/>
                                                        </div>
                                                        <div className="mb-3 col-md-6">
                                                            <label htmlFor="icoInput" className="form-label">Password <span className="text-danger">*</span></label>
                                                            <input type="password" className="form-control" id="icoInput" required/>
                                                        </div>
                                                    </div>

                                                </div>
                                                <button type="submit"
                                                        className="btn btn-primary waves-effect waves-light">Vytvořit
                                                </button>

                                            </form>
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
                                    &copy; Design by <a href="">Karlin It Group</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>

                : ""}
            { path === REGISTRATION_ADMIN_ROUTE ?
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
                                                <li className="breadcrumb-item active">Vytvořit admina</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Vytvořit admina</h4>
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
                                                        <label htmlFor="example-readonly"
                                                               className="form-label">Stav</label>
                                                        <input type="text" id="example-readonly" className="form-control"
                                                               readOnly="" value="Admin" />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="usernameInput" className="form-label">Username <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control" id="usernameInput" required/>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="icoInput" className="form-label">Password <span className="text-danger">*</span></label>
                                                        <input type="password" className="form-control" id="icoInput" required/>
                                                    </div>
                                                </div>

                                                <button type="submit"
                                                        className="btn btn-primary waves-effect waves-light">Vytvořit
                                                </button>

                                            </form>
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
                                    &copy; Design by <a href="">Karlin It Group</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>

                : ""}
            { path === REGISTRATION_MANAGER_ROUTE ?
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
                                                <li className="breadcrumb-item active">Vytvořit manažera</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Vytvořit manažera</h4>
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
                                                        <label htmlFor="example-readonly"
                                                               className="form-label">Stav</label>
                                                        <input type="text" id="example-readonly" className="form-control"
                                                               readOnly="" value="Manažer" />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="usernameInput" className="form-label">Username <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control" id="usernameInput" required/>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="icoInput" className="form-label">Password <span className="text-danger">*</span></label>
                                                        <input type="password" className="form-control" id="icoInput" required/>
                                                    </div>
                                                </div>

                                                <button type="submit"
                                                        className="btn btn-primary waves-effect waves-light">Vytvořit
                                                </button>

                                            </form>
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
                                    &copy; Design by <a href="">Karlin It Group</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>

                : ""}
        </div>


    );
};

export default Registration;