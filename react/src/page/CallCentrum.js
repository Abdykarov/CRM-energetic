/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {fetchAdmins, fetchCallCentrums, fetchSalesmans} from "../http/contactAPI";
import SalesmanTable from "../component/tables/SalesmanTable";
import HeaderItem from "../component/items/HeaderItem";
import PaginationItem from "../component/items/PaginationItem";
import Footer from "../component/Footer";
import CallCentrumTable from "../component/tables/CallCentrumTable";

const CallCentrum = () => {
    const {callCentrum} = useContext(Context)
    const {user} = useContext(Context)
    useEffect(() => {
        fetchCallCentrums().then(data => {
            callCentrum.setContacts(data)
            console.log(data)
        })
    }, [])
    return (
        <div className="content-page">
            <div className="content">

                <div className="container-fluid">

                    <HeaderItem title="Call Centrum"/>


                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                            {
                                                user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER" ?
                                                    <div className="row justify-content-between">
                                                            <div className="col-md-8">
                                                                <form className="d-flex flex-wrap align-items-center">
                                                                    <label htmlFor="inputPassword2"
                                                                           className="visually-hidden">Vyhledat</label>
                                                                    <div className="me-3">
                                                                        <input type="search" className="form-control my-1 my-md-0"
                                                                               id="inputPassword2" placeholder="Vyhledat..."/>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-md-4">
                                                            <div className="text-md-end mt-3 mt-md-0">
                                                                <button type="button"
                                                                        className="btn btn-success waves-effect waves-light me-1"><i
                                                                    className="mdi mdi-cog"></i></button>
                                                                <a href="/registration/call-centrum" type="button"
                                                                   className="btn btn-danger waves-effect waves-light">
                                                                    <i
                                                                        className="mdi mdi-plus-circle me-1"></i> Založit nový call centrum
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ""
                                            }


                                </div>
                            </div>
                        </div>
                    </div>


                    <CallCentrumTable></CallCentrumTable>

                    <PaginationItem></PaginationItem>

                </div>

            </div>

            <Footer></Footer>

        </div>
    );
};

export default CallCentrum;