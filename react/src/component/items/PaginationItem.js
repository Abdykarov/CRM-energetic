/* eslint-disable */
import React from 'react';

const PaginationItem = () => {
    return (
            <div className="row">
                <div className="col-12">
                    <div className="text-end">
                        <ul className="pagination pagination-rounded justify-content-end">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                    <span className="visually-hidden">Previous</span>
                                </a>
                            </li>
                            <li className="page-item active"><a className="page-link"
                                                                href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">3</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">4</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">5</a>
                            </li>
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
    );
};

export default PaginationItem;