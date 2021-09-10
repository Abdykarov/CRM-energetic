/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import LeadItem from "../items/LeadItem";
import PotentialItem from "../items/PotentialItem";

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