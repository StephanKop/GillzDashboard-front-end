import React, {useEffect} from 'react';
import '../App.scss';
import Projects from '../components/comp_projects';
import Header from '../components/comp_header';

const PageProjects = (props)  => {
    useEffect(() => {
        document.title = 'Gillz Dashboard | Projecten';
    }, []);
    return (
        <div>
            <Header title={'Projects'}/>
            <div className={'content'}>
                {/*<h3>Projecten</h3>*/}
                <Projects/>
            </div>
        </div>
    );
};

export default PageProjects;