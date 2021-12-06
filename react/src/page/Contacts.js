/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {
    exportContacts,
    exportJson,
    fetchContacts,
    fetchSalesmanContacts,
    getFilteredContacts
} from "../http/contactAPI";
import ContactItem from "../component/items/ContactItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ContactTable from "../component/tables/ContactTable";
import Footer from "../component/Footer";
import {CONTACT_PROFILE_ROUTE} from "../utils/const";
import HeaderItem from "../component/items/HeaderItem";
import {getFilteredFactures} from "../http/factureAPI";
import axios from "axios";

const Contacts = observer(() => {
    const user = useContext(Context)
    const {contact} = useContext(Context)
    const [contactName,setContactName] = useState('')
    const [contactSurname,setContactSurname] = useState('')
    const [contactsSize,setContactsSize] = useState(15)
    const [pageNumber,setPageNumber] = useState(0)
    const [contactState,setContactState] = useState('ALL')
    const [filterType,setFilterType] = useState('byId')

    const changeSize = async(size) => {
        setContactsSize(size);
        try {
            let response
            response = await getFilteredContacts(contactName, contactSurname, contactState ,filterType, size, pageNumber)
            contact.setContacts(response.users)
            contact.setTotalCount(response.totalItems)
            contact.setPage(response.currentPage)
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    const changePage = async(pageNum) => {
        console.log(pageNum)
        setPageNumber(pageNum);
        try {
            let response
            response = await getFilteredContacts(contactName, contactSurname, contactState ,filterType, contactsSize, pageNum)
            contact.setContacts(response.users)
            contact.setTotalCount(response.totalItems)
            contact.setPage(response.currentPage)
            contact.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const searchByName = async(userName) => {
        setContactName(userName);
        try {
            let response
            response = await getFilteredContacts(userName, contactSurname, contactState, filterType, contactsSize, pageNumber)
            contact.setContacts(response.users)
            contact.setTotalCount(response.totalItems)
            contact.setPage(response.currentPage)
            contact.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const searchBySurname = async(userSurname) => {
        setContactSurname(userSurname);
        try {
            let response
            response = await getFilteredContacts(contactName, userSurname, contactState, filterType, contactsSize, pageNumber)
            contact.setContacts(response.users)
            contact.setTotalCount(response.totalItems)
            contact.setPage(response.currentPage)
            contact.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const searchByState = async(state) => {
        setContactState(state);
        try {
            let response
            response = await getFilteredContacts(contactName, contactSurname, state, filterType, contactsSize, pageNumber)
            console.log(response)
            contact.setContacts(response.users)
            contact.setTotalCount(response.totalItems)
            contact.setPage(response.currentPage)
            contact.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const searchByType = async(type) => {
        setFilterType(type);
        try {
            let response
            response = await getFilteredContacts(contactName, contactSurname, contactState, type, contactsSize, pageNumber)
            console.log(response)
            contact.setContacts(response.users)
            contact.setTotalCount(response.totalItems)
            contact.setPage(response.currentPage)
            contact.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        if(!user) return;
        user.role ==="ROLE_SALESMAN" ?
            fetchSalesmanContacts(user.id).then(data => {
                contact.setContacts(data)
                console.log(data)
            })
            :
            fetchContacts().then(data => {
                contact.setContacts(data)
                console.log(data)
            })

    }, [user])

    const importUsers = async () => {
        let file = document.getElementById("import-file").files[0];
        console.log(file);
        if (!(file == null)){

            let formData = new FormData();
            formData.append('file', file);
            axios.post(
                process.env.REACT_APP_API_URL + "api/v1/contacts/import/csv",
                formData,
                {
                    headers: {
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

    const exportUsers = async () => {
        try {
            let response
            response = await exportContacts()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <HeaderItem title="Kontakty"></HeaderItem>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-4">
                                                <a href="/registration/contact" className="btn btn-danger waves-effect waves-light"><i
                                                    className="mdi mdi-plus-circle me-1"></i> Vytvořit kontakt
                                                </a>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="text-sm-end mt-2 mt-sm-0">
                                                        <input type="file" id="import-file" onChange={importUsers} hidden/>

                                                        <label className="btn btn-light mb-2 me-1" for="import-file">Import</label>

                                                    <a href="http://localhost:8080/api/v1/contacts/export/csv" className="btn btn-light mb-2">Export</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-sm-3">
                                                <label htmlFor="inputPassword2">Vyhledat podle jména</label>
                                                <div className="me-3 mt-2">
                                                    <input value={contactName} onChange={e => searchByName(e.target.value)} type="text" className="form-control my-1 my-md-0"
                                                           id="inputPassword1" placeholder="Vyhledat..."/>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="inputPassword2">Vyhledat podle příjmení</label>
                                                <div className="me-3 mt-2">
                                                    <input value={contactSurname} onChange={e => searchBySurname(e.target.value)}  type="text" className="form-control my-1 my-md-0"
                                                           id="inputPassword2" placeholder="Vyhledat..."/>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="status-select" className="me-2">Stav kontaktu</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={contactState} onChange={e => searchByState(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="ALL">Všichni</option>
                                                        <option value="NEW">Nový</option>
                                                        <option value="LOST">Ztracený</option>
                                                        <option value="DEFERRED">Odložený</option>
                                                        <option value="EDR_CANCELLED">Zrušený člen edr</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="status-select" className="me-2">Filtrovat podle</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={filterType} onChange={e => searchByType(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="byId">Není</option>
                                                        <option value="byName">Jméno</option>
                                                        <option value="bySurname">Příjmení</option>
                                                        <option value="byMale">Pohlaví</option>
                                                        <option value="byEmail">Email</option>
                                                        <option value="byArea">Kraj</option>
                                                        <option value="bySalesman">Obchodní zástupce</option>
                                                        <option value="byConcurrentFve">Konkurentní FVE</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="table table-centered table-nowrap table-striped"
                                                   id="products-datatable">
                                                <thead>
                                                <tr>
                                                    <th style={{width : '20px'}}>
                                                        <div className="form-check">
                                                            <input type="checkbox" className="form-check-input"
                                                                   id="customCheck1" />
                                                            <label className="form-check-label"
                                                                   htmlFor="customCheck1">&nbsp;</label>
                                                        </div>
                                                    </th>
                                                    <th style={{width: '85px'}}>Osobní stránka</th>
                                                    <th>Kontakt</th>
                                                    <th>Jméno</th>
                                                    <th>Příjmení</th>
                                                    <th>Pohlaví</th>
                                                    <th>Telefon</th>
                                                    <th>Email</th>
                                                    <th>Stav</th>
                                                    <th>Kraj</th>
                                                    <th>PSČ</th>
                                                    <th>Kontaktní osoba</th>
                                                    <th>Obchodní zástupce</th>
                                                    <th>Kampaň</th>
                                                    <th>Konkurentní FVE</th>
                                                </tr>
                                                </thead>
                                                <ContactTable></ContactTable>
                                            </table>
                                        </div>
                                        <select value={contactsSize} onChange={e => changeSize(e.target.value)}>
                                            <option value="15">15</option>
                                            <option value="35">35</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="250">250</option>
                                        </select>
                                        <ul className="pagination pagination-rounded justify-content-end mb-0">
                                            {
                                                Array.from(Array(contact.totalPages), (e, i) => {
                                                return <li className="page-item" key={i}><button className="page-link" onClick={() => changePage(i)}>{i}</button></li>
                                            })
                                            }
                                        </ul>
                                        {contact.totalItems}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <Footer></Footer>
            </div>
        </div>
    );
});

export default Contacts;