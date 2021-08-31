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
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">Dashboard</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-xl-3">
                            <div className="card bg-pattern">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="avatar-md bg-blue rounded">
                                                <i className="fe-layers avatar-title font-22 text-white"></i>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-end">
                                                <h3 className="text-dark my-1"><span
                                                    data-plugin="counterup">12,008</span></h3>
                                                <p className="text-muted mb-0 text-truncate">Campaign Sent</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-xl-3">
                            <div className="card bg-pattern">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="avatar-md bg-success rounded">
                                                <i className="fe-award avatar-title font-22 text-white"></i>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-end">
                                                <h3 className="text-dark my-1"><span
                                                    data-plugin="counterup">7,410</span></h3>
                                                <p className="text-muted mb-0 text-truncate">New Leads</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                            <div className="card bg-pattern">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="avatar-md bg-danger rounded">
                                                <i className="fe-delete avatar-title font-22 text-white"></i>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-end">
                                                <h3 className="text-dark my-1"><span
                                                    data-plugin="counterup">2,125</span></h3>
                                                <p className="text-muted mb-0 text-truncate">Deals</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                            <div className="card bg-pattern">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="avatar-md bg-warning rounded">
                                                <i className="fe-dollar-sign avatar-title font-22 text-white"></i>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-end">
                                                <h3 className="text-dark my-1">$<span data-plugin="counterup">256</span>k
                                                </h3>
                                                <p className="text-muted mb-0 text-truncate">Booked Revenue</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-body pb-2">
                                    <div className="float-end d-none d-md-inline-block">
                                        <div className="btn-group mb-2">
                                            <button type="button" className="btn btn-xs btn-light">Today</button>
                                            <button type="button" className="btn btn-xs btn-light">Weekly</button>
                                            <button type="button" className="btn btn-xs btn-secondary">Monthly</button>
                                        </div>
                                    </div>

                                    <h4 className="header-title mb-3">Deals Analytics</h4>

                                    <div dir="ltr">
                                        <div id="deal-analytics" className="mt-4" data-colors="#1abc9c,#f1556c"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="float-end d-none d-md-inline-block">
                                        <div className="btn-group mb-2">
                                            <button type="button" className="btn btn-xs btn-light">Today</button>
                                            <button type="button" className="btn btn-xs btn-light">Weekly</button>
                                            <button type="button" className="btn btn-xs btn-secondary">Monthly</button>
                                        </div>
                                    </div>

                                    <h4 className="header-title mb-3">Sales Analytics</h4>
                                    <div dir="ltr">
                                        <div id="sales-analytics" className="apex-charts"
                                             data-colors="#6658dd,#1abc9c"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="dropdown float-end">
                                        <a href="#" className="dropdown-toggle arrow-none card-drop"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a href="javascript:void(0);" className="dropdown-item">Settings</a>
                                            <a href="javascript:void(0);" className="dropdown-item">Action</a>
                                        </div>
                                    </div>
                                    <h4 className="header-title mb-3">Top Performing</h4>

                                    <div className="table-responsive">
                                        <table
                                            className="table table-striped table-sm table-nowrap table-centered mb-0">
                                            <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Leads</th>
                                                <th>Deals</th>
                                                <th>Tasks</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <h5 className="font-15 my-1 fw-normal">Jeremy Young</h5>
                                                    <span className="text-muted mb-1 d-block font-13">Senior Sales Executive</span>
                                                </td>
                                                <td>187</td>
                                                <td>154</td>
                                                <td>49</td>
                                                <td className="table-action">
                                                    <a href="#" className="action-icon"> <i
                                                        className="mdi mdi-eye"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 className="font-15 my-1 fw-normal">Thomas Krueger</h5>
                                                    <span className="text-muted mb-1 d-block font-13">Senior Sales Executive</span>
                                                </td>
                                                <td>235</td>
                                                <td>127</td>
                                                <td>83</td>
                                                <td className="table-action">
                                                    <a href="#" className="action-icon"> <i
                                                        className="mdi mdi-eye"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 className="font-15 my-1 fw-normal">Pete Burdine</h5>
                                                    <span className="text-muted mb-1 d-block font-13">Senior Sales Executive</span>
                                                </td>
                                                <td>365</td>
                                                <td>148</td>
                                                <td>62</td>
                                                <td className="table-action">
                                                    <a href="#" className="action-icon"> <i
                                                        className="mdi mdi-eye"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 className="font-15 my-1 fw-normal">Mary Nelson</h5>
                                                    <span className="text-muted mb-1 d-block font-13">Senior Sales Executive</span>
                                                </td>
                                                <td>753</td>
                                                <td>159</td>
                                                <td>258</td>
                                                <td className="table-action">
                                                    <a href="#" className="action-icon"> <i
                                                        className="mdi mdi-eye"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 className="font-15 my-1 fw-normal">Kevin Grove</h5>
                                                    <span className="text-muted mb-1 d-block font-13">Senior Sales Executive</span>
                                                </td>
                                                <td>458</td>
                                                <td>126</td>
                                                <td>73</td>
                                                <td className="table-action">
                                                    <a href="#" className="action-icon"> <i
                                                        className="mdi mdi-eye"></i></a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="dropdown float-end">
                                        <a href="#" className="dropdown-toggle arrow-none card-drop"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a href="javascript:void(0);" className="dropdown-item">Settings</a>
                                            <a href="javascript:void(0);" className="dropdown-item">Action</a>
                                        </div>
                                    </div>
                                    <h4 className="header-title mb-4">Recent Leads</h4>

                                    <div className="d-flex align-items-start">
                                        <img className="me-3 rounded-circle" src="/images/users/user-2.jpg"
                                             width="40" alt="Generic placeholder" />
                                            <div className="w-100">
                                                <span className="badge badge-soft-warning float-end">Cold lead</span>
                                                <h5 className="mt-0 mb-1">Risa Pearson</h5>
                                                <span className="font-13">richard.john@mail.com</span>
                                            </div>
                                    </div>

                                    <div className="d-flex align-items-start mt-3">
                                        <img className="me-3 rounded-circle" src="/images/users/user-3.jpg"
                                             width="40" alt="Generic placeholder"/>
                                            <div className="w-100">
                                                <span className="badge badge-soft-danger float-end">Lost lead</span>
                                                <h5 className="mt-0 mb-1">Margaret D. Evans</h5>
                                                <span className="font-13">margaret.evans@rhyta.com</span>
                                            </div>
                                    </div>

                                    <div className="d-flex align-items-start mt-3">
                                        <img className="me-3 rounded-circle" src="/images/users/user-4.jpg"
                                             width="40" alt="Generic placeholder"/>
                                            <div className="w-100">
                                                <span className="badge badge-soft-success float-end">Won lead</span>
                                                <h5 className="mt-0 mb-1">Bryan J. Luellen</h5>
                                                <span className="font-13">bryuellen@dayrep.com</span>
                                            </div>
                                    </div>

                                    <div className="d-flex align-items-start mt-3">
                                        <img className="me-3 rounded-circle" src="/images/users/user-5.jpg"
                                             width="40" alt="Generic placeholder"/>
                                            <div className="w-100">
                                                <span className="badge badge-soft-warning float-end">Cold lead</span>
                                                <h5 className="mt-0 mb-1">Kathryn S. Collier</h5>
                                                <span className="font-13">collier@jourrapide.com</span>
                                            </div>
                                    </div>

                                    <div className="d-flex align-items-start mt-3">
                                        <img className="me-3 rounded-circle" src="/images/users/user-1.jpg"
                                             width="40" alt="Generic placeholder"/>
                                            <div className="w-100">
                                                <span className="badge badge-soft-warning float-end">Cold lead</span>
                                                <h5 className="mt-0 mb-1">Timothy Kauper</h5>
                                                <span className="font-13">thykauper@rhyta.com</span>
                                            </div>
                                    </div>

                                    <div className="d-flex align-items-start mt-3">
                                        <img className="me-3 rounded-circle" src="/images/users/user-6.jpg"
                                             width="40" alt="Generic placeholder"/>
                                            <div className="w-100">
                                                <span className="badge badge-soft-success float-end">Won lead</span>
                                                <h5 className="mt-0 mb-1">Zara Raws</h5>
                                                <span className="font-13">austin@dayrep.com</span>
                                            </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4  col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-widgets">
                                        <a href="#" data-toggle="reload"><i
                                            className="mdi mdi-refresh"></i></a>
                                        <a data-bs-toggle="collapse" href="#cardCollpase4" role="button"
                                           aria-expanded="false" aria-controls="cardCollpase4"><i
                                            className="mdi mdi-minus"></i></a>
                                        <a href="#" data-toggle="remove"><i
                                            className="mdi mdi-close"></i></a>
                                    </div>
                                    <h4 className="header-title mb-0">Campaigns Ratio</h4>

                                    <div id="cardCollpase4" className="collapse pt-3 show">
                                        <div dir="ltr">
                                            <div id="campaigns-ratio-chart" className="apex-charts"
                                                 data-colors="#f1556c"></div>
                                        </div>
                                        <div className="row text-center mt-2">
                                            <div className="col-md-4">
                                                <h3 className="fw-normal mt-3">
                                                    <span>6,510</span>
                                                </h3>
                                                <p className="text-muted mb-0 mb-2"><i
                                                    className="mdi mdi-checkbox-blank-circle text-warning"></i> Total
                                                    Sent</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h3 className="fw-normal mt-3">
                                                    <span>3,487</span>
                                                </h3>
                                                <p className="text-muted mb-0 mb-2"><i
                                                    className="mdi mdi-checkbox-blank-circle text-primary"></i> Reached
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <h3 className="fw-normal mt-3">
                                                    <span>1,568</span>
                                                </h3>
                                                <p className="text-muted mb-0 mb-2"><i
                                                    className="mdi mdi-checkbox-blank-circle text-success"></i> Opened
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
    );
};

export default Dashboard;