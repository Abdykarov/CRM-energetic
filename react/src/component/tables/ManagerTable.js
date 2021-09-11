/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import LeadItem from "../items/LeadItem";
import AdminItem from "../items/AdminItem";
import ManagerItem from "../items/ManagerItem";

const ManagerTable = observer(() => {
    const {manager} = useContext(Context)
    return (
        <div className="row">
            {manager.contacts.map(contact =>
                <ManagerItem key={contact.id} manager={contact}/>
            )}
        </div>
    );
});

export default ManagerTable;