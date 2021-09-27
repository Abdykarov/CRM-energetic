import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import ContactStore from "./store/ContactStore";
import LeadStore from "./store/LeadStore";
import EdrStore from "./store/EdrStore";
import SalesmanStore from "./store/SalesmanStore";
import AdminStore from "./store/AdminStore";
import ManagerStore from "./store/ManagerStore";
import WattStore from "./store/WattStore";
import MailStore from "./store/MailStore";
import ApplicantStore from "./store/ApplicantStore";
import CommunicationStore from "./store/CommunicationStore";

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        contact: new ContactStore(),
        lead: new LeadStore(),
        admin: new AdminStore(),
        salesman: new SalesmanStore(),
        manager: new ManagerStore(),
        edr: new EdrStore(),
        watt: new WattStore(),
        inbox: new MailStore(),
        communication: new CommunicationStore(),
        applicant: new ApplicantStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
