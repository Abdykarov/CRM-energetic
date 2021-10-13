/* eslint-disable */
import React from 'react';
import {CONTACT_PROFILE_ROUTE} from "../utils/const";
import Footer from "../component/Footer";

const Dashboard = () => {
    return (
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
                                        <th>Telefon</th>
                                        <th>Email</th>
                                        <th>Stav</th>
                                        <th>Obchodní zástupce</th>
                                        <th>Kontaktní osoba</th>
                                        <th>Město</th>
                                        <th>Kraj</th>
                                        <th>Kampaň</th>
                                        <th>Nainstalovaná FVE od Solid Sun</th>
                                        <th>Supersmlouva</th>
                                        <th>Dílčí supersmlouva</th>
                                        <th style={{width: '85px'}}>Osobní Stranka</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">&nbsp;</label>
                                            </div>
                                        </td>
                                        <td className="table-user">
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Ilias</a>
                                        </td>
                                        <td>
                                            Ilias
                                        </td>
                                        <td>
                                            Abdykarov
                                        </td>
                                        <td>
                                            123232323
                                        </td>
                                        <td>
                                            n13wka@gmail.com
                                        </td>
                                        <td>
                                            <span className="badge bg-soft-success text-success">LEAD</span>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold"> Petr Olsak</a>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Vladimir Sykora</a>
                                        </td>
                                        <td>
                                            Praha
                                        </td>
                                        <td>
                                            Praha 6
                                        </td>
                                        <td>
                                            Kampan
                                        </td>
                                        <td>
                                            Ano
                                        </td>
                                        <td>
                                            Potřebuje dílčí supersmlouvu
                                        </td>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck1" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck1">vygenerovaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">odeslaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">podepsaný dodatek</label>
                                            </div>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/'+ 1} className="action-icon">
                                                <img width="30px" src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt=""/></a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">&nbsp;</label>
                                            </div>
                                        </td>
                                        <td className="table-user">
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Ilias</a>
                                        </td>
                                        <td>
                                            Ilias
                                        </td>
                                        <td>
                                            Abdykarov
                                        </td>
                                        <td>
                                            123232323
                                        </td>
                                        <td>
                                            n13wka@gmail.com
                                        </td>
                                        <td>
                                            <span className="badge bg-soft-success text-success">LEAD</span>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold"> Petr Olsak</a>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Vladimir Sykora</a>
                                        </td>
                                        <td>
                                            Praha
                                        </td>
                                        <td>
                                            Praha 6
                                        </td>
                                        <td>
                                            Kampan
                                        </td>
                                        <td>
                                            Ano
                                        </td>
                                        <td>
                                            Potřebuje dílčí supersmlouvu
                                        </td>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck1" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck1">vygenerovaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">odeslaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">podepsaný dodatek</label>
                                            </div>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/'+ 1} className="action-icon">
                                                <img width="30px" src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt=""/></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">&nbsp;</label>
                                            </div>
                                        </td>
                                        <td className="table-user">
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Ilias</a>
                                        </td>
                                        <td>
                                            Ilias
                                        </td>
                                        <td>
                                            Abdykarov
                                        </td>
                                        <td>
                                            123232323
                                        </td>
                                        <td>
                                            n13wka@gmail.com
                                        </td>
                                        <td>
                                            <span className="badge bg-soft-success text-success">LEAD</span>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold"> Petr Olsak</a>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Vladimir Sykora</a>
                                        </td>
                                        <td>
                                            Praha
                                        </td>
                                        <td>
                                            Praha 6
                                        </td>
                                        <td>
                                            Kampan
                                        </td>
                                        <td>
                                            Ano
                                        </td>
                                        <td>
                                            Potřebuje dílčí supersmlouvu
                                        </td>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck1" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck1">vygenerovaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">odeslaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">podepsaný dodatek</label>
                                            </div>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/'+ 1} className="action-icon">
                                                <img width="30px" src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt=""/></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">&nbsp;</label>
                                            </div>
                                        </td>
                                        <td className="table-user">
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Ilias</a>
                                        </td>
                                        <td>
                                            Ilias
                                        </td>
                                        <td>
                                            Abdykarov
                                        </td>
                                        <td>
                                            123232323
                                        </td>
                                        <td>
                                            n13wka@gmail.com
                                        </td>
                                        <td>
                                            <span className="badge bg-soft-success text-success">LEAD</span>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold"> Petr Olsak</a>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Vladimir Sykora</a>
                                        </td>
                                        <td>
                                            Praha
                                        </td>
                                        <td>
                                            Praha 6
                                        </td>
                                        <td>
                                            Kampan
                                        </td>
                                        <td>
                                            Ano
                                        </td>
                                        <td>
                                            Potřebuje dílčí supersmlouvu
                                        </td>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck1" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck1">vygenerovaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">odeslaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">podepsaný dodatek</label>
                                            </div>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/'+ 1} className="action-icon">
                                                <img width="30px" src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt=""/></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">&nbsp;</label>
                                            </div>
                                        </td>
                                        <td className="table-user">
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Ilias</a>
                                        </td>
                                        <td>
                                            Ilias
                                        </td>
                                        <td>
                                            Abdykarov
                                        </td>
                                        <td>
                                            123232323
                                        </td>
                                        <td>
                                            n13wka@gmail.com
                                        </td>
                                        <td>
                                            <span className="badge bg-soft-success text-success">LEAD</span>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold"> Petr Olsak</a>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Vladimir Sykora</a>
                                        </td>
                                        <td>
                                            Praha
                                        </td>
                                        <td>
                                            Praha 6
                                        </td>
                                        <td>
                                            Kampan
                                        </td>
                                        <td>
                                            Ano
                                        </td>
                                        <td>
                                            Potřebuje dílčí supersmlouvu
                                        </td>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck1" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck1">vygenerovaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">odeslaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">podepsaný dodatek</label>
                                            </div>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/'+ 1} className="action-icon">
                                                <img width="30px" src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt=""/></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">&nbsp;</label>
                                            </div>
                                        </td>
                                        <td className="table-user">
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Ilias</a>
                                        </td>
                                        <td>
                                            Ilias
                                        </td>
                                        <td>
                                            Abdykarov
                                        </td>
                                        <td>
                                            123232323
                                        </td>
                                        <td>
                                            n13wka@gmail.com
                                        </td>
                                        <td>
                                            <span className="badge bg-soft-success text-success">LEAD</span>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold"> Petr Olsak</a>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Vladimir Sykora</a>
                                        </td>
                                        <td>
                                            Praha
                                        </td>
                                        <td>
                                            Praha 6
                                        </td>
                                        <td>
                                            Kampan
                                        </td>
                                        <td>
                                            Ne
                                        </td>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck1" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck1">vygenerovaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">odeslaný dodatek</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="customCheck2" />
                                                <label className="form-check-label"
                                                       htmlFor="customCheck2">podepsaný dodatek</label>
                                            </div>
                                        </td>
                                        <td>
                                            Nepotřebuje dílčí supersmlouvu
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/'+ 1} className="action-icon">
                                                <img width="30px" src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt=""/></a>
                                        </td>
                                    </tr>
                                    </tbody>
                                    {/*<LeadTable></LeadTable>*/}
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

                                        <th>Datum podepsaní</th>
                                        <th>Typ smlouvy</th>
                                        <th>Lead</th>

                                        <th style={{width: '85px'}}>Osobní Stranka</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>

                                        <td>
                                            22.09.2021
                                        </td>
                                        <td>
                                            Supersmlouva
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/' + 1} className="text-body fw-semibold">Ilias Abdzykarov</a>
                                        </td>
                                        <td>
                                            <a href={CONTACT_PROFILE_ROUTE + '/'+ 1} className="action-icon">
                                                <img width="30px" src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt=""/></a>
                                        </td>
                                    </tr>
                                    </tbody>
                                    {/*<LeadTable></LeadTable>*/}
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer></Footer>

        </div>
    );
};

export default Dashboard;