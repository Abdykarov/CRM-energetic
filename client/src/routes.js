import Admin from "./page/Admin";
import {
    ADMIN_ROUTE,
    CONTACTS_ROUTE, DASHBOARD_ROUTE,
    EDR_ROUTE,
    LEAD_ROUTE,
    LOGIN_ROUTE, MANAGER_ROUTE,
    PROFILE_ROUTE, REGISTRATION_ROUTE, SALESMAN_ROUTE,
    WATT_ROUTE
} from "./utils/const";
import Lead from "./page/Lead";
import Contacts from "./page/Contacts";
import Edr from "./page/Edr";
import UserProfile from "./page/UserProfile";
import Watt from "./page/Watt";
import Auth from "./page/Auth";
import Registration from "./page/Registration";
import Dashboard from "./page/Dashboard";
import Manager from "./page/Manager";
import Salesman from "./page/Salesman";

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
        path: PROFILE_ROUTE,
        Component: UserProfile
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
        path: DASHBOARD_ROUTE,
        Component: Dashboard
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    }
]