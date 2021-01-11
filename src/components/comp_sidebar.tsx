import React, { Component } from 'react';
import '../component_styles/style_sidebar.scss';
import PageOverview from '../pages/page_overview';
import PageDeadLines from '../pages/page_deadlines';
import PageNotes from '../pages/page_notes';
import PageIssues from '../pages/page_issues';
import PageBuilds from '../pages/page_builds';
import PageMembers from '../pages/page_members';
import PageProjects from '../pages/page_projects';
import PageSettings from '../pages/page_settings';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';

export class Sidebar extends Component {
    render() {
        return (
            <Router>
            <div className={'sidebar'}>
                <div className={'sidebar__top'}>
                    <div className={'sidebar__top__item-container'}>
                        <NavLink to="/" id={'home-link'} className={'sidebar__top__item-container--link'} activeClassName="nav-active" exact={true}>
                            <button id={'home-button'} style={{backgroundImage: 'url(' + require('../img/dashboard.svg') + ')'}}>
                                {/*<img src={require('../img/dashboard.svg')} alt={'home-link'}/>*/}
                            </button>
                        </NavLink>
                        <label htmlFor={'home-button'} className={'nav-label'}>Home</label>
                    </div>
                    <div className={'sidebar__top__item-container'}>
                        <NavLink to="/deadlines" className={'sidebar__top__item-container--link'} activeClassName="nav-active" exact={true}>
                            <button id={'deadlines-button'} style={{backgroundImage: 'url(' + require('../img/calendar.svg') + ')'}}>
                                {/*<img src={require('../img/calendar.svg')} alt={'deadlines-link'}/>*/}
                            </button>
                        </NavLink>
                        <label htmlFor={'deadlines-button'} >Deadlines</label>
                    </div>
                    <div className={'sidebar__top__item-container'}>
                        <NavLink to="/issues" className={'sidebar__top__item-container--link'} activeClassName="nav-active" exact={true}>
                            <button id={'zendesk-button'} style={{backgroundImage: 'url(' + require('../img/laptop.svg') + ')'}}>
                                {/*<img src={require('../img/calendar.svg')} alt={'deadlines-link'}/>*/}
                            </button>
                        </NavLink>
                        <label htmlFor={'zendesk-button'}>Zendesk</label>
                    </div>
                    <div className={'sidebar__top__item-container'}>
                        <NavLink to="/notes" className={'sidebar__top__item-container--link'} activeClassName="nav-active" exact={true}>
                            <button id={'notes-button'} style={{backgroundImage: 'url(' + require('../img/notes.svg') + ')'}}>
                                {/*<img src={require('../img/notes.svg')} alt={'notes-link'}/>*/}
                            </button>
                        </NavLink>
                        <label htmlFor={'notes-button'}>Notities</label>
                    </div>
                    <div className={'sidebar__top__item-container'}>
                        <NavLink to="/projecten" className={'sidebar__top__item-container--link'} activeClassName="nav-active" exact={true}>
                            <button id={'projects-button'} style={{backgroundImage: 'url(' + require('../img/projecten.svg') + ')'}}>
                                {/*<img src={require('../img/projecten.svg')} alt={'projecten-link'}/>*/}
                            </button>
                        </NavLink>
                        <label htmlFor={'projects-button'}>Projecten</label>
                    </div>
                    <div className={'sidebar__top__item-container'}>
                        <NavLink to="/builds" className={'sidebar__top__item-container--link'} activeClassName="nav-active" exact={true}>
                            <button id={'builds-button'} style={{backgroundImage: 'url(' + require('../img/toolbox.svg') + ')'}}>
                                {/*<img src={require('../img/toolbox.svg')} alt={'builds-link'}/>*/}
                            </button>
                        </NavLink>
                        <label htmlFor={'builds-button'}>Builds</label>
                    </div>
                    <div className={'sidebar__top__item-container'}>
                        <NavLink to="/members" className={'sidebar__top__item-container--link'} activeClassName="nav-active" exact={true}>
                            <button id={'members-button'} style={{backgroundImage: 'url(' + require('../img/team.svg') + ')'}}>
                                {/*<img src={require('../img/team.svg')} alt={'members-link'}/>*/}
                            </button>
                        </NavLink>
                        <label htmlFor={'members-button'}>Members</label>
                    </div>
                </div>
                <div className={'sidebar__bottom'}>
                    <div className={'sidebar__bottom__item-container'}>
                        <NavLink to="/settings" className={'sidebar__bottom__item-container--link'} activeClassName="nav-active" exact={true}>
                            <button id={'settings-button'} style={{backgroundImage: 'url(' + require('../img/settings.svg') + ')'}}>
                            {/*<img src={require('../img/settings.svg')} alt={'settings-link'}/>*/}
                            </button>
                        </NavLink>
                        <label htmlFor={'settings-button'}>Settings</label>
                    </div>
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
        );
    }
}
