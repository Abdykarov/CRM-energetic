/* eslint-disable */
import React from 'react';

const Inbox = () => {
    return (
        <div>
            <div className="content-page">
                <div className="content">

                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">UBold</a>
                                            </li>
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Email</a>
                                            </li>
                                            <li className="breadcrumb-item active">Příchozí maily</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Příchozí maily</h4>
                                </div>
                            </div>
                        </div>


                        <div className="row">

                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="inbox-leftbar">

                                            <a href="email-compose.html"
                                               className="btn btn-danger w-100 waves-effect waves-light">Napsat mail</a>

                                            <div className="mail-list mt-4">
                                                <a href="javascript: void(0);" className="text-danger fw-bold"><i
                                                    className="dripicons-inbox me-2"></i>Inbox<span
                                                    className="badge badge-soft-danger float-end ms-2">7</span></a>
                                                <a href="javascript: void(0);"><i className="dripicons-exit me-2"></i>Sent
                                                    Mail</a>
                                            </div>

                                        </div>

                                        <div className="inbox-rightbar">

                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-light waves-effect"><i
                                                    className="mdi mdi-archive font-18"></i></button>
                                                <button type="button" className="btn btn-sm btn-light waves-effect"><i
                                                    className="mdi mdi-alert-octagon font-18"></i></button>
                                                <button type="button" className="btn btn-sm btn-light waves-effect"><i
                                                    className="mdi mdi-delete-variant font-18"></i></button>
                                            </div>
                                            <div className="btn-group">
                                                <button type="button"
                                                        className="btn btn-sm btn-light dropdown-toggle waves-effect"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="mdi mdi-folder font-18"></i>
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <span className="dropdown-header">Move to</span>
                                                    <a className="dropdown-item" href="javascript: void(0);">Social</a>
                                                    <a className="dropdown-item"
                                                       href="javascript: void(0);">Promotions</a>
                                                    <a className="dropdown-item" href="javascript: void(0);">Updates</a>
                                                    <a className="dropdown-item" href="javascript: void(0);">Forums</a>
                                                </div>
                                            </div>
                                            <div className="btn-group">
                                                <button type="button"
                                                        className="btn btn-sm btn-light dropdown-toggle waves-effect"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="mdi mdi-label font-18"></i>
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <span className="dropdown-header">Label as:</span>
                                                    <a className="dropdown-item" href="javascript: void(0);">Updates</a>
                                                    <a className="dropdown-item" href="javascript: void(0);">Social</a>
                                                    <a className="dropdown-item"
                                                       href="javascript: void(0);">Promotions</a>
                                                    <a className="dropdown-item" href="javascript: void(0);">Forums</a>
                                                </div>
                                            </div>

                                            <div className="btn-group">
                                                <button type="button"
                                                        className="btn btn-sm btn-light dropdown-toggle waves-effect"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="mdi mdi-dots-horizontal font-18"></i> More
                                                    <i className="mdi mdi-chevron-down"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <span className="dropdown-header">More Option :</span>
                                                    <a className="dropdown-item" href="javascript: void(0);">Mark as
                                                        Unread</a>
                                                    <a className="dropdown-item" href="javascript: void(0);">Add to
                                                        Tasks</a>
                                                    <a className="dropdown-item" href="javascript: void(0);">Add
                                                        Star</a>
                                                    <a className="dropdown-item" href="javascript: void(0);">Mute</a>
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <ul className="message-list">
                                                    <li className="unread">
                                                        <div className="col-mail col-mail-1">
                                                            <div className="checkbox-wrapper-mail">
                                                                <input type="checkbox" id="chk1"/>
                                                                    <label htmlFor="chk1" className="toggle"></label>
                                                            </div>
                                                            <span
                                                                className="star-toggle far fa-star text-warning"></span>
                                                            <a href="" className="title">Lucas Kriebel (via Twitter)</a>
                                                        </div>
                                                        <div className="col-mail col-mail-2">
                                                            <a href="" className="subject">Lucas Kriebel (@LucasKriebel)
                                                                has sent
                                                                you a direct message on Twitter! &nbsp;&ndash;&nbsp;
                                                                <span className="teaser">@LucasKriebel - Very cool :) Nicklas, You have a new direct message.</span>
                                                            </a>
                                                            <div className="date">11:49 am</div>
                                                        </div>
                                                    </li>

                                                    <li className="unread">
                                                        <div className="col-mail col-mail-1">
                                                            <div className="checkbox-wrapper-mail">
                                                                <input type="checkbox" id="chk1"/>
                                                                <label htmlFor="chk1" className="toggle"></label>
                                                            </div>
                                                            <span
                                                                className="star-toggle far fa-star text-warning"></span>
                                                            <a href="" className="title">Lucas Kriebel (via Twitter)</a>
                                                        </div>
                                                        <div className="col-mail col-mail-2">
                                                            <a href="" className="subject">Lucas Kriebel (@LucasKriebel)
                                                                has sent
                                                                you a direct message on Twitter! &nbsp;&ndash;&nbsp;
                                                                <span className="teaser">@LucasKriebel - Very cool :) Nicklas, You have a new direct message.</span>
                                                            </a>
                                                            <div className="date">11:49 am</div>
                                                        </div>
                                                    </li>
                                                    <li className="unread">
                                                        <div className="col-mail col-mail-1">
                                                            <div className="checkbox-wrapper-mail">
                                                                <input type="checkbox" id="chk1"/>
                                                                <label htmlFor="chk1" className="toggle"></label>
                                                            </div>
                                                            <span
                                                                className="star-toggle far fa-star text-warning"></span>
                                                            <a href="" className="title">Lucas Kriebel (via Twitter)</a>
                                                        </div>
                                                        <div className="col-mail col-mail-2">
                                                            <a href="" className="subject">Lucas Kriebel (@LucasKriebel)
                                                                has sent
                                                                you a direct message on Twitter! &nbsp;&ndash;&nbsp;
                                                                <span className="teaser">@LucasKriebel - Very cool :) Nicklas, You have a new direct message.</span>
                                                            </a>
                                                            <div className="date">11:49 am</div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="row">
                                                <div className="col-7 mt-1">
                                                    Showing 1 - 20 of 289
                                                </div>
                                                <div className="col-5">
                                                    <div className="btn-group float-end">
                                                        <button type="button" className="btn btn-light btn-sm"><i
                                                            className="mdi mdi-chevron-left"></i></button>
                                                        <button type="button" className="btn btn-info btn-sm"><i
                                                            className="mdi mdi-chevron-right"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="clearfix"></div>
                                    </div>
                                </div>

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
        </div>
    );
};

export default Inbox;