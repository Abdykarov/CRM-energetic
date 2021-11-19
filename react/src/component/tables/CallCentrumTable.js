/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import LeadItem from "../items/LeadItem";
import AdminItem from "../items/AdminItem";
import ManagerItem from "../items/ManagerItem";
import CallCentrumItem from "../items/CallCentrumItem";

const CallCentrumTable = observer(() => {
    const {callCentrum} = useContext(Context)
    return (
        <div className="row">
            {callCentrum.contacts.map(contact =>
                <CallCentrumItem key={contact.id} callCentrum={contact}/>
            )}
        </div>
    );
});

export default CallCentrumTable;