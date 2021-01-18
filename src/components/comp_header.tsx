import React from 'react';
import '../component_styles/style_header.scss';
import '../App.scss';
import {
    BrowserRouter as Router
} from 'react-router-dom';

const Header = (props) => {
        return (
            <Router>
            <div className={'header'}>
                <div className={'header__item'}>
                    <h2>{props.title}</h2>
                </div>
                <div className={'header__item--gillz'}>
                    <a href={'https://www.gillz.nl'}>
                        <h2>Gillz</h2>
                        <p>A better business with smart solutions</p>
                    </a>
                </div>
            </div>
        </Router>
        );
    };

export default Header;
