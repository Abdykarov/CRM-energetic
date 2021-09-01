import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";
import LeadItem from "./LeadItem";

const LeadTable = observer(() => {
    const {lead} = useContext(Context)
    return (
        <tbody>
        {lead.contacts.map(contact =>
            <LeadItem key={contact.id} contact={contact}/>
        )}
        </tbody>
    );
});

export default LeadTable;