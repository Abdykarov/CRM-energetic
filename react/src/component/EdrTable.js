/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";
import LeadItem from "./LeadItem";
import EdrItem from "./EdrItem";

const EdrTable = observer(() => {
    const {edr} = useContext(Context)
    return (
        <tbody>
        {edr.contacts.map(contact =>
            <EdrItem key={contact.id} edr={contact}/>
        )}
        </tbody>
    );
});

export default EdrTable;