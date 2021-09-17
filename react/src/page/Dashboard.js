/* eslint-disable */
import React from 'react';

const Dashboard = () => {
    return (
        <div className="content-page">
            <div className="content">

                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">UBold</a></li>
                                        <li className="breadcrumb-item"><a href="#">CRM</a></li>
                                        <li className="breadcrumb-item active">Nástěnka</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">Nástěnka</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control chat-input" placeholder="Vyhledat kontakt"
                                   required="" />
                                <div className="invalid-feedback">
                                    Vyhledat kontakt
                                </div>
                        </div>
                        <div className="col-auto">
                            <button type="submit"
                                    className="btn btn-danger chat-send waves-effect waves-light w-100">Najít
                            </button>
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
    );
};

export default Dashboard;