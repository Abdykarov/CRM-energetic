import React, {useContext} from 'react';
import {Navbar} from "react-bootstrap";
import {Context} from "../index";
import {PROFILE_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar>
            {user.isAuth ?

                <div className="navbar-custom">
                    <div className="container-fluid">

                        <ul className="list-unstyled topnav-menu float-end mb-0">
                            <li className="d-none d-lg-block">
                                <form className="app-search">
                                    <div className="app-search-box dropdown">
                                        <div className="input-group">
                                            <input type="search" className="form-control" placeholder="Search..."
                                                   id="top-search" />
                                                <button className="btn input-group-text" type="submit">
                                                    <i className="fe-search"></i>
                                                </button>
                                        </div>
                                    </div>
                                </form>
                            </li>
                            <li className="dropdown notification-list topbar-dropdown">
                                <a className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light"
                                   data-bs-toggle="dropdown" href onClick={(e) => {e.preventDefault();}} role="button" aria-haspopup="false"
                                   aria-expanded="false">
                                    <img src="/images/users/user-1.jpg" alt="userimg"
                                         className="rounded-circle"/>
                                    <span className="pro-user-name ms-1">
                        Geneva <i className="mdi mdi-chevron-down"></i>
                    </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end profile-dropdown ">

                                    <div className="dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Dobrý den !</h6>
                                    </div>

                                    <a href={PROFILE_ROUTE + '/1'} className="dropdown-item notify-item">
                                        <i className="fe-user"></i>
                                        <span>Osobní stranka</span>
                                    </a>

                                    <div className="dropdown-divider"></div>

                                    <a href onClick={(e) => {e.preventDefault();}} className="dropdown-item notify-item">
                                        <i className="fe-log-out"></i>
                                        <span>Logout</span>
                                    </a>

                                </div>
                            </li>

                            <li className="dropdown notification-list">
                                <a href onClick={(e) => {e.preventDefault();}}
                                   className="nav-link right-bar-toggle waves-effect waves-light">
                                    <i className="fas fa-cog"></i>
                                </a>
                            </li>

                        </ul>

                        <div className="logo-box">
                            <a href="index.html" className="logo logo-dark text-center">
                <span className="logo-sm">
                    <img src="/images/logo-sm.png" alt="" height="22"/>

                </span>
                                <span className="logo-lg">
                    <img src="/images/logo-dark.png" alt="" height="20"/>
                </span>
                            </a>

                            <a href="/" className="logo logo-light text-center">
                <span className="logo-sm">
                    <img src="/images/logo-sm.png" alt="" height="22"/>
                </span>
                                <span className="logo-lg">
                    <img src="/images/logoEDR.png" alt="" width={200}/>
                </span>
                            </a>
                        </div>

                        <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                            <li>
                                <button className="button-menu-mobile waves-effect waves-light">
                                    <i className="fas fa-align-left"></i>
                                </button>
                            </li>

                            <li>
                                <a className="navbar-toggle nav-link" data-bs-toggle="collapse"
                                   data-bs-target="#topnav-menu-content">
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </a>
                            </li>

                            <li className="dropdown d-none d-xl-block">
                                <a className="nav-link dropdown-toggle waves-effect waves-light"
                                   data-bs-toggle="dropdown"
                                   href onClick={(e) => {e.preventDefault();}} role="button" aria-haspopup="false" aria-expanded="false">
                                    Create New
                                    <i className="mdi mdi-chevron-down"></i>
                                </a>
                                <div className="dropdown-menu">

                                    <a href onClick={(e) => {e.preventDefault();}} className="dropdown-item">
                                        <i className="fe-briefcase me-1"></i>
                                        <span>New Projects</span>
                                    </a>


                                    <a href onClick={(e) => {e.preventDefault();}} className="dropdown-item">
                                        <i className="fe-user me-1"></i>
                                        <span>Create Users</span>
                                    </a>


                                    <a href onClick={(e) => {e.preventDefault();}} className="dropdown-item">
                                        <i className="fe-bar-chart-line- me-1"></i>
                                        <span>Revenue Report</span>
                                    </a>


                                    <a href onClick={(e) => {e.preventDefault();}} className="dropdown-item">
                                        <i className="fe-settings me-1"></i>
                                        <span>Settings</span>
                                    </a>

                                    <div className="dropdown-divider"></div>


                                    <a href onClick={(e) => {e.preventDefault();}} className="dropdown-item">
                                        <i className="fe-headphones me-1"></i>
                                        <span>Help & Support</span>
                                    </a>

                                </div>
                            </li>


                        </ul>
                        <div className="clearfix"></div>
                    </div>
                </div>
            : <div></div>
            }
        </Navbar>
    );
});

export default NavBar;