/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";

const HeaderItem = ({title}) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="page-title-box">
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="http://localhost:3001/">Nastenka</a></li>
                            <li className="breadcrumb-item active">{title}</li>
                        </ol>
                    </div>
                    <h4 className="page-title">{title}</h4>
                </div>
            </div>
        </div>
    );
};

export default HeaderItem;

