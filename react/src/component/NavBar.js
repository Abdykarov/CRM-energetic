import React, {useContext, useEffect} from 'react';
import {Navbar} from "react-bootstrap";
import {Context} from "../index";
import {CONTACT_PROFILE_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";
import {login} from "../http/userAPI";
import {useHistory} from "react-router-dom";
import {fetchContacts, fetchUserByUsername} from "../http/contactAPI";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    useEffect(() => {
        fetchUserByUsername(user.username).then(data => {
            user.setUser(data)
            user.setId(data.id)
        })
    }, [])
    const click = async () => {
        localStorage.removeItem('token')
        window.location.reload();
    }
    return (
        <Navbar>
            {user.isAuth ?

                <div className="navbar-custom">
                    <div className="container-fluid">

                        <ul className="list-unstyled topnav-menu float-end mb-0">

                            <li className="dropdown notification-list topbar-dropdown">
                                <a className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light"
                                   data-bs-toggle="dropdown" href onClick={(e) => {e.preventDefault();}} role="button" aria-haspopup="false"
                                   aria-expanded="false">
                                    <img src="/images/users/user-1.jpg" alt="userimg"
                                         className="rounded-circle"/>
                                    <span className="pro-user-name ms-1">
                        {user.username} <i className="mdi mdi-chevron-down"></i>
                    </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end profile-dropdown ">

                                    <div className="dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Dobrý den {user.username} !</h6>
                                    </div>

                                    <a href={CONTACT_PROFILE_ROUTE + '/'+ user.id} className="dropdown-item notify-item">
                                        <i className="fe-user"></i>
                                        <span>Osobní stranka</span>
                                    </a>

                                    <div className="dropdown-divider"></div>

                                    <a href onClick={click} className="dropdown-item notify-item">
                                        <i className="fe-log-out"></i>
                                        <span>Odhlasit se</span>
                                    </a>

                                </div>
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

                        <div className="clearfix"></div>
                    </div>
                </div>
            : <div></div>
            }
        </Navbar>
    );
});

export default NavBar;