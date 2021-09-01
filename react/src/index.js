import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import ContactStore from "./store/ContactStore";

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        contact: new ContactStore(),
        lead: new LeadStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
