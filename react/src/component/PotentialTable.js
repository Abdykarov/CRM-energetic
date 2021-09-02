/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";
import LeadItem from "./LeadItem";
import PotentialItem from "./PotentialItem";

const PotentialTable = observer(() => {
    const {potential} = useContext(Context)
    return (
        <tbody>
        {potential.contacts.map(contact =>
            <PotentialItem key={contact.id} contact={contact}/>
        )}
        </tbody>
    );
});

export default PotentialTable;