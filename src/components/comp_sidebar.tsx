import React, { Component } from 'react';
import '../component_styles/style_sidebar.scss';
import {Page_overview} from '../pages/page_overview';
import {Page_DeadLines} from '../pages/page_deadlines';
import {Page_Notes} from '../pages/page_notes';

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
                <div className={'sidebar__top'}>
                    <Link to="/" className={'sidebar__top--link'}>
                        <img src={require('../img/dashboard.svg')} alt={'home-link'}/>
                    </Link>
                    <Link to="/deadlines" className={'sidebar__top--link'}>
                        <img src={require('../img/calendar.svg')} alt={'home-link'}/>
                    </Link>
                    <Link to="/issues" className={'sidebar__top--link'}>
                        <img src={require('../img/laptop.svg')} alt={'home-link'}/>
                    </Link>
                    <Link to="/notes" className={'sidebar__top--link'}>
                        <img src={require('../img/notes.svg')} alt={'home-link'}/>
                    </Link>
                    <Link to="/projecten" className={'sidebar__top--link'}>
                        <img src={require('../img/projecten.svg')} alt={'home-link'}/>
                    </Link>
                </div>
                <div className={'sidebar__bottom'}>
                    <Link to="/tv-view" className={'sidebar__bottom--link'}>
                        <img src={require('../img/television.svg')} alt={'home-link'}/>
                    </Link>
                </div>
            </div>
                <Switch>
                    <Route path="/deadlines">
                        <Page_DeadLines/>
                    </Route>
                    <Route path="/issues">
                        <div></div>
                    </Route>
                    <Route path="/notes">
                        <Page_Notes/>
                    </Route>
                    <Route path="/projecten">
                        <div></div>
                    </Route>
                    <Route path="/tv-view">
                        <div></div>
                    </Route>
                    <Route path="/">
                        <Page_overview/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
