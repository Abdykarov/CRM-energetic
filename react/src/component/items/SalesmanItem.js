import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";

const SalesmanItem = ({salesman}) => {
    const history = useHistory()
    console.log(salesman)
    return (
        <div className="col-lg-4">
            <div className="text-center card">
                <div className="card-body">
                    <div className="pt-2 pb-2">
                        <img src="images/users/user-3.jpg"
                             className="rounded-circle img-thumbnail avatar-xl" alt="profile-image" />

                        <h4 className="mt-3"><a href="extras-profile.html" className="text-dark">{salesman.name} {salesman.surname}</a></h4>
                        <p className="text-muted">@Obchodní zástupce <span> | </span> <span> <a href="#"
                                                                                    className="text-pink">{salesman.email}</a> </span>
                        </p>

                        <a href={CONTACT_PROFILE_ROUTE + '/' + salesman.id} className="btn btn-success btn-sm waves-effect">Profil
                        </a>
                        <div className="row mt-4">
                            <div className="col-4">
                                <div className="mt-3">
                                    <h4>10</h4>
                                    <p className="mb-0 text-muted text-truncate">Kontakty</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="mt-3">
                                    <h4>5</h4>
                                    <p className="mb-0 text-muted text-truncate">Leady</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="mt-3">
                                    <h4>20</h4>
                                    <p className="mb-0 text-muted text-truncate">Max počet</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    );
};

export default SalesmanItem;