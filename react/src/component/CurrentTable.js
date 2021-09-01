import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";
import LeadItem from "./LeadItem";
import PotentialItem from "./PotentialItem";

const CurrentTable = observer(() => {
    const {current} = useContext(Context)
    return (
        <tbody>
        {current.contacts.map(contact =>
            <CurrentTable key={contact.id} contact={contact}/>
        )}
        </tbody>
    );
});

export default CurrentTable;