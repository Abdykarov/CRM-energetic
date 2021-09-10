/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import LeadItem from "../items/LeadItem";
import PotentialItem from "../items/PotentialItem";
import AcceptedItem from "../items/AcceptedItem";

const AcceptedTable = observer(() => {
    const {accepted} = useContext(Context)
    return (
        <tbody>
        {accepted.contacts.map(contact =>
            <AcceptedItem key={contact.id} accepted={contact}/>
        )}
        </tbody>
    );
});

export default AcceptedTable;