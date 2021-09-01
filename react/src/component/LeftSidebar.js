import React, {useContext} from 'react';
import {
    ACCEPTED_ROUTE,
    CONTACTS_ROUTE,
    CURRENT_ROUTE,
    DASHBOARD_ROUTE, EDR_ROUTE, FACTURE_ROUTE, INBOX_ROUTE, LEAD_ROUTE,
    MANAGER_ROUTE, POTENTIAL_ROUTE,
    SALESMAN_ROUTE, SENT_ROUTE, WATT_ROUTE, WRITE_ROUTE
} from "../utils/const";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LeftSidebar = observer(() => {
    const {user} = useContext(Context)
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
                                        <i className="fe-user-check"></i>
                                        <span className="badge bg-success rounded-pill float-end">15</span>
                                        <span> Obchodní zástupce </span>
                                    </a>
                                </li>
                                <li>
                                    <a href={MANAGER_ROUTE}>
                                        <i className="fe-user-plus"></i>
                                        <span className="badge bg-success rounded-pill float-end">5</span>
                                        <span> Manažery </span>
                                    </a>
                                </li>
                                <li>
                                    <a aria-expanded={true} href="#sidebarDashboards" data-bs-toggle="collapse">
                                        <i className="fe-user"></i>
                                        <span> Kontakty </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarDashboards">
                                        <ul className="nav-second-level">
                                            <li>
                                                <a href={CONTACTS_ROUTE}>Kontakty</a>
                                            </li>
                                            <li>
                                                <a href={LEAD_ROUTE}>Leady</a>
                                            </li>
                                            <li>
                                                <a href={POTENTIAL_ROUTE}>Přiležitosti</a>
                                            </li>
                                            <li>
                                                <a href={CURRENT_ROUTE}>Stávající klienty</a>
                                            </li>
                                            <li>
                                                <a href={ACCEPTED_ROUTE}>Příhlášení klienty</a>
                                            </li>
                                            <li>
                                                <a href={EDR_ROUTE}>EDR členy</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="menu-title">Watt Peneženka</li>
                                <li>
                                    <a href={WATT_ROUTE}>
                                        <i className="fe-credit-card"></i>
                                        <span> Watt Peneženka </span>
                                    </a>
                                </li>


                                <li className="menu-title">Email</li>
                                <li>
                                    <a href="#emailBar" data-bs-toggle="collapse">
                                        <i className="fe-mail"></i>
                                        <span> Email </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse" id="emailBar">
                                        <ul className="nav-second-level">
                                            <li>
                                                <a href={INBOX_ROUTE}>Příchozí</a>
                                            </li>
                                            <li>
                                                <a href={SENT_ROUTE}>Odeslané</a>
                                            </li>
                                            <li>
                                                <a href={WRITE_ROUTE}>Odeslat nový email</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="menu-title">Faktury</li>
                                <li>
                                    <a href={FACTURE_ROUTE}>
                                        <i className="fe-credit-card"></i>
                                        <span> Vygenerované faktury </span>
                                    </a>
                                </li>

                                <li className="menu-title">Admin</li>
                                <li>
                                    <a href="#adminBar" data-bs-toggle="collapse">
                                        <i className="fe-unlock "></i>
                                        <span> Admin bar </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse" id="adminBar">
                                        <ul className="nav-second-level">
                                            <li>
                                                <a href={CONTACTS_ROUTE}>Vytvořit obchodního zástupce</a>
                                            </li>
                                            <li>
                                                <a href={LEAD_ROUTE}>Vytvořit manažera</a>
                                            </li>
                                            <li>
                                                <a href={POTENTIAL_ROUTE}>Vytvořit klientský účet</a>
                                            </li>
                                            <li>
                                                <a href={CURRENT_ROUTE}>Nastavení tipů upozornění</a>
                                            </li>
                                            <li>
                                                <a href={ACCEPTED_ROUTE}>Nastavení Watt peněženky</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>


                            </ul>

                        </div>

                        <div className="clearfix"></div>

                    </div>
                        : <div></div>}
                </div>
    );
});

export default LeftSidebar;