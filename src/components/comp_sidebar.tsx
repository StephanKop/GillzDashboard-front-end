import React, { Component } from 'react';
import '../component_styles/style_sidebar.scss';
import {Page_overview} from '../pages/page_overview';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export class Sidebar extends Component {
    render() {
        return (
            <Router>
            <div className={'sidebar'}>
                <Link to="/" className={'sidebar__link'}>
                    <img src={require('../img/dashboard.svg')} alt={'home-link'}/>
                </Link>
                <Link to="/about" className={'sidebar__link'}>
                    <img src={require('../img/dashboard.svg')} alt={'home-link'}/>
                </Link>
            </div>
                <Switch>
                    <Route path="/about">
                        <h2>about</h2>
                    </Route>
                    <Route path="/users">
                        <h2>users</h2>
                    </Route>
                    <Route path="/">
                        <Page_overview/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
