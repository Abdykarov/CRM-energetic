/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";
import LeadItem from "./LeadItem";
import PotentialItem from "./PotentialItem";
import AcceptedItem from "./AcceptedItem";

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