import React from 'react';
import MicrosoftLogin from 'react-microsoft-login';
import '../App.scss';

const MicrosoftLoginComp = (props)  => {
    const authHandler = (err, data) => {
        console.log(err, data);
    };
    return (
        <MicrosoftLogin clientId={'ebe47bad-962f-4d39-b3d8-b0af401c518a'} authCallback={authHandler} tenantUrl={'https://login.microsoftonline.com/4a955353-eccd-4e2b-8238-05bf14ba8ff9'}/>
    );
};

export default MicrosoftLoginComp;