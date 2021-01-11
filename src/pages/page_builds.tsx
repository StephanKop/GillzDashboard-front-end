import React, {useEffect} from 'react';
import '../App.scss';
import Builds from '../components/comp_builds';
import Header from '../components/comp_header';

const PageBuilds = (props)  => {
    useEffect(() => {
        document.title = 'Gillz Dashboard';
    }, []);
    return (
        <div>
            <Header title={'Builds'}/>
            <div className={'content'}>
                {/*<h3>Builds</h3>*/}
                <Builds/>
            </div>
        </div>
    );
};

export default PageBuilds;