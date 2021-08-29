/* eslint-disable */
import React, {useContext} from 'react';
import {Context} from "../index";

const UserProfile = () => {
    const {user} = useContext(Context)
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
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">UBold</a>
                                            </li>
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Extras</a>
                                            </li>
                                            <li className="breadcrumb-item active">Profile</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Profile</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-xl-4">
                                <div className="card text-center">
                                    <div className="card-body">
                                        <img src="/images/users/user-5.jpg"
                                             className="rounded-circle avatar-lg img-thumbnail"
                                             alt="profile-image" />

                                            <h4 className="mb-0">{user.name} {user.surname}</h4>
                                            <p className="text-muted">@ {user.role}</p>

                                            <button type="button"
                                                    className="btn btn-success btn-xs waves-effect mb-2 waves-light">Zavolat
                                            </button>
                                            <button type="button"
                                                    className="btn btn-danger btn-xs waves-effect mb-2 waves-light">Odeslat email
                                            </button>

                                            <div className="text-start mt-3">
                                                <h4 className="font-13 text-uppercase">Role : {user.role} </h4>

                                                <p className="text-muted mb-2 font-13"><strong>Jméno a přijmení :</strong>
                                                    <span className="ms-2">{user.name} {user.surname}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Telefon :</strong><span
                                                    className="ms-2">{user.phone}</span></p>

                                                <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span
                                                    className="ms-2">{user.email}</span></p>

                                                <p className="text-muted mb-1 font-13"><strong>Město :</strong> <span
                                                    className="ms-2">{user.city}</span></p>
                                                <p className="text-muted mb-1 font-13"><strong>Psč :</strong> <span
                                                    className="ms-2">{user.psc}</span></p>
                                                {
                                                    user.role=="EDR" ?
                                                <p className="text-muted mb-1 font-13"><strong>Počet bodů :</strong> <span
                                                    className="ms-2">{user.points}</span></p>
                                                :  ""
                                            }
                                    </div>


                                    </div>
                                </div>
                            </div>
                            

                            <div className="col-lg-8 col-xl-8">
                                <div className="card">
                                    <div className="card-body">
                                        <ul className="nav nav-pills nav-fill navtab-bg">
                                            <li className="nav-item">
                                                <a href="#attachments" data-bs-toggle="tab" aria-expanded="true"
                                                   className="nav-link active">
                                                    Přílohy
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#edit" data-bs-toggle="tab" aria-expanded="false"
                                                   className="nav-link">
                                                    Edit profile
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            
                                            <div className="tab-pane show active" id="attachments">

                                                <h5>Přílohy</h5>

                                            </div>

                                            <div className="tab-pane" id="edit">
                                                <form>
                                                    <h5 className="mb-4 text-uppercase"><i
                                                        className="mdi mdi-account-circle me-1"></i> Osobní informace</h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="firstname" className="form-label">Jméno</label>
                                                                <input value={user.name} type="text" className="form-control"
                                                                       id="firstname" placeholder="Enter first name" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="lastname" className="form-label">Příjmení</label>
                                                                <input value={user.surname} type="text" className="form-control"
                                                                       id="lastname" placeholder="Enter last name"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="lastname" className="form-label">Telefon</label>
                                                                <input value={user.phone} type="number" className="form-control"
                                                                       id="lastname" placeholder="Enter last name"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="lastname" className="form-label">Email</label>
                                                                <input value={user.email} type="name" className="form-control"
                                                                       id="lastname" placeholder="Enter last name"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="lastname" className="form-label">Město</label>
                                                                <input value={user.city} type="name" className="form-control"
                                                                       id="lastname" placeholder="Enter last name"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="lastname" className="form-label">PSČ</label>
                                                                <input value={user.psc} type="name" className="form-control"
                                                                       id="lastname" placeholder="Enter last name"/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-end">
                                                        <button type="submit"
                                                                className="btn btn-success waves-effect waves-light mt-2">
                                                            <i className="mdi mdi-content-save"></i> Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        

                    </div>
                    

                </div>

                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <script>document.write(new Date().getFullYear())</script>
                                &copy; UBold theme by <a href="">Coderthemes</a>
                            </div>
                            <div className="col-md-6">
                                <div className="text-md-end footer-links d-none d-sm-block">
                                    <a href="javascript:void(0);">About Us</a>
                                    <a href="javascript:void(0);">Help</a>
                                    <a href="javascript:void(0);">Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
};

export default UserProfile;