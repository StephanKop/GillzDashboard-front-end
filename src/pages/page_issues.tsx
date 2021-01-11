import React, {useEffect} from 'react';
import '../App.scss';
import Zendesk from '../components/comp_zendesk';
import Header from '../components/comp_header';

const PageIssues = (props)  => {
    useEffect(() => {
        document.title = 'Gillz Dashboard | Issues';
    }, []);
        return (
            <div>
                <Header title={'Zendesk'}/>
                <div className={'content'}>
                    {/*<h3>Issues</h3>*/}
                    <Zendesk/>
                </div>
            </div>
        );
    };

export default PageIssues;
