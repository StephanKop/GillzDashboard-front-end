import React, { Component } from 'react';
import '../component_styles/style_sidebar.scss';
import {PageOverview} from '../pages/page_overview';
import {PageDeadLines} from '../pages/page_deadlines';
import {PageNotes} from '../pages/page_notes';
import PageIssues from '../pages/page_issues';
import PageBuilds from "../pages/page_builds";
import PageMembers from "../pages/page_members";
import PageProjects from "../pages/page_projects";
import PageSettings from "../pages/page_settings";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";

export class Sidebar extends Component {
    render() {
        return (
            <Router>
            <div className={'sidebar'}>
                <div className={'sidebar__top'}>
                    <NavLink to="/" className={'sidebar__top--link'} activeClassName='nav-active' exact={true}>
                        <img src={require('../img/dashboard.svg')} alt={'home-link'}/>
                    </NavLink>
                    <NavLink to="/deadlines" className={'sidebar__top--link'} activeClassName='nav-active' exact={true}>
                        <img src={require('../img/calendar.svg')} alt={'deadlines-link'}/>
                    </NavLink>
                    <NavLink to="/issues" className={'sidebar__top--link'} activeClassName='nav-active' exact={true}>
                        <img src={require('../img/laptop.svg')} alt={'issues-link'}/>
                    </NavLink>
                    <NavLink to="/notes" className={'sidebar__top--link'} activeClassName='nav-active' exact={true}>
                        <img src={require('../img/notes.svg')} alt={'notes-link'}/>
                    </NavLink>
                    <NavLink to="/projecten" className={'sidebar__top--link'} activeClassName='nav-active' exact={true}>
                        <img src={require('../img/projecten.svg')} alt={'projecten-link'}/>
                    </NavLink>
                    <NavLink to="/builds" className={'sidebar__top--link'} activeClassName='nav-active' exact={true}>
                        <img src={require('../img/toolbox.svg')} alt={'builds-link'}/>
                    </NavLink>
                    <NavLink to="/members" className={'sidebar__top--link'} activeClassName='nav-active' exact={true}>
                        <img src={require('../img/team.svg')} alt={'members-link'}/>
                    </NavLink>
                </div>
                <div className={'sidebar__bottom'}>
                    <NavLink to="/settings" className={'sidebar__bottom--link'} activeClassName='nav-active' exact={true}>
                        <img src={require('../img/settings.svg')} alt={'home-link'}/>
                    </NavLink>
                </div>
            </div>
                <Switch>
                    <Route path="/deadlines">
                        <PageDeadLines/>
                    </Route>
                    <Route path="/issues">
                        <PageIssues/>
                    </Route>
                    <Route path="/notes">
                        <PageNotes/>
                    </Route>
                    <Route path="/projecten">
                        <PageProjects/>
                    </Route>
                    <Route path="/builds">
                        <PageBuilds/>
                    </Route>
                    <Route path="/members">
                        <PageMembers/>
                    </Route>
                    <Route path="/settings">
                        <PageSettings/>
                    </Route>
                    <Route path="/">
                        <PageOverview/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
