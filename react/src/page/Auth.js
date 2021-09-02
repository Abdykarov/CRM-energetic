/* eslint-disable */
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {Context} from "../index";
import {login} from "../http/userAPI";
import {DASHBOARD_ROUTE} from "../utils/const";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            data = await login(username, password);
            user.setUser(user)
            user.setIsAuth(true)
            history.push(DASHBOARD_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
            <div className="auth-fluid">
            <div className="auth-fluid-form-box">
                <div className="align-items-center d-flex h-100">
                    <div className="card-body">
                         <span className="logo-lg">
                            <img src="/images/logoEDR.png" alt="" width={250}/>
                        </span>
                        <h4 className="mt-6">Přihlásit</h4>
                        <p className="text-muted mb-4">Pro přístup k účtu zadejte svou e-mailovou adresu a heslo.</p>

                        <Form>
                            <div className="mb-3">
                                <label htmlFor="emailaddress" className="form-label">Username</label>
                                <Form.Control className="form-control" value={username} onChange={e => setUsername(e.target.value)} type="text" id="emailaddress" required=""
                                       placeholder="Enter your email" />
                            </div>
                            <div className="mb-3">
                                <a href="auth-recoverpw-2.html" className="text-muted float-end"><small>Zapomněli jste své héslo?</small></a>
                                <label htmlFor="password" className="form-label">Héslo</label>
                                <div className="input-group input-group-merge">
                                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" className="form-control"
                                           placeholder="Enter your password" />
                                        <div className="input-group-text" data-password="false">
                                            <span className="password-eye"></span>
                                        </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                                        <label className="form-check-label" htmlFor="checkbox-signin">Zapamatovat mě</label>
                                </div>
                            </div>
                            <div className="text-center d-grid">
                                <Button onClick={click} className="btn btn-primary">Přihlasit</Button>
                            </div>

                        </Form>

                    </div>
                </div>
            </div>

            <div className="auth-fluid-right text-center">
                <div className="auth-user-testimonial">
                    <h2 className="mb-3 text-white">Vytvořme spolu největší FVE v Česku</h2>
                    <p className="lead">
                        a urychleme dosažení uhlíkové neutrality
                    </p>
                    <h5 className="text-white">
                        Stante se členem EDR!
                    </h5>
                </div>
            </div>
        </div>
    );
});

export default Auth;