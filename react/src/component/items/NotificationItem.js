import React from 'react';
import {useHistory} from "react-router-dom";
import {CONTACT_PROFILE_ROUTE} from "../../utils/const";

const NotificationItem = ({notification}) => {
    const history = useHistory()
    console.log(notification)
    return (
        <tr>
            <td>
                <img src="https://icon-library.com/images/notification-icon/notification-icon-24.jpg" width="35px" alt=""/>
                {
                    notification.activeUser === null ? '' :
                        <a href={CONTACT_PROFILE_ROUTE + '/' + notification.activeUser.id} className="text-body fw-semibold">{notification.activeUser.name} {notification.activeUser.surname}</a>
                }
                 <span> {notification.text} </span>
                {
                    notification.passiveUser === null ? '' :
                        <a href={CONTACT_PROFILE_ROUTE + '/' + notification.passiveUser.id} className="text-body fw-semibold">{notification.passiveUser.name} {notification.passiveUser.surname}</a>
                }
            </td>
            <td>{notification.notificationDescType}</td>
            <td>
                {/*<p>{notification.createdAt} {notification.createdAt.substring(11,20)}</p>*/}
            </td>
        </tr>
    );
};

export default NotificationItem;