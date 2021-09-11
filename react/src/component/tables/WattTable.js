/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import WattItem from "../items/WattItem";

const WattTable = observer(() => {
    const {watt} = useContext(Context)
    return (
        <tbody>
        {watt.contacts.map(contact =>
            <WattItem key={contact.id} watt={contact}/>
        )}
        </tbody>
    );
});

export default WattTable;