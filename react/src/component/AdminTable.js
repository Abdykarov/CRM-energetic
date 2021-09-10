/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ContactItem from "./ContactItem";
import LeadItem from "./LeadItem";
import AdminItem from "./AdminItem";

const AdminTable = observer(() => {
    const {admin} = useContext(Context)
    return (
        <div className="row">
        {admin.contacts.map(contact =>
            <AdminItem key={contact.id} admin={contact}/>
        )}
        </div>
    );
});

export default AdminTable;