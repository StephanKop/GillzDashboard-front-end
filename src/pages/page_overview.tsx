import React, { Component } from 'react';
import Servercards from "../components/comp_server-cards";
import Deadlines from "../components/comp_deadlines";
import '../page_styles/style_overview.scss';
import '../App.scss';

export class Page_overview extends Component {
    render() {
        return (
            <div className={'content'}>
                <div className={'server-container'}>

                    <h3 className={'server-container--serverTitle'}>Servers</h3>
                        <Servercards/>
                    <div className={'server-container__bottom-row'}>

                        <div>
                            <h3 className={'server-container--serverDeadlines'}>Deadlines</h3>
                            <Deadlines/>
                        </div>

                        <div>
                            <h3 className={'server-container--serverDeadlines'}>Zendesk</h3>
                            {/*<Deadlines/>*/}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
