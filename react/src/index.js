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
import NotesStore from "./store/NotesStore";
import AreaStore from "./store/AreaStore";
import FactureStore from "./store/FactureStore";
import LeadContractStore from "./store/LeadContractStore";

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        contact: new ContactStore(),
        lead: new LeadStore(),
        leadContract: new LeadContractStore(),
        admin: new AdminStore(),
        salesman: new SalesmanStore(),
        manager: new ManagerStore(),
        edr: new EdrStore(),
        watt: new WattStore(),
        mail: new MailStore(),
        communication: new CommunicationStore(),
        applicant: new ApplicantStore(),
        notes: new NotesStore(),
        facture: new FactureStore(),
        area: new AreaStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
