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
                        <h4 className="mt-0">Sign In</h4>
                        <p className="text-muted mb-4">Enter your email address and password to access account.</p>

                        <Form>
                            <div className="mb-3">
                                <label htmlFor="emailaddress" className="form-label">Username</label>
                                <Form.Control className="form-control" value={username} onChange={e => setUsername(e.target.value)} type="text" id="emailaddress" required=""
                                       placeholder="Enter your email" />
                            </div>
                            <div className="mb-3">
                                <a href="auth-recoverpw-2.html" className="text-muted float-end"><small>Forgot your
                                    password?</small></a>
                                <label htmlFor="password" className="form-label">Password</label>
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
                                        <label className="form-check-label" htmlFor="checkbox-signin">Remember
                                            me</label>
                                </div>
                            </div>
                            <div className="text-center d-grid">
                                <Button onClick={click} className="btn btn-primary">Log In</Button>
                            </div>

                        </Form>

                    </div>
                </div>
            </div>

            <div className="auth-fluid-right text-center">
                <div className="auth-user-testimonial">
                    <h2 className="mb-3 text-white">I love the color!</h2>
                    <p className="lead"><i className="mdi mdi-format-quote-open"></i> I've been using your theme from
                        the previous developer for our web app, once I knew new version is out, I immediately bought
                        with no hesitation. Great themes, good documentation with lots of customization available and
                        sample app that really fit our need. <i className="mdi mdi-format-quote-close"></i>
                    </p>
                    <h5 className="text-white">
                        - Fadlisaad (Ubold Admin User)
                    </h5>
                </div>
            </div>
        </div>
    );
});

export default Auth;