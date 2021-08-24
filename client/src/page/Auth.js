import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {DASHBOARD_ROUTE} from "../utils/const";

const Auth = observer(() => {
    const {user} = useContext(Context);
    let history = useHistory()
    const auth = async () => {
        user.setUser(user)
        user.setIsAuth(true)
        localStorage.setItem('user', user.user())
        history.push(DASHBOARD_ROUTE)
    }
    return (
            <div className="auth-fluid">
            <div className="auth-fluid-form-box">
                <div className="align-items-center d-flex h-100">
                    <div className="card-body">
                        <h4 className="mt-0">Sign In</h4>
                        <p className="text-muted mb-4">Enter your email address and password to access account.</p>

                        <form action="#">
                            <div className="mb-3">
                                <label htmlFor="emailaddress" className="form-label">Email address</label>
                                <input className="form-control" type="email" id="emailaddress" required=""
                                       placeholder="Enter your email" />
                            </div>
                            <div className="mb-3">
                                <a href="auth-recoverpw-2.html" className="text-muted float-end"><small>Forgot your
                                    password?</small></a>
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group input-group-merge">
                                    <input type="password" id="password" className="form-control"
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
                                <button onClick={auth} className="btn btn-primary" type="submit">Log In</button>
                            </div>

                        </form>

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