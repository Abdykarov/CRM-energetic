/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {fetchAdminCoint} from "../http/contactAPI";
import {Context} from "../index";
import {fetchInbox, fetchInboxCrm} from "../http/mailAPI";
import {observer} from "mobx-react-lite";
import EdrItem from "../component/items/EdrItem";
import HeaderItem from "../component/items/HeaderItem";
import Footer from "../component/Footer";

const Inbox = observer(() => {

    const {user} = useContext(Context)
    const {mail} = useContext(Context)

    useEffect(() => {

        fetchInbox().then(data => {
            console.log(data)
            mail.setMails(data)
        })
    }, [])

    const openEmailText = async (text) => {
        document.querySelector('.modal-body').innerHTML = text;
        document.getElementById("email-modal").classList.add("show");
    }

    const closeEmailText = async () => {
        document.getElementById("email-modal").classList.remove("show");
    }

    return (
        <div>
            <div className="modal fade" id="email-modal" tabIndex="-1" aria-labelledby="scrollableModalTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="scrollableModalTitle">Email text</h5>
                            <button onClick={closeEmailText} type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeEmailText} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-page">
                <div className="content">

                    <div className="container-fluid">

                        <HeaderItem title="Příchozí maily"/>



                        <div className="row">

                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">

                                        <div className="col-12">

                                            <div className="mt-3">
                                                <ul className="message-list">
                                                    <li>
                                                        <div className="col-mail col-mail-1"><span
                                                            className="mail_icon"></span><a href="#"
                                                                                                        className="title">Odkud</a>
                                                        </div>
                                                        <div className="col-mail col-mail-2"><a href="#"
                                                                                                className="subject">Textová zpráva</a>
                                                            <div className="date">Dátum</div>
                                                        </div>
                                                    </li>
                                                    {
                                                        mail.mails.length === 0 ?
                                                            <h3>Prazdné pole</h3>
                                                            :
                                                            mail.mails.map(item =>
                                                                <li className="unread">
                                                                    <div className="col-mail col-mail-1">
                                                                <span className="mail_icon"><img src="/images/gmail.png" alt=""/></span>
                                                                        <a href="#" onClick={() => openEmailText(item.body)} className="title">{item.emailFrom}</a>
                                                                    </div>
                                                                    <div className="col-mail col-mail-2">
                                                                        <a key={item.id}
                                                                           onClick={() => openEmailText(item.body)} href="#" className="subject">{item.subject}&nbsp;&ndash;&nbsp;
                                                                            <span className="teaser">{item.body.substring(0, 60)}</span>
                                                                        </a>
                                                                        <div className="date">{item.emailDate}</div>
                                                                    </div>
                                                                </li>
                                                            )
                                                    }
                                                </ul>
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
            <Footer></Footer>
        </div>
    );
});

export default Inbox;