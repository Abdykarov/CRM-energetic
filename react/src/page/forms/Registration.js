import React, {useState} from 'react';
import AcceptedTable from "../../component/tables/AcceptedTable";
import {useHistory, useLocation} from "react-router-dom";
import {
    ADMIN_ROUTE, DASHBOARD_ROUTE, MANAGER_ROUTE,
    REGISTRATION_ADMIN_ROUTE,
    REGISTRATION_CONTACT_ROUTE, REGISTRATION_MANAGER_ROUTE,
    REGISTRATION_REFERAL_ROUTE,
    REGISTRATION_SALESMAN_ROUTE, SALESMAN_ROUTE
} from "../../utils/const";
import {login} from "../../http/userAPI";
import {createAdmin, createContact, createManager, createSalesman} from "../../http/contactAPI";
import {area} from "../../../public/libs/d3/d3.min";

const Registration = () => {
    const history = useHistory()
    const location = useLocation()
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [ico, setIco] = useState('')
    const [area, setArea] = useState(null)
    const [b2b, setB2b] = useState('Fyzická osoba')
    const [company, setCompany] = useState(null)
    const [city, setCity] = useState(null)
    const [position, setPosition] = useState(null)
    const [salesmanId, setSalesmanId] = useState(null)

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

    const registrateManager = async () => {
        try {
            let response
            response = await createManager(name, phone, surname, email, username, password)
            history.push(MANAGER_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    const registrateSalesman = async () => {
        try {
            let response
            response = await createSalesman(name, phone, surname, email, username, password, ico, b2b)
            history.push(SALESMAN_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const registrateContact = async () => {
        try {
            let response
            response = await createContact(name, phone, surname, email, username, password, ico, b2b,  salesmanId, company, city, position)
            history.push(SALESMAN_ROUTE);
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
                                                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="nameInput"
                                                               placeholder="Jméno" required/>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="surnameInput" className="form-label">Přijmení <span className="text-danger">*</span></label>
                                                        <input value={surname} onChange={e => setSurname(e.target.value)} type="text" className="form-control" id="surnameInput"
                                                               placeholder="Přijmení" required/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="phoneInput" className="form-label">Telefon <span className="text-danger">*</span></label>
                                                        <input value={phone} onChange={e => setPhone(e.target.value)} type="number" className="form-control" id="phoneInput"
                                                               placeholder="+420 123 123 123" required/>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="emailInput" className="form-label">Email <span className="text-danger">*</span></label>
                                                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="emailInput"
                                                               placeholder="Email" required />
                                                    </div>

                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="salesmanInput" className="form-label">Obchodní zástupce</label>
                                                        <select value={salesmanId} onChange={e => setSalesmanId(e.target.value)} id="salesmanInput" className="form-select">
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
                                                        <input value={company} onChange={e => setCompany(e.target.value)} type="text" className="form-control" id="companyInput"
                                                               placeholder="Název společnosti" />
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="jobInput" className="form-label">Pracovní pozice</label>
                                                        <input value={position} onChange={e => setPosition(e.target.value)} type="text" className="form-control" id="jobInput"
                                                               placeholder="Pracovní pozice" />
                                                    </div>


                                                </div>
                                                <div className="row">
                                                    <div className="mb-3 col-md-8">
                                                        <label htmlFor="cityInput" className="form-label">Město</label>
                                                        <input value={city} onChange={e => setCity(e.target.value)} type="text" className="form-control" id="cityInput"/>
                                                    </div>
                                                    <div className="mb-3 col-md-4">
                                                        <label htmlFor="icoInput" className="form-label">Psč <span className="text-danger">*</span></label>
                                                        <input value={ico} onChange={e => setIco(e.target.value)} type="number" className="form-control" id="icoInput" required/>
                                                    </div>
                                                </div>

                                                <button onClick={registrateContact} type="button"
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
                                                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="nameInput"
                                                               placeholder="Jméno" required/>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="surnameInput" className="form-label">Přijmení <span className="text-danger">*</span></label>
                                                        <input value={surname} onChange={e => setSurname(e.target.value)} type="text" className="form-control" id="surnameInput"
                                                               placeholder="Přijmení" required/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="phoneInput" className="form-label">Telefon <span className="text-danger">*</span></label>
                                                        <input value={phone} onChange={e => setPhone(e.target.value)} type="number" className="form-control" id="phoneInput"
                                                               placeholder="+420 123 123 123" required/>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="emailInput" className="form-label">Email <span className="text-danger">*</span></label>
                                                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="emailInput"
                                                               placeholder="Email" required />
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="areaInput" className="form-label">Kraj</label>
                                                        <input value={area} onChange={e => setArea(e.target.value)} type="text" className="form-control" id="areaInput"
                                                               placeholder="Kraj" />
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="icoInput" className="form-label">Psč <span className="text-danger">*</span></label>
                                                        <input value={ico} onChange={e => setIco(e.target.value)} type="number" className="form-control" id="icoInput" required/>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="example-readonly"
                                                               className="form-label">Stav</label>
                                                        <input type="text" id="example-readonly" className="form-control"
                                                               readOnly="" value="Obchodní zástupce" />
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="b2bInput" className="form-label">FO/PO</label>
                                                        <select value={b2b} onChange={e => setB2b(e.target.value)} id="b2bInput" className="form-select">
                                                            <option value="Fyzická osoba">Fyzická osoba</option>
                                                            <option value="Podnikající osoba">Podnikající osoba</option>
                                                        </select>
                                                    </div>

                                                    <div className="row">
                                                        <div className="mb-3 col-md-6">
                                                            <label htmlFor="usernameInput" className="form-label">Username <span className="text-danger">*</span></label>
                                                            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="usernameInput" required/>
                                                        </div>
                                                        <div className="mb-3 col-md-6">
                                                            <label htmlFor="icoInput" className="form-label">Password <span className="text-danger">*</span></label>
                                                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="icoInput" required/>
                                                        </div>
                                                    </div>

                                                </div>
                                                <button onClick={registrateSalesman} type="button"
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
                                                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="nameInput"
                                                               placeholder="Jméno" required/>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="surnameInput" className="form-label">Přijmení <span className="text-danger">*</span></label>
                                                        <input value={surname} onChange={e => setSurname(e.target.value)} type="text" className="form-control" id="surnameInput"
                                                               placeholder="Přijmení" required/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="phoneInput" className="form-label">Telefon <span className="text-danger">*</span></label>
                                                        <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="form-control" id="phoneInput"
                                                               placeholder="+420 123 123 123" required/>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="emailInput" className="form-label">Email <span className="text-danger">*</span></label>
                                                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="emailInput"
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
                                                        <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="usernameInput" required/>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="icoInput" className="form-label">Password <span className="text-danger">*</span></label>
                                                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="icoInput" required/>
                                                    </div>
                                                </div>

                                                <button onClick={registrateAdmin} type="button"
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
                                                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="nameInput"
                                                               placeholder="Jméno" required/>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="surnameInput" className="form-label">Přijmení <span className="text-danger">*</span></label>
                                                        <input value={surname} onChange={e => setSurname(e.target.value)} type="text" className="form-control" id="surnameInput"
                                                               placeholder="Přijmení" required/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="phoneInput" className="form-label">Telefon <span className="text-danger">*</span></label>
                                                        <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="form-control" id="phoneInput"
                                                               placeholder="+420 123 123 123" required/>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="emailInput" className="form-label">Email <span className="text-danger">*</span></label>
                                                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="emailInput"
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
                                                        <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="usernameInput" required/>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="icoInput" className="form-label">Password <span className="text-danger">*</span></label>
                                                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="icoInput" required/>
                                                    </div>
                                                </div>

                                                <button onClick={registrateManager} type="button"
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