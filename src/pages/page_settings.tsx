import React from 'react';
import MicrosoftLoginComp from "../components/comp_microsoft_login";
import '../App.scss';

const PageSettings = (props)  => {
    return (
        <div className={'content'}>
            <h3>Settings</h3>
            <h3>Login</h3>
            <MicrosoftLoginComp/>
        </div>
    )
}

export default PageSettings;