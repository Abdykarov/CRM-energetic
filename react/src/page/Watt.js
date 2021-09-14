import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Context} from "../index";
import ContactTable from "../component/tables/ContactTable";
import Footer from "../component/Footer";
import {createAdmin, createReferalLink, fetchPotentials, fetchReferals} from "../http/contactAPI";
import {ADMIN_ROUTE, REGISTRATION_REFERAL_ROUTE, WATT_ROUTE} from "../utils/const";
import WattTable from "../component/tables/WattTable";

const Watt = () => {
    const history = useHistory()
    const location = useLocation()
    const {watt} = useContext(Context)
    const {user} = useContext(Context)
    const [referalLink, setReferalLink] = useState('')

    const generateReferalLink = async () => {
        try {
            let response
            response = await createReferalLink(user.id)
            console.log(response)
            setReferalLink('http://localhost:3000' + REGISTRATION_REFERAL_ROUTE + '/' + response)
            history.push(WATT_ROUTE);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchReferals(user.id).then(data => watt.setContacts(data))
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
                                            <li className="breadcrumb-item active">Watt peneženka</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Watt peneženka</h4>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-4">
                                                <button onClick={generateReferalLink} className="btn btn-danger waves-effect waves-light"><i
                                                    className="mdi mdi-plus-circle me-1"></i> Vygenerovat unikátní odkaz
                                                </button>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="text-sm-end mt-2 mt-sm-0">
                                                    <input  type="text" id="example-readonly" className="form-control"
                                                           readOnly="" value={referalLink} />
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
                                                    <th>Přihlašený klient</th>
                                                    <th>Datum</th>
                                                    <th>Počet bodů</th>
                                                </tr>
                                                </thead>
                                                <WattTable></WattTable>
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

export default Watt;