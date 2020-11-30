import React, {useEffect} from 'react';
import '../App.scss';
import Zendesk from "../components/comp_zendesk";

const PageIssues = (props)  => {
    useEffect(() => {
        document.title = "Gillz Dashboard | Issues"
    }, []);
        return (
            <div className={'content'}>
                <h3>Issues</h3>
                <Zendesk/>
            </div>
        )
    }

export default PageIssues;
