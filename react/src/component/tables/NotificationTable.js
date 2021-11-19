import React, {useContext} from 'react';
import {Context} from "../../index";
import SalesmanItem from "../items/SalesmanItem";
import {observer} from "mobx-react-lite";
import NotificationItem from "../items/NotificationItem";

const NotificationTable = observer(() => {
    const {notification} = useContext(Context)
    return (
        <tbody>
        {notification.notifications.map(contact =>
            <NotificationItem key={contact.id} notification={contact}/>
        )}
        </tbody>
    );
});

export default NotificationTable;