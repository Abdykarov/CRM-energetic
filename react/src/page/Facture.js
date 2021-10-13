/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import FactureTable from "../component/tables/FactureTable";
import {Context} from "../index";
import {createAdmin, fetchLeads} from "../http/contactAPI";
import {fetchAllFactures, getFilteredFactures} from "../http/factureAPI";
import {ADMIN_ROUTE} from "../utils/const";
import HeaderItem from "../component/items/HeaderItem";
import Footer from "../component/Footer";
import PaginationItem from "../component/items/PaginationItem";

const Facture = () => {
    const {facture} = useContext(Context)
    const [search,setSearch] = useState('')
    const [factureState, setFactureState] = useState('all')
    const [filterAttr,setFilterAttr] = useState('id')
    const [sortAttr,setSortAttr] = useState('asc')
    useEffect(() => {
        fetchAllFactures().then(data => {
            facture.setFactures(data)
            console.log(data)
        })
    }, [])

    const filterFactures = async () => {
        try {
            let response
            response = await getFilteredFactures(search, factureState, filterAttr, sortAttr)
            facture.setFactures(response)
            console.log(response)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <HeaderItem title="Faktury"/>


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-3">
                                                <label htmlFor="inputPassword2">Vyhledat podle jména nebo příjmení</label>
                                                <div className="me-3 mt-2">
                                                    <input value={search} onChange={e => setSearch(e.target.value)} type="search" className="form-control my-1 my-md-0"
                                                           id="inputPassword2" placeholder="Vyhledat..."/>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="status-select" className="me-2">Stav faktury</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={factureState} onChange={e => setFactureState(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="all">Všechno</option>
                                                        <option value="generated">Generovaný</option>
                                                        <option value="paid">Zaplacený</option>
                                                        <option value="expired">Vypršení</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="status-select" className="me-2">Filtrovat podle</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={filterAttr} onChange={e => setFilterAttr(e.target.value)} className="form-select my-1 my-md-0" id="status-select">
                                                        <option value="id">Id</option>
                                                        <option value="name">Jméno</option>
                                                        <option value="surname">Příjmení</option>
                                                        <option value="var-symbol">Variabilní symbol</option>
                                                        <option value="created-at">Datum vytvoření</option>
                                                        <option value="due-date">Datum splatností</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="status-select" className="me-2">Sortovat</label>
                                                <div className="me-sm-3 mt-2">
                                                    <select value={sortAttr} onChange={e => setSortAttr(e.target.value)} className="form-select my-1 my-md-0">
                                                        <option value="asc">Vzestupně</option>
                                                        <option value="desc">Sestupně</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-9">

                                            </div>
                                            <div className="text-sm-end mt-2 mb-2 col-sm-3">
                                                <button type="button" onClick={filterFactures} className="btn btn-success waves-effect waves-light">Filtrovat</button>
                                            </div>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="table table-centered table-nowrap table-striped"
                                                   id="products-datatable">
                                                <thead>
                                                <tr>
                                                    <th>Jméno</th>
                                                    <th>Příjmení</th>
                                                    <th>Datum vytvoření</th>
                                                    <th>Datum splatností</th>
                                                    <th>Variabilní symbol</th>
                                                    <th>Částka</th>
                                                    <th>Stav faktury</th>
                                                    <th>Stahnout</th>
                                                    <th>Odstranit</th>
                                                </tr>
                                                </thead>
                                                <FactureTable></FactureTable>
                                            </table>
                                        </div>

                                        <PaginationItem></PaginationItem>

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

export default Facture;