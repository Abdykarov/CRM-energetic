import React, {useContext, useEffect, useState} from 'react';
import {
    ADMIN_ROUTE, APPLICANT_ROUTE, CALLCENTRUM_ROUTE,
    CONTACTS_ROUTE,
    DASHBOARD_ROUTE, EDR_ROUTE, FACTURE_ROUTE, INBOX_ROUTE, LEAD_ROUTE,
    MANAGER_ROUTE, NOTIFICATION_ROUTE,
    SALESMAN_ROUTE, WATT_CATALOG, WATT_MAIN, WATT_REFERALS, WATT_ROUTE
} from "../utils/const";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {
    fetchAdminCoint,
    fetchCallCentrumCount,
    fetchManagerCount,
    fetchSalesmanCount,
    fetchUserByUsername
} from "../http/contactAPI";

const LeftSidebar = observer(() => {
    const {user} = useContext(Context)
    const [adminCount, setAdminCount] = useState(0)
    const [managerCount, setManagerCount] = useState(0)
    const [salesmanCount, setSalesmanCount] = useState(0)
    const [callCentrumCount, setCallCentrumCount] = useState(0)

    useEffect(() => {

        if(user.role === "ROLE_ADMIN"){
            fetchAdminCoint().then(data => {
                setAdminCount(data)
            })
        }

        if(user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER"){
            fetchManagerCount().then(data => {
                setManagerCount(data)
            })
        }

        fetchSalesmanCount().then(data => {
            setSalesmanCount(data)
        })

        fetchCallCentrumCount().then(data => {
            setCallCentrumCount(data)
        })


    }, [])
    return (
                <div className="left-side-menu">
                    {user.isAuth ?

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
                                {
                                    user.role === "ROLE_EDR" ?
                                        ""
                                        :
                                        <li className="menu-title">Navigace</li>
                                }
                                {
                                    user.role === "ROLE_EDR" ?
                                        ""
                                        :
                                        <li>
                                            <a href={DASHBOARD_ROUTE}>
                                                <i className="mdi mdi-view-dashboard-outline"></i>
                                                <span> Hlavní stránka </span>
                                            </a>
                                        </li>
                                }
                                {
                                    user.role === "ROLE_ADMIN" ?
                                        <li>
                                            <a href={MANAGER_ROUTE}>
                                                <i className="fe-user-plus"></i>
                                                <span className="badge bg-success rounded-pill float-end">{managerCount}</span>
                                                <span> Manažeři </span>
                                            </a>
                                        </li>
                                        : ""
                                }
                                {
                                    user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER" ?
                                        <li>
                                            <a href={SALESMAN_ROUTE}>
                                                <i className="fe-user-check"></i>
                                                <span className="badge bg-success rounded-pill float-end">{salesmanCount}</span>
                                                <span> Obchodní zástupci </span>
                                            </a>
                                        </li>
                                        : ""
                                }
                                {
                                    user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER" ?
                                        <li>
                                            <a href={CALLCENTRUM_ROUTE}>
                                                <i className="fe-user-check"></i>
                                                <span className="badge bg-success rounded-pill float-end">{callCentrumCount}</span>
                                                <span> Call centrum </span>
                                            </a>
                                        </li>
                                        : ""
                                }

                                {
                                    user.role === "ROLE_ADMIN" || user.role === "ROLE_SALESMAN" || user.role === "ROLE_MANAGER" || user.role === "ROLE_CC" ?
                                        <li>
                                            <a aria-expanded={true} href="#sidebarDashboards" data-bs-toggle="collapse">
                                                <i className="fe-user"></i>
                                                <span> Kontakty </span>
                                                <span className="menu-arrow"></span>
                                            </a>
                                            <div className="collapse show" id="sidebarDashboards">
                                                <ul className="nav-second-level">
                                                    <li>
                                                        <a href={CONTACTS_ROUTE}>Nový zákazník </a>
                                                    </li>
                                                    <li>
                                                        <a href={LEAD_ROUTE}>V procesu</a>
                                                    </li>
                                                    <li>
                                                        <a href={APPLICANT_ROUTE}>Uchazeči</a>
                                                    </li>
                                                    <li>
                                                        <a href={EDR_ROUTE}>Členové EDR</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        : ""
                                }
                                {
                                    user.role === "ROLE_EDR" ?
                                        <li className="menu-title">Watt Peneženka</li>
                                        : ""
                                }
                                {
                                    user.role === "ROLE_EDR" ?
                                        <li>
                                            <a href={WATT_MAIN}>
                                                <i className="fe-credit-card"></i>
                                                <span> Watt Peneženka </span>
                                            </a>
                                        </li>
                                        : ""
                                }
                                {
                                    user.role === "ROLE_EDR" ?
                                        <li>
                                            <a href={WATT_CATALOG}>
                                                <i className="fe-credit-card"></i>
                                                <span> Watt katalog </span>
                                            </a>
                                        </li>
                                        : ""
                                }
                                {
                                    user.role === "ROLE_EDR" ?
                                        <li>
                                            <a href={WATT_REFERALS}>
                                                <i className="fe-credit-card"></i>
                                                <span> Watt referaly </span>
                                            </a>
                                        </li>
                                        : ""
                                }
                                <li className="menu-title">Notifikace</li>
                                <li>
                                    <a href={NOTIFICATION_ROUTE}>
                                        <i className="fe-credit-card"></i>
                                        <span> Notifikace </span>
                                    </a>
                                </li>
                                {
                                    user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER" ?
                                        <li className="menu-title">Komunikace</li>
                                        : ""
                                }

                                {
                                    user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER" ?
                                        <li>
                                            <a href="#emailBar" data-bs-toggle="collapse">
                                                <i className="fe-mail"></i>
                                                <span> Komunikace </span>
                                                <span className="menu-arrow"></span>
                                            </a>
                                            <div className="collapse" id="emailBar">
                                                <ul className="nav-second-level">
                                                    <li>
                                                        <a href={INBOX_ROUTE}>Příchozí</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        : ""
                                }

                                {
                                    user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER" ?
                                        <li className="menu-title">Faktury</li>

                                        : ""
                                }
                                {
                                    user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER" ?
                                        <li>
                                            <a href={FACTURE_ROUTE}>
                                                <i className="fe-credit-card"></i>
                                                <span> Vygenerované faktury </span>
                                            </a>
                                        </li>
                                        : ""
                                }
                                {
                                    user.role === "ROLE_ADMIN" ?
                                        <li className="menu-title">Admin</li>

                                        : ""
                                }
                                {
                                    user.role === "ROLE_ADMIN" ?
                                        <li>
                                            <a href="#adminBar" data-bs-toggle="collapse">
                                                <i className="fe-unlock "></i>
                                                <span> Admin bar </span>
                                                <span className="menu-arrow"></span>
                                            </a>
                                            <div className="collapse" id="adminBar">
                                                <ul className="nav-second-level">
                                                    <li>
                                                        <a href="#">Nastavení parametrů systému</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Nastavení Watt peněženky</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        : ""
                                }
                            </ul>

                        </div>

                        <div className="clearfix"></div>

                    </div>
                        : <div></div>}
                </div>
    );
});

export default LeftSidebar;