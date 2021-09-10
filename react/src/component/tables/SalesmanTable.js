import React, {useContext} from 'react';
import {Context} from "../../index";
import AdminItem from "../items/AdminItem";
import Salesman from "../../page/users/Salesman";
import SalesmanItem from "../items/SalesmanItem";

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