/* eslint-disable */

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Row} from "react-bootstrap";
import ContactItem from "../items/ContactItem";
import LeadItem from "../items/LeadItem";
import EdrItem from "../items/EdrItem";
import Applicant from "../../page/Applicant";
import ApplicantItem from "../items/ApplicantItem";

const ApplicantTable = observer(() => {
    const {applicant} = useContext(Context)
    return (
        <tbody>
        {applicant.contacts.map(contact =>
            <ApplicantItem key={contact.id} applicant={contact}/>
        )}
        </tbody>
    );
});

export default ApplicantTable;