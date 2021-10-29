/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import LeadItem from "../items/LeadItem";
import SuperContractItem from "../items/SuperContractItem";

const SuperContractTable = observer(() => {
    const {lead} = useContext(Context)
    return (
        <tbody>
        {lead.contacts.map(contact =>
            <SuperContractItem key={contact.id} contact={contact}/>
        )}
        </tbody>
    );
});

export default SuperContractTable;