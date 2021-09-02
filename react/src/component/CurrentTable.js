import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CurrentItem from "./CurrentItem";

const CurrentTable = observer(() => {
    const {current} = useContext(Context)
    return (
        <tbody>
        {current.contacts.map(contact =>
            <CurrentItem key={contact.id} current={contact}/>
        )}
        </tbody>
    );
});

export default CurrentTable;