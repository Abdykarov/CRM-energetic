import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Context} from "../index";
import ContactTable from "../component/tables/ContactTable";
import Footer from "../component/Footer";
import {createAdmin, createReferalLink, fetchPotentials, fetchReferals} from "../http/contactAPI";
import {ADMIN_ROUTE, REGISTRATION_REFERAL_ROUTE, WATT_ROUTE} from "../utils/const";
import WattTable from "../component/tables/WattTable";
import HeaderItem from "../component/items/HeaderItem";

const WattReferals = () => {
    const history = useHistory()
    const location = useLocation()
    const {watt} = useContext(Context)
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')

    const generateReferalLink = async () => {
        try {
            let response
            let id = user.id
            response = await createReferalLink(email, id)
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

                        <HeaderItem title="Referaly"></HeaderItem>


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-8">
                                                <div className="text-sm-end mt-2 mt-sm-0">
                                                    <input  type="text" className="form-control" placeholder="Email kám odeslat referalní odkaz" onChange={e => setEmail(e.target.value)} value={email} />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <button onClick={generateReferalLink} className="btn btn-danger waves-effect waves-light"><i
                                                    className="mdi mdi-plus-circle me-1"></i> Vygenerovat unikátní odkaz
                                                </button>
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

export default WattReferals;