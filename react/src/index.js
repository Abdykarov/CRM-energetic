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

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        contact: new ContactStore(),
        lead: new LeadStore(),
        potential: new PotentialStore(),
        current: new CurrentStore(),
        accepted: new AcceptedStore(),
        edr: new EdrStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
