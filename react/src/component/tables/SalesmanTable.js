import React, {useContext} from 'react';
import {Context} from "../../index";
import SalesmanItem from "../items/SalesmanItem";
import {observer} from "mobx-react-lite";

const SalesmanTable = observer(() => {
    const {salesman} = useContext(Context)
    return (
        <div className="row">
            {salesman.contacts.map(contact =>
                <SalesmanItem key={contact.id} salesman={contact}/>
            )}
        </div>
    );
});

export default SalesmanTable;