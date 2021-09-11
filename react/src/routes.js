import Admin from "./page/users/Admin";
import {
    ACCEPTED_ROUTE,
    ADMIN_ROUTE,
    CONTACT_PROFILE_ROUTE,
    CONTACTS_ROUTE,
    CREATE_EDR_ROUTE,
    CURRENT_ROUTE,
    DASHBOARD_ROUTE,
    EDR_ROUTE,
    FACTURE_ROUTE,
    INBOX_ROUTE,
    LEAD_ROUTE,
    LOGIN_ROUTE,
    MANAGER_ROUTE,
    POTENTIAL_ROUTE, REGISTRATION_ADMIN_ROUTE,
    REGISTRATION_CONTACT_ROUTE,
    REGISTRATION_MANAGER_ROUTE, REGISTRATION_REFERAL_ROUTE,
    REGISTRATION_SALESMAN_ROUTE,
    SALESMAN_ROUTE,
    WATT_ROUTE
} from "./utils/const";
import Lead from "./page/users/Lead";
import Contacts from "./page/users/Contacts";
import Edr from "./page/users/Edr";
import Watt from "./page/Watt";
import Auth from "./page/forms/Auth";
import Dashboard from "./page/Dashboard";
import Manager from "./page/users/Manager";
import Salesman from "./page/users/Salesman";
import Potential from "./page/users/Potential";
import Current from "./page/users/Current";
import Accepted from "./page/users/Accepted";
import ContactProfile from "./page/users/ContactProfile";
import Inbox from "./page/Inbox";
import Facture from "./page/Facture";
import Registration from "./page/forms/Registration";
import Edr_Registration from "./page/forms/EdrRegistration";
import RegestrationReferal from "./page/forms/RegestrationReferal";
import EdrRegistration from "./page/forms/EdrRegistration";

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
        path: DASHBOARD_ROUTE,
        Component: Dashboard
    },
    {
        path: REGISTRATION_CONTACT_ROUTE,
        Component: Registration
    },
    {
        path: REGISTRATION_SALESMAN_ROUTE,
        Component: Registration
    },
    {
        path: REGISTRATION_MANAGER_ROUTE,
        Component: Registration
    },
    {
        path: REGISTRATION_ADMIN_ROUTE,
        Component: Registration
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: CREATE_EDR_ROUTE + '/:edrLink',
        Component: EdrRegistration
    },
    {
        path: REGISTRATION_REFERAL_ROUTE + '/:referenceLink',
        Component:RegestrationReferal
    }
]