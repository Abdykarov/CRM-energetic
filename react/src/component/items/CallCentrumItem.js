/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";

const CallCentrumItem = ({callCentrum}) => {
    const history = useHistory()
    console.log(callCentrum)
    return (
        <div className="col-lg-4">
            <div className="text-center card">
                <div className="card-body">
                    <div className="pt-2 pb-2">
                        <img src="images/users/user-3.jpg"
                             className="rounded-circle img-thumbnail avatar-xl" alt="profile-image" />

                        <h4 className="mt-3"><a href={CONTACT_PROFILE_ROUTE + '/' + callCentrum.id} className="text-dark">{callCentrum.name} {callCentrum.surname}</a></h4>
                        <p className="text-muted">@Call centrum <span> | </span> <span> <a href="#"
                                                                                      className="text-pink">{callCentrum.email}</a> </span>
                        </p>

                        <a href={CONTACT_PROFILE_ROUTE + '/' + callCentrum.id} className="btn btn-success btn-sm waves-effect">Profil
                        </a>

                    </div>

                </div>
            </div>

        </div>

    );
};

export default CallCentrumItem;