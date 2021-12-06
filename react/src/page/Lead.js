/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {
    fetchContacts,
    fetchLeads,
    fetchSalesmanContacts,
    fetchSalesmanLeads,
    getFilteredContacts
} from "../http/contactAPI";
import LeadTable from "../component/tables/LeadTable";
import {CONTACT_PROFILE_ROUTE} from "../utils/const";
import HeaderItem from "../component/items/HeaderItem";
import Footer from "../component/Footer";
import {findLeads, getFilteredLeads} from "../http/leadAPI";
import axios from "axios";

const Lead = () => {
    const user = useContext(Context)
    const {lead} = useContext(Context)
    const [contactName,setContactName] = useState('')
    const [contactSurname,setContactSurname] = useState('')
    const [contactsSize,setContactsSize] = useState(15)
    const [pageNumber,setPageNumber] = useState(0)
    const [pagesCount,setPagesCount] = useState(0)
    const [filterType,setFilterType] = useState('byId')

    useEffect(() => {
        if(!user) return;
        console.log(user.id)
        user.role ==="ROLE_SALESMAN" ?
            fetchSalesmanLeads(user.id).then(data => {
                lead.setContacts(data)
                console.log(data)
            })
            :
            findLeads(contactsSize, pageNumber).then(data => {
                lead.setContacts(data.users)
                lead.setTotalCount(data.totalItems)
                lead.setPage(data.currentPage)
                lead.setTotalPages(data.totalPages)
                setPagesCount(data.totalPages)
                console.log(data)
            })

    }, [user])

    const changeSize = async(size) => {
        setContactsSize(size);
        try {
            let response
            response = await getFilteredLeads(contactName, contactSurname ,filterType, size, pageNumber)
            lead.setTotalPages(response.totalPages)
            lead.setContacts(response.users)
            lead.setTotalCount(response.totalItems)
            lead.setPage(response.currentPage)
            setPagesCount(response.totalPages)
            console.log(response)

        } catch (e) {
            alert(e.response.data.message)
        }
    }


    const changePage = async(pageNum) => {
        console.log(pageNum)
        setPageNumber(pageNum);
        try {
            let response
            response = await getFilteredLeads(contactName, contactSurname ,filterType, contactsSize, pageNum)
            lead.setContacts(response.users)
            lead.setTotalCount(response.totalItems)
            lead.setPage(response.currentPage)
            lead.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const searchByName = async(userName) => {
        setContactName(userName);
        try {
            let response
            response = await getFilteredLeads(userName, contactSurname, filterType, contactsSize, pageNumber)
            lead.setContacts(response.users)
            lead.setTotalCount(response.totalItems)
            lead.setPage(response.currentPage)
            lead.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const searchBySurname = async(userSurname) => {
        setContactSurname(userSurname);
        try {
            let response
            response = await getFilteredLeads(contactName, userSurname, filterType, contactsSize, pageNumber)
            lead.setContacts(response.users)
            lead.setTotalCount(response.totalItems)
            lead.setPage(response.currentPage)
            lead.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const searchByType = async(type) => {

        setFilterType(type);
        try {
            let response
            response = await getFilteredLeads(contactName, contactSurname, type, contactsSize, pageNumber)
            lead.setContacts(response.users)
            lead.setTotalCount(response.totalItems)
            lead.setPage(response.currentPage)
            lead.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const importUsers = async () => {
        let file = document.getElementById("import-file").files[0];
        console.log(file);
        if (!(file == null)){

            let formData = new FormData();
            formData.append('file', file);
            axios.post(
                process.env.REACT_APP_API_URL + "api/v1/leads/import/csv",
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


    return (
        <div>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <HeaderItem title="Leady"></HeaderItem>



                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-4">
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="text-sm-end mt-2 mt-sm-0">
                                                    <input type="file" id="import-file" onChange={importUsers} hidden/>

                                                    <label className="btn btn-light mb-2 me-1"
                                                           htmlFor="import-file">Import</label>

                                                    <a href="http://localhost:8080/api/v1/leads/export/csv"
                                                       className="btn btn-light mb-2">Export</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
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
                                                        <option value="byEdrContractGenerated">Supersmlouva/Dílčí supersmlouva</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="status-select" className="me-2">Stav dodatku</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select className="form-select my-1 my-md-0" id="status-select" onChange={e => searchByType(e.target.value)}>
                                                        <option value="byEdrContractGenerated">Vygenerovaný</option>
                                                        <option value="byEdrContractSent">Odeslaný</option>
                                                        <option value="byEdrContractSigned">Podepsaný</option>
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
                                                    <th>Obchodní zástupce</th>
                                                    <th>Kontaktní osoba</th>
                                                    <th>Kraj</th>
                                                    <th>PSČ</th>
                                                    <th>Kampaň</th>
                                                    <th>Supersmlouva/Dílčí supersmlouva</th>
                                                </tr>
                                                </thead>
                                                <LeadTable></LeadTable>
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
                                                Array.from(Array(pagesCount), (e, i) => {
                                                    return <li className="page-item" key={i}><button className="page-link" onClick={() => changePage(i)}>{i}</button></li>
                                                })
                                            }
                                        </ul>

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
};

export default Lead;