import React from 'react';

const RegestrationReferal = () => {
    return (
        <div className="referal_registration">
            <header>
                <div className="navbar-custom">
                    <div className="container-fluid">

                        <div className="logo-box">
                            <a href="index.html" className="logo logo-dark text-center">
                <span className="logo-sm">
                    <img src="/images/logo-sm.png" alt="" height="22"/>

                </span>
                                <span className="logo-lg">
                    <img src="/images/logo-dark.png" alt="" height="20"/>
                </span>
                            </a>

                            <a href="/" className="logo logo-light text-center">
                <span className="logo-sm">
                    <img src="/images/logo-sm.png" alt="" height="22"/>
                </span>
                                <span className="logo-lg">
                    <img src="/images/logoEDR.png" alt="" width={200}/>
                </span>
                            </a>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>

            </header>
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
                                            <li className="breadcrumb-item active">Vytvořit klienta</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Kontaktní formulář</h4>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="nameInput" className="form-label">Jméno <span
                                                        className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="nameInput"
                                                           placeholder="Jméno" required/>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="surnameInput" className="form-label">Přijmení <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="surnameInput"
                                                           placeholder="Přijmení" required/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="phoneInput" className="form-label">Telefon <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="phoneInput"
                                                           placeholder="+420 123 123 123" required/>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="emailInput" className="form-label">Email <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="emailInput"
                                                           placeholder="Email" required />
                                                </div>

                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="salesmanInput" className="form-label">Obchodní zástupce</label>
                                                    <select id="salesmanInput" className="form-select">
                                                        <option>Choose</option>
                                                        <option>Option 1</option>
                                                        <option>Option 2</option>
                                                        <option>Option 3</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="example-readonly"
                                                           className="form-label">Stav</label>
                                                    <input type="text" id="example-readonly" className="form-control"
                                                           readOnly="" value="Nový kontakt" />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="companyInput" className="form-label">Název společnosti</label>
                                                    <input type="text" className="form-control" id="companyInput"
                                                           placeholder="Název společnosti" />
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="jobInput" className="form-label">Pracovní pozice</label>
                                                    <input type="text" className="form-control" id="jobInput"
                                                           placeholder="Pracovní pozice" />
                                                </div>


                                            </div>
                                            <div className="row">
                                                <div className="mb-3 col-md-8">
                                                    <label htmlFor="cityInput" className="form-label">Město</label>
                                                    <input type="text" className="form-control" id="cityInput"/>
                                                </div>
                                                <div className="mb-3 col-md-4">
                                                    <label htmlFor="icoInput" className="form-label">Psč <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="icoInput" required/>
                                                </div>
                                            </div>

                                            <button type="submit"
                                                    className="btn btn-primary waves-effect waves-light">Vytvořit
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            </div>
        </div>
    );
};

export default RegestrationReferal;