import React from 'react';
import {Container} from '@material-ui/core';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";

const App = () => (
    <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar/>
            <Switch>
                <ProtectedRoute path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route component={NotFound}/>
            </Switch>
        </Container>
    </BrowserRouter>
);

export default App;
