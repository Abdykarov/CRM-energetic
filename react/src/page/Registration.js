import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {
    ADMIN_ROUTE, CONTACTS_ROUTE, DASHBOARD_ROUTE, MANAGER_ROUTE,
    REGISTRATION_ADMIN_ROUTE,
    REGISTRATION_CONTACT_ROUTE, REGISTRATION_MANAGER_ROUTE,
    REGISTRATION_REFERAL_ROUTE,
    REGISTRATION_SALESMAN_ROUTE, SALESMAN_ROUTE
} from "../utils/const";
import {createAdmin, createContact, createManager, createSalesman, fetchSalesmans} from "../http/contactAPI";
import {Context} from "../index";
import ManagerItem from "../component/items/ManagerItem";
import {observer} from "mobx-react-lite";
import {fetchAreas} from "../http/areaAPI";

const Registration = observer(() => {
    const history = useHistory()
    const location = useLocation()
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [concurrentFveName,setConcurrentFveName] = useState('')
    const [concurrentFveDueDate,setConcurrentFveDueDate] = useState(null)
    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)
    const [ico, setIco] = useState('')
    const [city, setCity] = useState(null)
    const [areaId, setAreaId] = useState(null)
    const [salesmanId, setSalesmanId] = useState(null)
    const [gender, setGender] = useState('Male')
    const [concurrentFveInstalled, setConcurrentFveInstalled] = useState(false)
    const path = location.pathname
    const {salesman} = useContext(Context)
    const {area} = useContext(Context)

    if(path === REGISTRATION_CONTACT_ROUTE){
        useEffect(() => {
            fetchSalesmans().then(data => {
                salesman.setContacts(data)
                setSalesmanId(data[0].id)
            })
            fetchAreas().then(data => {
                area.setAreas(data)
                setAreaId(data[0].id)
            })
        }, [])
    }
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
            response = await createSalesman(name, phone, surname, email, username, password, ico)
            history.push(SALESMAN_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const registrateContact = async () => {
        try {
            let male
            let response
            if(gender === "Male"){
                male = true
            }else{
                male = false
            }
            response = await createContact(name, phone, surname, email, ico, salesmanId, areaId, concurrentFveInstalled, concurrentFveName, concurrentFveDueDate)
            history.push(CONTACTS_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const setInstalled = async () => {
        if(concurrentFveInstalled === false) {
            setConcurrentFveInstalled(true)
            var elements = document.getElementsByClassName("fve_block");
            elements[0].classList.remove('hidden_style');
        }else{
            setConcurrentFveInstalled(false)
            var elements = document.getElementsByClassName("fve_block");
            elements[0].classList.add('hidden_style');
            setConcurrentFveDueDate(null)
            setConcurrentFveName('')
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
                                                        <label htmlFor="salesmanInput" className="form-label">Pohlaví</label>
                                                        <select value={gender} onChange={e => setGender(e.target.value)} id="salesmanInput" className="form-select">
                                                            <option value="Male">Muž</option>
                                                            <option value="Female">Žena</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="salesmanInput" className="form-label">Kraj</label>
                                                        <select value={areaId} onChange={e => setAreaId(e.target.value)} id="salesmanInput" className="form-select">
                                                            {area.areas.map(item =>
                                                                <option value={item.id}>{item.name}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label htmlFor="salesmanInput" className="form-label">Obchodní zástupce</label>
                                                        <select value={salesmanId} onChange={e => setSalesmanId(e.target.value)} id="salesmanInput" className="form-select">
                                                            {salesman.contacts.map(contact =>
                                                                <option value={contact.id}>{contact.name} {contact.surname}</option>
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="example-readonly"
                                                               className="form-label">Stav</label>
                                                        <input type="text" id="example-readonly" className="form-control"
                                                               readOnly="" value="Nový kontakt" />
                                                    </div>


                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="icoInput" className="form-label">Psč <span className="text-danger">*</span></label>
                                                    <input value={ico} onChange={e => setIco(e.target.value)} type="number" className="form-control" id="icoInput" required/>
                                                </div>

                                                <div className="mb-3 col-md-6">
                                                    <div className="form-check form-switch">
                                                        <input onClick={setInstalled} type="checkbox" className="form-check-input"
                                                               id="customSwitch1"/>
                                                        <label className="form-check-label" htmlFor="customSwitch1">Konkurentní FVE</label>
                                                    </div>
                                                </div>

                                                <div className="row fve_block hidden_style mb-3">
                                                    <div className="col-md-6 mb-6">
                                                        <label htmlFor="surnameInput" className="form-label">Název konkurentní FVE <span className="text-danger">*</span></label>
                                                        <input value={concurrentFveName} onChange={e => setConcurrentFveName(e.target.value)} type="text" className="form-control" id="surnameInput"
                                                               placeholder="Název konkurentní FVE" required/>
                                                    </div>
                                                    <div className="col-md-6 mb-6">
                                                            <label htmlFor="surnameInput" className="form-label">Datum vypršení záruky<span className="text-danger">*</span></label>
                                                            <input value={concurrentFveDueDate} onChange={e => setConcurrentFveDueDate(e.target.value)} type="date" className="form-control" id="startDate"
                                                               placeholder="Datum vypršení záruky"/>

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
                                                        <select value={areaId} onChange={e => setAreaId(e.target.value)} id="salesmanInput" className="form-select">
                                                            {area.areas.map(item =>
                                                                <option value={item.id}>{item.name}</option>
                                                            )}
                                                        </select>
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
});

export default Registration;