/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";

const ContactTable = observer(() => {
    const {contact} = useContext(Context)
    return (
        <tbody>
            {contact.contacts.map(contact =>
                <ContactItem key={contact.id} contact={contact}/>
            )}
        </tbody>
    );
});

export default ContactTable;