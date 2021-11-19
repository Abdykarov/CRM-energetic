/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {exportJson, fetchApplicants, fetchContacts, fetchLeads} from "../http/contactAPI";
import LeadTable from "../component/tables/LeadTable";
import ApplicantTable from "../component/tables/ApplicantTable";
import {CONTACT_PROFILE_ROUTE} from "../utils/const";
import HeaderItem from "../component/items/HeaderItem";
import Footer from "../component/Footer";
import {findLeads, getFilteredLeads} from "../http/leadAPI";
import {findApplicants, getFilteredApplicants} from "../http/applicantAPI";
import axios from "axios";

const Applicant = () => {
    const {applicant} = useContext(Context)
    const user = useContext(Context)
    const [contactsSize,setContactsSize] = useState(15)
    const [pageNumber,setPageNumber] = useState(0)
    const [pagesCount,setPagesCount] = useState(0)
    const [filterType,setFilterType] = useState('byId')

    useEffect(() => {
        findApplicants(contactsSize, pageNumber).then(data => {
            applicant.setContacts(data.users)
            applicant.setTotalCount(data.totalItems)
            applicant.setPage(data.currentPage)
            applicant.setTotalPages(data.totalPages)
            setPagesCount(data.totalPages)
            console.log(data)
        })
    }, [])

    const hwFilter = async () => {
        document.getElementById("syselFilter").classList.add("dark");
        document.getElementById("fveFilter").classList.add("dark");
        document.getElementById("factureFilter").classList.add("dark");
        document.getElementById("requestFilter").classList.add("dark");
        document.getElementById("hwFilter").classList.remove("dark");
    }

    const syselFilter = async () => {
        document.getElementById("fveFilter").classList.add("dark");
        document.getElementById("factureFilter").classList.add("dark");
        document.getElementById("requestFilter").classList.add("dark");
        document.getElementById("hwFilter").classList.add("dark");
        document.getElementById("syselFilter").classList.remove("dark");
    }

    const fveFilter = async () => {
        document.getElementById("syselFilter").classList.add("dark");
        document.getElementById("factureFilter").classList.add("dark");
        document.getElementById("requestFilter").classList.add("dark");
        document.getElementById("hwFilter").classList.add("dark");
        document.getElementById("fveFilter").classList.remove("dark");
    }


    const requestFilter = async () => {
        document.getElementById("syselFilter").classList.add("dark");
        document.getElementById("fveFilter").classList.add("dark");
        document.getElementById("factureFilter").classList.add("dark");
        document.getElementById("requestFilter").classList.remove("dark");
        document.getElementById("hwFilter").classList.add("dark");
    }


    const factureFilter = async () => {
        document.getElementById("syselFilter").classList.add("dark");
        document.getElementById("fveFilter").classList.add("dark");
        document.getElementById("factureFilter").classList.remove("dark");
        document.getElementById("requestFilter").classList.add("dark");
        document.getElementById("hwFilter").classList.add("dark");
    }


    const changeSize = async(size) => {
        setContactsSize(size);
        try {
            let response
            response = await getFilteredApplicants(filterType, contactsSize, pageNumber)
            applicant.setTotalPages(response.totalPages)
            applicant.setContacts(response.users)
            applicant.setTotalCount(response.totalItems)
            applicant.setPage(response.currentPage)
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
            response = await getFilteredApplicants(filterType, contactsSize, pageNum)
            applicant.setContacts(response.users)
            applicant.setTotalCount(response.totalItems)
            applicant.setPage(response.currentPage)
            applicant.setTotalPages(response.totalPages)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const searchByType = async(type) => {

        setFilterType(type);
        try {
            let response
            response = await getFilteredApplicants(type, contactsSize, pageNumber)
            applicant.setContacts(response.users)
            applicant.setTotalCount(response.totalItems)
            applicant.setPage(response.currentPage)
            applicant.setTotalPages(response.totalPages)
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
                process.env.REACT_APP_API_URL + "api/v1/applicants/import/csv",
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

                        <HeaderItem title="Uchazeči"></HeaderItem>

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

                                                    <a href="http://localhost:8080/api/v1/applicants/export/csv"
                                                       className="btn btn-light mb-2">Export</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-sm-3">
                                                <label htmlFor="inputPassword2">Vyhledat podle jména nebo příjmení</label>
                                                <div className="me-3 mt-2">
                                                    <input type="search" className="form-control my-1 my-md-0"
                                                           id="inputPassword2" placeholder="Vyhledat..."/>
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
                                                        <option value="byHwSunMonitorGenerated" onClick={hwFilter}>HW Sun Monitor</option>
                                                        <option value="bySyselAgreementGenerated" onClick={syselFilter}>Sysel Agreement</option>
                                                        <option value="byConnectedFveGenerated" onClick={fveFilter}>Zapojená FVE</option>
                                                        <option value="byFactureGenerated" onClick={factureFilter}>Faktura</option>
                                                        <option value="byRequestToEdrGenerated" onClick={requestFilter}>Přihláška</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 dark" id="hwFilter">
                                                <label htmlFor="status-select" className="me-2">Podle stavu HW</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={filterType} onChange={e => searchByType(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="byHwSunMonitorGenerated">Generovaný</option>
                                                        <option value="byHwSunMonitorSent">Odeslaný</option>
                                                        <option value="byHwSunMonitorSigned">Podepsaný</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 dark" id="syselFilter">
                                                <label htmlFor="status-select" className="me-2">Podle stavu Sysel</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={filterType} onChange={e => searchByType(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="bySyselAgreementGenerated">Generovaný</option>
                                                        <option value="bySyselAgreementSent">Odeslaný</option>
                                                        <option value="bySyselAgreementSigned">Podepsaný</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 dark" id="fveFilter">
                                                <label htmlFor="status-select" className="me-2">Podle stavu Fve</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={filterType} onChange={e => searchByType(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="byConnectedFveGenerated">Generovaný</option>
                                                        <option value="byConnectedFveSent">Odeslaný</option>
                                                        <option value="byConnectedFveSigned">Podepsaný</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 dark" id="factureFilter">
                                                <label htmlFor="status-select" className="me-2">Podle stavu faktury</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={filterType} onChange={e => searchByType(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="byFactureGenerated">Generovaný</option>
                                                        <option value="byFactureSent">Odeslaný</option>
                                                        <option value="byFacturePaid">Zaplacený</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 dark" id="requestFilter">
                                                <label htmlFor="status-select" className="me-2">Podle stavu přihlášky</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={filterType} onChange={e => searchByType(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="byRequestToEdrGenerated">Generovaný</option>
                                                        <option value="byRequestToEdrSent">Odeslaný</option>
                                                        <option value="byRequestToEdrSigned">Podepsaný</option>
                                                        <option value="byRequestToEdrAccepted">Schvalený</option>
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
                                                    <th>Kontakt</th>
                                                    <th>Jméno</th>
                                                    <th>Příjmení</th>
                                                    <th>Telefon</th>
                                                    <th>Email</th>
                                                    <th>Stav</th>
                                                    <th>Kraj</th>
                                                    <th>PSČ</th>
                                                    <th>Kontaktní osoba</th>
                                                    <th>Obchodní zástupce</th>
                                                    <th>Kampaň</th>
                                                    <th>HW Sun Monitor</th>
                                                    <th>Smlouva Sysel</th>
                                                    <th>Zapojená FVE</th>
                                                    <th>Přihláška</th>
                                                    <th>Faktura</th>
                                                    <th>Osobní stránka</th>
                                                </tr>
                                                </thead>
                                                <ApplicantTable></ApplicantTable>
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

export default Applicant;