import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, useHistory} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import NavBar from "./component/NavBar";
import {observer} from "mobx-react-lite";
import LeftSidebar from "./component/LeftSidebar";
import {Context} from "./index";
import {auth} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {DASHBOARD_ROUTE} from "./utils/const";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth().then(data => {
            user.setUser(data)
            user.setRole(data.roles)
            user.setIsAuth(true)
            user.setUsername(data.sub)
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <NavBar />
            { ( user.role === "ROLE_EDR" && window.location.pathname === "/") ?
                ""
                :
                <LeftSidebar />
            }
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;