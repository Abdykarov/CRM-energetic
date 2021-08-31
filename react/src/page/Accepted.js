/* eslint-disable */
import React from 'react';

const Accepted = () => {
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
                                            <li className="breadcrumb-item"><a href="#">UBold</a></li>
                                            <li className="breadcrumb-item"><a href="#">CRM</a></li>
                                            <li className="breadcrumb-item active">Stavající klienty</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Stavající klienty</h4>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-4">
                                                <button type="button" className="btn btn-danger waves-effect waves-light"
                                                        data-bs-toggle="modal" data-bs-target="#custom-modal"><i
                                                    className="mdi mdi-plus-circle me-1"></i> Add Customers
                                                </button>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="text-sm-end mt-2 mt-sm-0">
                                                    <button type="button" className="btn btn-success mb-2 me-1"><i
                                                        className="mdi mdi-cog"></i></button>
                                                    <button type="button" className="btn btn-light mb-2 me-1">Import
                                                    </button>
                                                    <button type="button" className="btn btn-light mb-2">Export</button>
                                                </div>
                                            </div>
                                        </div>

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
                                                    <th>Id</th>
                                                    <th>Jméno</th>
                                                    <th>Příjmení</th>
                                                    <th>Telefon</th>
                                                    <th>Email</th>
                                                    <th>Stav</th>
                                                    <th>Obchodní zástupce</th>
                                                    <th>Název společnosti</th>
                                                    <th>Pracovní pozice</th>
                                                    <th>Město</th>
                                                    <th>PSČ</th>
                                                    <th>FO/PO</th>
                                                    <th>Vygenerovaná přihláška</th>
                                                    <th>Vyhodnocená přihláška</th>
                                                    <th>Vygenerovaná smlouva</th>
                                                    <th>Zaplacená faktura</th>
                                                    <th>Odeslané potvrzení o platbě</th>
                                                    <th style={{width: '85px'}}>Action</th>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
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
                                                        <a href="javascript:void(0);" className="text-body fw-semibold">Simon Blumel</a>
                                                    </td>
                                                    <td>
                                                        12
                                                    </td>
                                                    <td>
                                                        Simin
                                                    </td>
                                                    <td>
                                                        Blumel
                                                    </td>
                                                    <td>
                                                        +420792254131
                                                    </td>
                                                    <td>simon.blumel@gmail.com</td>
                                                    <td>
                                                        <span className="badge bg-soft-success text-success">Příležitost</span>
                                                    </td>
                                                    <td>
                                                        Matěj Pošta
                                                    </td>
                                                    <td>
                                                        Skynet s.r.o
                                                    </td>
                                                    <td>
                                                        Manažer
                                                    </td>
                                                    <td>
                                                        Praha
                                                    </td>
                                                    <td>169 00</td>
                                                    <td>Fyzická osoba</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ano</td>
                                                    <td>Ne</td>
                                                    <td>Ne</td>
                                                    <td>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-square-edit-outline"></i></a>
                                                        <a href="javascript:void(0);" className="action-icon"> <i
                                                            className="mdi mdi-delete"></i></a>
                                                    </td>
                                                </tr>


                                                </tbody>
                                            </table>
                                        </div>

                                        <ul className="pagination pagination-rounded justify-content-end mb-0">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">«</span>
                                                    <span className="visually-hidden">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link"
                                                                                href="#">1</a></li>
                                            <li className="page-item"><a className="page-link"
                                                                         href="#">2</a></li>
                                            <li className="page-item"><a className="page-link"
                                                                         href="#">3</a></li>
                                            <li className="page-item"><a className="page-link"
                                                                         href="#">4</a></li>
                                            <li className="page-item"><a className="page-link"
                                                                         href="#">5</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">»</span>
                                                    <span className="visually-hidden">Next</span>
                                                </a>
                                            </li>
                                        </ul>

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

export default Accepted;