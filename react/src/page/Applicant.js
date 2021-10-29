/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {exportJson, fetchApplicants, fetchContacts, fetchLeads} from "../http/contactAPI";
import LeadTable from "../component/tables/LeadTable";
import ApplicantTable from "../component/tables/ApplicantTable";
import {CONTACT_PROFILE_ROUTE} from "../utils/const";
import HeaderItem from "../component/items/HeaderItem";
import Footer from "../component/Footer";

const Applicant = () => {
    const {applicant} = useContext(Context)
    useEffect(() => {
        fetchApplicants().then(data => {
            applicant.setContacts(data)
            console.log(data)
        })
    }, [])

    const hwFilter = async () => {
        document.getElementById("hwFilter").classList.remove("dark");
    }

    const syselFilter = async () => {
        try {
            alert("sysel")
        } catch (e) {
            alert(e.response.data.message)
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
                                                    <button type="button" className="btn btn-light mb-2 me-1">Import
                                                    </button>
                                                    <a href="http://localhost:8080/edr_api/user/export-json" className="btn btn-light mb-2">Export</a>
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
                                                    <select className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="id">Id</option>
                                                        <option value="name">Jméno</option>
                                                        <option value="surname">Příjmení</option>
                                                        <option value="email">Email</option>
                                                        <option value="area">Kraj</option>
                                                        <option value="hwSunMonitor" onClick={hwFilter}>HW Sun Monitor</option>
                                                        <option value="sysel" onClick={syselFilter}>Smlouva Sysel</option>
                                                        <option value="connectedFve">Zapojená FVE</option>
                                                        <option value="facture">Faktura</option>
                                                        <option value="edrRequest">Přihláška</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 dark" id="hwFilter">
                                                <label htmlFor="status-select" className="me-2">Podle stavu HW</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="generatedHw">Generovaný</option>
                                                        <option value="sentHw">Odeslaný</option>
                                                        <option value="signedHw">Podepsaný</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-sm-3">
                                                <label htmlFor="status-select" className="me-2">Sortovat</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select className="form-select my-1 my-md-0">
                                                        <option value="asc">Vzestupně</option>
                                                        <option value="desc">Sestupně</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-9">

                                            </div>
                                            <div className="text-sm-end mt-2 mb-2 col-sm-3">
                                                <button type="button" className="btn btn-success waves-effect waves-light">Filtrovat</button>
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
                                                    <th>Osobní Stranka</th>
                                                </tr>
                                                </thead>
                                                <ApplicantTable></ApplicantTable>
                                            </table>
                                        </div>

                                        <ul className="pagination pagination-rounded justify-content-end mb-0">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">«</span>
                                                    <span className="visually-hidden">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link"
                                                                                href="#">1</a></li>
                                            <li className="page-item"><a className="page-link"
                                                                         href="#">2</a></li>
                                            <li className="page-item"><a className="page-link"
                                                                         href="#">3</a></li>
                                            <li className="page-item"><a className="page-link"
                                                                         href="#">4</a></li>
                                            <li className="page-item"><a className="page-link"
                                                                         href="#">5</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">»</span>
                                                    <span className="visually-hidden">Next</span>
                                                </a>
                                            </li>
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