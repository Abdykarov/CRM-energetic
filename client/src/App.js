import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import NavBar from "./component/NavBar";
import {observer} from "mobx-react-lite";
import LeftSidebar from "./component/LeftSidebar";

const App = observer(() => {

    return (
        <BrowserRouter>
            <NavBar />
            <LeftSidebar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;