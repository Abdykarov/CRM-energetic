import React from 'react';
import {CONTACTS_ROUTE, DASHBOARD_ROUTE, MANAGER_ROUTE, SALESMAN_ROUTE} from "../utils/const";

const LeftSidebar = () => {
    return (
            <div className="left-side-menu">

                <div className="h-100" data-simplebar>

                    <div className="user-box text-center">
                        <img src="/images/users/user-1.jpg" alt="user-img" title="Mat Helme"
                             className="rounded-circle avatar-md" />
                            <div className="dropdown">
                                <a href=""
                                   className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block"
                                   data-bs-toggle="dropdown">Geneva Kennedy</a>
                                <div className="dropdown-menu user-pro-dropdown">

                                    <a href="" className="dropdown-item notify-item">
                                        <i className="fe-user me-1"></i>
                                        <span>My Account</span>
                                    </a>

                                    <a href="" className="dropdown-item notify-item">
                                        <i className="fe-settings me-1"></i>
                                        <span>Settings</span>
                                    </a>

                                    <a href="" className="dropdown-item notify-item">
                                        <i className="fe-lock me-1"></i>
                                        <span>Lock Screen</span>
                                    </a>

                                    <a href="" className="dropdown-item notify-item">
                                        <i className="fe-log-out me-1"></i>
                                        <span>Logout</span>
                                    </a>

                                </div>
                            </div>
                            <p className="text-muted">Admin Head</p>
                    </div>

                    <div id="sidebar-menu">

                        <ul id="side-menu">

                            <li className="menu-title">Navigation</li>

                            <li>
                                <a href={DASHBOARD_ROUTE}>
                                    <i className="mdi mdi-view-dashboard-outline"></i>
                                    <span> Hlavní stranka </span>
                                </a>
                            </li>
                            <li>

                            </li>
                            <li>
                                <a href={SALESMAN_ROUTE}>
                                    <i className="mdi mdi-view-dashboard-outline"></i>
                                    <span className="badge bg-success rounded-pill float-end">15</span>
                                    <span> Obchodní zástupce </span>
                                </a>
                            </li>
                            <li>
                                <a href={MANAGER_ROUTE}>
                                    <i className="mdi mdi-view-dashboard-outline"></i>
                                    <span className="badge bg-success rounded-pill float-end">5</span>
                                    <span> Manažery </span>
                                </a>
                            </li>
                            <li>
                                <a href="#sidebarDashboards" data-bs-toggle="collapse">
                                    <i className="mdi mdi-view-dashboard-outline"></i>
                                    <span className="badge bg-success rounded-pill float-end">4</span>
                                    <span> Kontakty </span>
                                </a>
                                <div className="collapse" id="sidebarDashboards">
                                    <ul className="nav-second-level">
                                        <li>
                                            <a href={CONTACTS_ROUTE}>Kontakty</a>
                                        </li>
                                        <li>
                                            <a href={LEAD_ROUTE}>Leady</a>
                                        </li>
                                        <li>
                                            <a href={}>Přiležitosti</a>
                                        </li>
                                        <li>
                                            <a href="dashboard-4.html">Stávající klienty</a>
                                        </li>
                                        <li>
                                            <a href="dashboard-4.html">Příhlášení klienty</a>
                                        </li>
                                        <li>
                                            <a href="dashboard-4.html">EDR členy</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>

                    </div>

                    <div className="clearfix"></div>

                </div>

            </div>
    );
};

export default LeftSidebar;