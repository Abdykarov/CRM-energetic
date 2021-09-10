/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import LeadItem from "../items/LeadItem";
import AdminItem from "../items/AdminItem";

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