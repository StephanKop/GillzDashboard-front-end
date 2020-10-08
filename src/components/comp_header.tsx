import React, { Component } from 'react';
import '../component_styles/style_header.scss';
import '../App.scss';
import {
    BrowserRouter as Router, Route,
    Switch,
} from "react-router-dom";

export class Header extends Component {
    render() {
        return (
            <Router>
            <div className={'header'}>
                <div className={'header__item'}>
                    <Switch>
                        <Route path="/about">
                            <h2>about</h2>
                        </Route>
                        <Route path="/">
                            <h2>Dashboard</h2>
                        </Route>
                    </Switch>
                </div>
                <div className={'header__item--gillz'}>
                    <a href={'https://www.gillz.nl'}>
                        <h2>Gillz</h2>
                        <p>A better business with smart solutions</p>
                    </a>
                </div>
            </div>
        </Router>
        )
    }
}
