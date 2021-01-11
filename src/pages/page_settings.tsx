import React, {useEffect} from 'react';
import MicrosoftLoginComp from '../components/comp_microsoft_login';
import '../App.scss';
import Header from '../components/comp_header';

const PageSettings = (props)  => {
    useEffect(() => {
        document.title = 'Gillz Dashboard | Settings';
    }, []);
    return (
        <div>
            <Header title={'Settings'}/>
            <div className={'content'}>
                <h3>Settings</h3>
                <h3>Login</h3>
                <MicrosoftLoginComp/>
            </div>
        </div>
    );
};

export default PageSettings;