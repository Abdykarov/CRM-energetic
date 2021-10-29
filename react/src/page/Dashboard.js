/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {CONTACT_PROFILE_ROUTE} from "../utils/const";
import Footer from "../component/Footer";
import {Context} from "../index";
import $ from 'jquery';
import {fetchLastContracts, fetchLastLeads, fetchLeads} from "../http/contactAPI";
import LeadTable from "../component/tables/LeadTable";
import SuperContractTable from "../component/tables/SuperContractTable";

const Dashboard = () => {
    const {user} = useContext(Context)
    const {lead} = useContext(Context)
    const {leadContract} = useContext(Context)

    useEffect(() => {
        fetchLastLeads().then(data => {
            lead.setContacts(data)
            console.log(data)
        })
        fetchLastContracts().then(data => {
            leadContract.setContacts(data)
            console.log(data)
        })
    }, [])
    return (
        <div>
            {
            user.role === "ROLE_EDR" ?
                <div className="watt_main">
                    <div className="watt_header">
                        <div className="watt_container">
                            <h3>hlavní stranka</h3>
                            <h1>Bonusový program <span>Watt peněženka</span></h1>
                            <div className="watt_points_block">
                                <div className="watt_points_title">
                                    VAŠE - <b>WATT PENĚŽENKA</b>
                                </div>
                                <div className="watt_points">
                                    <p><img src="" alt=""/> 1236 bodů = 1236,-KČ</p>
                                </div>
                                <div className="watt_points_text">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. tempora veritatis. Esse impedit laudantium libero modi necessitatibus!</p>
                                </div>
                                <button type="button" className="get_points">ZÍSKAT BODY</button>
                                <button type="button">UPLATNIT BODY</button>
                            </div>
                        </div>
                    </div>
                    <div className="watt_content">
                       <div className="watt_content_wrapper">
                           <div className="row">
                               <div className="col-md-6">
                                    <div id="target">
                                        <iframe className="embed" src="https://www.kurzy.cz/komodity/cena-elektriny-graf-vyvoje-ceny/1MWh-eur-3-mesice#svg_chart" scrolling="no" width="100%" height="100%" align="center" ></iframe>
                                    </div>
                              </div>
                               <div className="col-md-6">
                                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium blanditiis cumque doloribus eveniet ex itaque maxime nemo nulla optio, placeat quis saepe sed soluta, sunt? Dolores incidunt inventore quam!
                               </div>
                               <div className="col-md-6">
                                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium blanditiis cumque doloribus eveniet ex itaque maxime nemo nulla optio, placeat quis saepe sed soluta, sunt? Dolores incidunt inventore quam!
                               </div>
                               <div className="col-md-6">
                                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium blanditiis cumque doloribus eveniet ex itaque maxime nemo nulla optio, placeat quis saepe sed soluta, sunt? Dolores incidunt inventore quam!
                               </div>
                           </div>
                       </div>
                    </div>
                    <div className="watt_footer">
                        <div>
                            <p>Developed by <a href="#">Karlin IT Group</a></p>
                        </div>
                        <div>
                            <a href="#">crm.cz</a>
                        </div>
                        <div>
                            <a href="#">GDPR</a>
                        </div>
                    </div>
                </div>
                :
                <div className="content-page">
                    <div className="content">

                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
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

                            <div className="row">
                                <div className="latest-leads col-xl-6">
                                    <h4 className="header-title mb-3">Poslední 10 leadů</h4>
                                    <div className="table-responsive">
                                        <table className="table table-centered table-nowrap table-striped"
                                               id="products-datatable">
                                            <thead>
                                            <tr>
                                                <th style={{width : '20px'}}>
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input"
                                                               id="customCheck1" />
                                                        <label className="form-check-label"
                                                               htmlFor="customCheck1">&nbsp;</label>
                                                    </div>
                                                </th>
                                                <th>Kontakt</th>
                                                <th>Jméno</th>
                                                <th>Příjmení</th>
                                                <th>Pohlaví</th>
                                                <th>Telefon</th>
                                                <th>Email</th>
                                                <th>Stav</th>
                                                <th>Obchodní zástupce</th>
                                                <th>Kontaktní osoba</th>
                                                <th>Kraj</th>
                                                <th>PSČ</th>
                                                <th>Kampaň</th>
                                                <th>Nainstalovaná FVE od Solid Sun</th>
                                                <th>Supersmlouva/Dílčí supersmlouva</th>
                                                <th style={{width: '85px'}}>Osobní Stranka</th>
                                            </tr>
                                            </thead>
                                            <LeadTable></LeadTable>
                                        </table>
                                    </div>
                                </div>
                                <div className="latest-leads col-xl-6">
                                    <h4 className="header-title mb-3">Poslední 10 podepsaných smlouv</h4>
                                    <div className="table-responsive">
                                        <table className="table table-centered table-nowrap table-striped"
                                               id="products-datatable">
                                            <thead>
                                            <tr>

                                                <th>Lead</th>
                                                <th>Datum podepsaní</th>
                                                <th>Typ smlouvy</th>
                                                <th style={{width: '85px'}}>Osobní Stranka</th>
                                            </tr>
                                            </thead>
                                            <SuperContractTable></SuperContractTable>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Footer></Footer>

                </div>
        }
        </div>

    );
};

export default Dashboard;