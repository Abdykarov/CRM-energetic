/* eslint-disable */

import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";

const WattItem = ({watt}) => {
    const history = useHistory()
    console.log(watt)
    return (
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
                {watt.name} {watt.surname}
            </td>
            <td>
                {watt.date}
            </td>
            <td>
                {watt.points}
            </td>
        </tr>
    );
};

export default WattItem;