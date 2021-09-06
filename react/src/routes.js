import Admin from "./page/Admin";
import {
    ACCEPTED_ROUTE,
    ADMIN_ROUTE, CONTACT_PROFILE_ROUTE,
    CONTACTS_ROUTE, CREATE_CONTACT_ROUTE, CREATE_EDR_ROUTE, CURRENT_ROUTE, DASHBOARD_ROUTE,
    EDR_ROUTE, FACTURE_ROUTE, INBOX_ROUTE,
    LEAD_ROUTE,
    LOGIN_ROUTE, MANAGER_ROUTE, POTENTIAL_ROUTE,
    REGISTRATION_ROUTE, SALESMAN_ROUTE,
    WATT_ROUTE
} from "./utils/const";
import Lead from "./page/Lead";
import Contacts from "./page/Contacts";
import Edr from "./page/Edr";
import Watt from "./page/Watt";
import Auth from "./page/Auth";
import Registration from "./page/Registration";
import Dashboard from "./page/Dashboard";
import Manager from "./page/Manager";
import Salesman from "./page/Salesman";
import Potential from "./page/Potential";
import Current from "./page/Current";
import Accepted from "./page/Accepted";
import ContactProfile from "./page/ContactProfile";
import Inbox from "./page/Inbox";
import Facture from "./page/Facture";
import CreationForm from "./page/CreationForm";
import Edr_Registration from "./page/Edr_Registration";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: EDR_ROUTE,
        Component: Edr
    },
    {
        path: LEAD_ROUTE,
        Component: Lead
    },
    {
        path: POTENTIAL_ROUTE,
        Component: Potential
    },
    {
        path: CURRENT_ROUTE,
        Component: Current
    },
    {
        path: ACCEPTED_ROUTE,
        Component: Accepted
    },
    {
        path: CONTACT_PROFILE_ROUTE + '/:id',
        Component: ContactProfile
    },
    {
        path: WATT_ROUTE,
        Component: Watt
    },
    {
        path: MANAGER_ROUTE,
        Component: Manager
    },
    {
        path: SALESMAN_ROUTE,
        Component: Salesman
    },
    {
        path: INBOX_ROUTE,
        Component: Inbox
    },
    {
        path: FACTURE_ROUTE,
        Component: Facture
    },
    {
        path: CREATE_CONTACT_ROUTE,
        Component: CreationForm
    },
    {
        path: DASHBOARD_ROUTE,
        Component: Dashboard
    }
]

export const publicRoutes = [
    {
        path: CREATE_EDR_ROUTE + '/:id/' + 'gfdgdfkoJ454T',
        Component: Edr_Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    }
]