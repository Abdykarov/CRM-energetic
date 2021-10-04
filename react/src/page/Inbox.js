/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {fetchAdminCoint} from "../http/contactAPI";
import {Context} from "../index";
import {fetchInbox, fetchInboxCrm} from "../http/mailAPI";
import {observer} from "mobx-react-lite";
import EdrItem from "../component/items/EdrItem";

const Inbox = observer(() => {

    const {user} = useContext(Context)
    const {mail} = useContext(Context)


    useEffect(() => {

        fetchInbox().then(data => {
            console.log(data)
            mail.setMails(data)
        })
    }, [])

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

                                        <div className="col-12">

                                            <div className="mt-3">
                                                <ul className="message-list">
                                                    {
                                                        mail.mails.length === 0 ?
                                                            <h3>Prazdné pole</h3>
                                                            :
                                                            mail.mails.map(item =>
                                                                <li className="unread">
                                                                    <div className="col-mail col-mail-1">
                                                                <span
                                                                    className="star-toggle far fa-star text-warning"></span>
                                                                        <a href="" className="title">{item.emailFrom}</a>
                                                                    </div>
                                                                    <div className="col-mail col-mail-2">
                                                                        <a href="" className="subject">{item.subject}&nbsp;&ndash;&nbsp;
                                                                            <span className="teaser">{item.body.substring(0, 60)}</span>
                                                                        </a>
                                                                        <div className="date">{item.emailDate.substring(0,10)}</div>
                                                                    </div>
                                                                </li>
                                                            )
                                                    }
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

            </div>
        </div>
    );
});

export default Inbox;