/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../utils/const";

const AdminItem = ({admin}) => {
    const history = useHistory()
    console.log(admin)
    return (
        <div className="col-lg-4">
            <div className="text-center card">
                <div className="card-body">
                    <div className="pt-2 pb-2">
                        <img src="images/users/user-3.jpg"
                             className="rounded-circle img-thumbnail avatar-xl" alt="profile-image" />

                        <h4 className="mt-3"><a href="extras-profile.html" className="text-dark">{admin.name} {admin.surname}</a></h4>
                        <p className="text-muted">@Admin <span> | </span> <span> <a href="#"
                                                                                      className="text-pink">{admin.email}</a> </span>
                        </p>

                        <button type="button"
                                className="btn btn-primary btn-sm waves-effect waves-light">Zpráva
                        </button>
                        <a href={CONTACT_PROFILE_ROUTE + '/' + admin.id} className="btn btn-light btn-sm waves-effect">Profil
                        </a>

                    </div>

                </div>
            </div>

        </div>

    );
};

export default AdminItem;