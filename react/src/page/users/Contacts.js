/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {fetchContacts} from "../../http/contactAPI";
import ContactItem from "../../component/items/ContactItem";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ContactTable from "../../component/tables/ContactTable";
import Footer from "../../component/Footer";

const Contacts = observer(() => {
    const {contact} = useContext(Context)
    useEffect(() => {
        fetchContacts().then(data => contact.setContacts(data))
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
                                            <li className="breadcrumb-item active">Customers</li>
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
                                                    <th>Id</th>
                                                    <th>Jméno</th>
                                                    <th>Příjmení</th>
                                                    <th>Telefon</th>
                                                    <th>Email</th>
                                                    <th>Stav</th>
                                                    <th>Obchodní zástupce</th>
                                                    <th>Název společnosti</th>
                                                    <th>Pracovní pozice</th>
                                                    <th>Město</th>
                                                    <th>PSČ</th>
                                                    <th style={{width: '85px'}}>Action</th>
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