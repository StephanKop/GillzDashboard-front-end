import React, {useEffect} from 'react';
import '../App.scss';
import Builds from "../components/comp_builds";

const PageBuilds = (props)  => {
    useEffect(() => {
        document.title = "Gillz Dashboard | Builds"
    }, []);
    return (
        <div className={'content'}>
            <h3>Builds</h3>
            <Builds/>
        </div>
    )
}

export default PageBuilds;