import React, {useContext, useState} from 'react';
import {CONTACT_PROFILE_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {useHistory, useParams} from "react-router-dom";
import {edrRegistrate, login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getFilteredFactures} from "../http/factureAPI";

const EdrRegistration = observer(() => {
    const history = useHistory()
    const {edrLink} = useParams()
    const {user} = useContext(Context)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const edr_registrate = async () => {
        try {
            let response
            response = await edrRegistrate(edrLink,username, password);
            history.push(LOGIN_ROUTE)
        } catch (e) {
            alert(e)
        }
    }

    return (
           <div>
                {
                !user.isAuth  ?
                <div className="edr_create">
                    <header>
                        <div className="navbar-custom">
                            <div className="container-fluid">

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

                    </header>
                    <div className="edr_create_main">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h4 className="mb-3 header-title">Zadejte username a héslo pro vstup do systému</h4>

                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input type="text" value={username} onChange={e => setUsername(e.target.value)}  className="form-control" id="exampleInputEmail1"
                                                   aria-describedby="emailHelp" placeholder="Enter username" />
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                                anyone else.</small>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Heslo</label>
                                            <input type="password" value={password} onChange={e => setPassword(e.target.value)}  className="form-control" id="exampleInputPassword1"
                                                   placeholder="Password" />
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="checkmeout0" />
                                                <label className="form-check-label" htmlFor="checkmeout0">Check me out !</label>
                                            </div>
                                        </div>
                                        <button onClick={edr_registrate} type="button" className="btn btn-primary waves-effect waves-light">Submit</button>
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                : ""
        }

           </div>

    );
});

export default EdrRegistration;