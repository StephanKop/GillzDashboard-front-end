import React from 'react';
import '../App.scss';
import Builds from "../components/comp_builds";

const PageBuilds = (props)  => {
    return (
        <div className={'content'}>
            <h3>Builds</h3>
            <Builds/>
        </div>
    )
}

export default PageBuilds;