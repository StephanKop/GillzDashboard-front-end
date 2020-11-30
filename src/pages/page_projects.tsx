import React, {useEffect} from 'react';
import '../App.scss';
import Projects from "../components/comp_projects";

const PageProjects = (props)  => {
    useEffect(() => {
        document.title = "Gillz Dashboard | Projecten"
    }, []);
    return (
        <div className={'content'}>
            <h3>Projecten</h3>
            <Projects/>
        </div>
    )
}

export default PageProjects;