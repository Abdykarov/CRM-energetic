/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import HeaderItem from "../component/items/HeaderItem";
import Footer from "../component/Footer";
import PaginationItem from "../component/items/PaginationItem";
import {fetchInbox} from "../http/mailAPI";
import {fetchNotifications} from "../http/notificationAPI";
import NotificationTable from "../component/tables/NotificationTable";

const NotificationPage = () => {
    const {notification} = useContext(Context)
    useEffect(() => {

        fetchNotifications().then(data => {
            console.log(data)
            notification.setNotifications(data)
        })
    }, [])
    return (
        <div>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <HeaderItem title="Notifikace"/>


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">

                                        <div className="table-responsive">
                                            <table className="table table-centered table-nowrap table-striped"
                                                   id="products-datatable">
                                                <thead>
                                                <tr>
                                                    <th>Text</th>
                                                    <th>Typ notifikace</th>
                                                    <th>Datum vytvoření</th>
                                                </tr>
                                                </thead>
                                                <NotificationTable></NotificationTable>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <Footer></Footer>
            </div>
        </div>
    );
};

export default NotificationPage;