import Admin from "./page/Admin";
import {
    ADMIN_ROUTE, APPLICANT_ROUTE, CALLCENTRUM_ROUTE,
    CONTACT_PROFILE_ROUTE,
    CONTACTS_ROUTE,
    CREATE_EDR_ROUTE,
    DASHBOARD_ROUTE,
    EDR_ROUTE,
    FACTURE_ROUTE,
    INBOX_ROUTE,
    LEAD_ROUTE,
    LOGIN_ROUTE,
    MANAGER_ROUTE, NOTIFICATION_ROUTE,
    REGISTRATION_ADMIN_ROUTE,
    REGISTRATION_CONTACT_ROUTE,
    REGISTRATION_MANAGER_ROUTE, REGISTRATION_REFERAL_ROUTE,
    REGISTRATION_SALESMAN_ROUTE,
    SALESMAN_ROUTE, WATT_CATALOG, WATT_REFERALS,
    WATT_ROUTE
} from "./utils/const";
import Lead from "./page/Lead";
import Contacts from "./page/Contacts";
import Edr from "./page/Edr";
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
import Applicant from "./page/Applicant";
import CallCentrum from "./page/CallCentrum";
import WattCatalog from "./page/WattCatalog";
import WattReferals from "./page/WattReferals";
import NotificationPage from "./page/NotificationPage";

export const authRoutes = [
    {
      path: NOTIFICATION_ROUTE,
      Component: NotificationPage
    },
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
        path: WATT_REFERALS,
        Component: WattReferals
    },
    {
        path: WATT_CATALOG,
        Component: WattCatalog
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
        path: CALLCENTRUM_ROUTE,
        Component: CallCentrum
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