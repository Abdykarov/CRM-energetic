import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import NavBar from "./component/NavBar";
import {observer} from "mobx-react-lite";
import LeftSidebar from "./component/LeftSidebar";
import {Context} from "./index";
import {auth} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth().then(data => {
            user.setUser(data)
            user.setRole(data.roles)
            user.setIsAuth(true)
            user.setUsername(data.sub)
            console.log(user)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <NavBar />
            <LeftSidebar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;