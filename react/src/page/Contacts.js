/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {fetchContacts, fetchSalesmanContacts} from "../http/contactAPI";
import ContactItem from "../component/items/ContactItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ContactTable from "../component/tables/ContactTable";
import Footer from "../component/Footer";
import {CONTACT_PROFILE_ROUTE} from "../utils/const";

const Contacts = observer(() => {
    const {contact} = useContext(Context)
    const {user} = useContext(Context)
    useEffect(() => {
        // console.log(user.userId)
        // if(user.role === "ROLE_SALESMAN"){
        //     fetchSalesmanContacts().then(data => contact.setContacts(data))
        // }else{
            fetchContacts().then(data => {
                contact.setContacts(data)
                console.log(data)
            })
    }, [])

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
                                            <li className="breadcrumb-item"><a href="#">UBold</a></li>
                                            <li className="breadcrumb-item"><a href="#">CRM</a></li>
                                            <li className="breadcrumb-item active">Kontakty</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Kontakty</h4>
                                </div>
                            </div>
                        </div>


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
                                                    <button type="button" className="btn btn-success mb-2 me-1"><i
                                                        className="mdi mdi-cog"></i></button>
                                                    <button type="button" className="btn btn-light mb-2 me-1">Import
                                                    </button>
                                                    <button type="button" className="btn btn-light mb-2">Export</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-auto">
                                                <form className="d-flex flex-wrap align-items-center">
                                                    <label htmlFor="inputPassword2"
                                                           className="visually-hidden">Search</label>
                                                    <div className="me-3">
                                                        <input type="search" className="form-control my-1 my-lg-0"
                                                               id="inputPassword2" placeholder="Search..." />
                                                    </div>
                                                    <label htmlFor="status-select" className="me-2">Sort By</label>
                                                    <div className="me-sm-3">
                                                        <select className="form-select my-1 my-lg-0" id="status-select">
                                                            <option selected="">All</option>
                                                            <option value="1">Popular</option>
                                                            <option value="2">Price Low</option>
                                                            <option value="3">Price High</option>
                                                            <option value="4">Sold Out</option>
                                                        </select>
                                                    </div>
                                                </form>
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
                                                    <th>Pohlaví</th>
                                                    <th>Telefon</th>
                                                    <th>Email</th>
                                                    <th>Stav</th>
                                                    <th>Kraj</th>
                                                    <th>PSČ</th>
                                                    <th>Kampaň</th>
                                                    <th>Konkurentní FVE</th>
                                                    <th>FVE Solid Sun</th>
                                                    <th style={{width: '85px'}}>Osobní stránka</th>
                                                </tr>
                                                </thead>
                                                <ContactTable></ContactTable>
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
});

export default Contacts;