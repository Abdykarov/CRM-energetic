/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import LeadItem from "../items/LeadItem";
import FactureItem from "../items/FactureItem";

const FactureTable = observer(() => {
    const {facture} = useContext(Context)
    return (
        <tbody>
        {facture.factures.map(item =>
            <FactureItem key={item.id} facture={item}/>
        )}
        </tbody>
    );
});

export default FactureTable;