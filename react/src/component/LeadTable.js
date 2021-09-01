import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";

const LeadTable = observer(() => {
    const {contact} = useContext(Context)
    return (
        <tbody>
        {contact.contacts.map(contact =>
            <LeadItem key={contact.id} contact={contact}/>
        )}
        </tbody>
    );
});

export default LeadTable;