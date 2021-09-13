import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import ContactStore from "./store/ContactStore";
import LeadStore from "./store/LeadStore";
import PotentialStore from "./store/PotentialStore";
import CurrentStore from "./store/CurrentStore";
import AcceptedStore from "./store/AcceptedStore";
import EdrStore from "./store/EdrStore";
import SalesmanStore from "./store/SalesmanStore";
import AdminStore from "./store/AdminStore";
import ManagerStore from "./store/ManagerStore";
import WattStore from "./store/WattStore";

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        contact: new ContactStore(),
        lead: new LeadStore(),
        potential: new PotentialStore(),
        current: new CurrentStore(),
        accepted: new AcceptedStore(),
        admin: new AdminStore(),
        salesman: new SalesmanStore(),
        manager: new ManagerStore(),
        edr: new EdrStore(),
        watt: new WattStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
