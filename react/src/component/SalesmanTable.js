import React, {useContext} from 'react';
import {Context} from "../index";
import AdminItem from "./AdminItem";
import Salesman from "../page/Salesman";
import SalesmanItem from "./SalesmanItem";

const SalesmanTable = () => {
    const {salesman} = useContext(Context)
    return (
        <div className="row">
            {salesman.contacts.map(contact =>
                <SalesmanItem key={contact.id} salesman={contact}/>
            )}
        </div>
    );
};

export default SalesmanTable;