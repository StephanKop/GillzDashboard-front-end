import React, {useEffect} from 'react';
import Servercards from '../components/comp_server-cards';
import Deadlines from '../components/comp_deadlines';
import '../page_styles/style_overview.scss';
import '../App.scss';
import Builds from '../components/comp_builds';
import Header from '../components/comp_header';

const PageOverview = (props)  => {
        useEffect(() => {
            document.title = 'Gillz Dashboard';
        }, []);
        return (
            <div>
                <Header title={'Dashboard'}/>
                <div className={'content'}>
                    <div className={'server-container'}>
                        <div>
                            <h3 className={'server-container--serverTitle'}>Server status</h3>
                                <Servercards apiLink={process.env.REACT_APP_API_SERVER_STATUS}/>
                            <div>
                        </div>
                        </div>
                            <div className={'server-container__bottom-row'}>
                                <div className={'server-container__bottom'}>
                                    <h3 className={'server-container--serverDeadlines'}>Deadlines</h3>
                                    <div className={'server-container__deadlines'}>
                                        <Deadlines apiLink={process.env.REACT_APP_API_DEADLINES_ORDEREDBYDATE} displayDateSort={'none'} displayNameSort={'none'} displayTitle={'none'} displayEdit={'0'} frontPage={true} maxDeadlines={5}/>
                                    </div>
                                </div>
                                <div className={'server-container__bottom'}>
                                    <h3 className={'server-container--serverDeadlines'}>Builds</h3>
                                    <div className={'server-container__builds'}>
                                        <Builds columnWidth={'2rem'} containerHeight={'100%'} tableWidth={'100%'} queueDisplay={'none'} tableRow={'none'} frontPage={true}/>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    };

export default PageOverview;
