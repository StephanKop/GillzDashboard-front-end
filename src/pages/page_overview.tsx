import React, { Component } from 'react';
import Servercards from "../components/comp_server-cards";
import Deadlines from "../components/comp_deadlines";
import '../page_styles/style_overview.scss';
import '../App.scss';

export class PageOverview extends Component {
    render() {
        return (
            <div className={'content'}>
                <div className={'server-container'}>

                    <h3 className={'server-container--serverTitle'}>Server status</h3>
                        <Servercards apiLink={process.env.REACT_APP_API_SERVER_STATUS}/>
                    <div className={'server-container__bottom-row'}>

                        <div>
                            <h3 className={'server-container--serverDeadlines'}>Deadlines</h3>
                            {/*<Deadlines apiLink={"http://localhost:3001/deadlines/four"}/>*/}
                            <div className={'server-container__deadlines'}>
                                <Deadlines apiLink={process.env.REACT_APP_API_DEADLINES_FOUR}/>
                            </div>
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
