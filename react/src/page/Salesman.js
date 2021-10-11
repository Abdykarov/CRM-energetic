/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {fetchAdmins, fetchSalesmans} from "../http/contactAPI";
import SalesmanTable from "../component/tables/SalesmanTable";

const Salesman = () => {
    const {salesman} = useContext(Context)
    const {user} = useContext(Context)
    useEffect(() => {
        fetchSalesmans().then(data => {
            salesman.setContacts(data)
            console.log(data)
        })
    }, [])
    return (
        <div className="content-page">
            <div className="content">

                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">UBold</a></li>
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Apps</a></li>
                                        <li className="breadcrumb-item active">Contacts</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">Obchodní zástupce</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row justify-content-between">
                                        <div className="col-md-8">
                                            <form className="d-flex flex-wrap align-items-center">
                                                <label htmlFor="inputPassword2"
                                                       className="visually-hidden">Search</label>
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
                                            {
                                                user.role !== "ROLE_SALESMAN" ?
                                                    <div className="text-md-end mt-3 mt-md-0">
                                                        <button type="button"
                                                                className="btn btn-success waves-effect waves-light me-1"><i
                                                            className="mdi mdi-cog"></i></button>
                                                        <a href="/registration/salesman" type="button"
                                                           className="btn btn-danger waves-effect waves-light">
                                                            <i
                                                                className="mdi mdi-plus-circle me-1"></i> Založit nového obchodního zástupce
                                                        </a>
                                                    </div>

                                                    : ""
                                            }
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    <SalesmanTable></SalesmanTable>
                    

                    <div className="row">
                        <div className="col-12">
                            <div className="text-end">
                                <ul className="pagination pagination-rounded justify-content-end">
                                    <li className="page-item">
                                        <a className="page-link" href="javascript: void(0);" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                            <span className="visually-hidden">Previous</span>
                                        </a>
                                    </li>
                                    <li className="page-item active"><a className="page-link"
                                                                        href="javascript: void(0);">1</a></li>
                                    <li className="page-item"><a className="page-link" href="javascript: void(0);">2</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="javascript: void(0);">3</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="javascript: void(0);">4</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="javascript: void(0);">5</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="javascript: void(0);" aria-label="Next">
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

            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            &copy; Design by <a href="">Karlin It Group</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Salesman;