import Admin from "./page/Admin";
import {
    ADMIN_ROUTE, APPLICANT_ROUTE,
    CONTACT_PROFILE_ROUTE,
    CONTACTS_ROUTE,
    CREATE_EDR_ROUTE,
    DASHBOARD_ROUTE,
    EDR_ROUTE,
    FACTURE_ROUTE,
    INBOX_ROUTE,
    LEAD_ROUTE,
    LOGIN_ROUTE,
    MANAGER_ROUTE, OUTBOX_ROUTE,
    REGISTRATION_ADMIN_ROUTE,
    REGISTRATION_CONTACT_ROUTE,
    REGISTRATION_MANAGER_ROUTE, REGISTRATION_REFERAL_ROUTE,
    REGISTRATION_SALESMAN_ROUTE,
    SALESMAN_ROUTE,
    WATT_ROUTE
} from "./utils/const";
import Lead from "./page/Lead";
import Contacts from "./page/Contacts";
import Edr from "./page/Edr";
import Watt from "./page/Watt";
import Auth from "./page/Auth";
import Dashboard from "./page/Dashboard";
import Manager from "./page/Manager";
import Salesman from "./page/Salesman";
import ContactProfile from "./page/ContactProfile";
import Inbox from "./page/Inbox";
import Facture from "./page/Facture";
import Registration from "./page/Registration";
import Edr_Registration from "./page/EdrRegistration";
import RegestrationReferal from "./page/RegestrationReferal";
import EdrRegistration from "./page/EdrRegistration";
import Outbox from "./page/Outbox";
import Applicant from "./page/Applicant";

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
        path: APPLICANT_ROUTE,
        Component: Applicant
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
        path: OUTBOX_ROUTE,
        Component: Outbox
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