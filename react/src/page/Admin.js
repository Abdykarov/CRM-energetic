import React, {useContext, useEffect} from 'react';
import AdminTable from "../component/tables/AdminTable";
import {Context} from "../index";
import {fetchAdmins, fetchLeads} from "../http/contactAPI";
import Footer from "../component/Footer";
import FactureItem from "../component/items/FactureItem";
import HeaderItem from "../component/items/HeaderItem";
import PaginationItem from "../component/items/PaginationItem";

const Admin = () => {
    const {admin} = useContext(Context)
    useEffect(() => {
        fetchAdmins().then(data => {
            admin.setContacts(data)
            console.log(data)
        })
    }, [])
    return (
        <div className="content-page">
            <div className="content">

                <div className="container-fluid">

                    <HeaderItem title="Adminy"/>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row justify-content-between">
                                        <div className="col-md-8">
                                            <form className="d-flex flex-wrap align-items-center">
                                                <label htmlFor="inputPassword2"
                                                       className="visually-hidden">Najít</label>
                                                <div className="me-3">
                                                    <input type="search" className="form-control my-1 my-md-0"
                                                           id="inputPassword2" placeholder="Search..."/>
                                                </div>
                                                <label htmlFor="status-select" className="me-2">Sort By</label>
                                                <div className="me-sm-3">
                                                    <select className="form-select my-1 my-md-0" id="status-select">
                                                        <option selected="">All</option>
                                                        <option value="1">Name</option>
                                                        <option value="2">Post</option>
                                                        <option value="3">Followers</option>
                                                        <option value="4">Followings</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="text-md-end mt-3 mt-md-0">
                                                <a href="/registration/admin"
                                                   className="btn btn-danger waves-effect waves-light">
                                                    <i
                                                        className="mdi mdi-plus-circle me-1"></i> Založit nového admina
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <AdminTable></AdminTable>

                    <PaginationItem></PaginationItem>

                </div>

            </div>

            <Footer></Footer>

        </div>
    );
};

export default Admin;