import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_projects.scss';
import projectsInterface from "../interfaces/projects";
import '../App.scss';

const Projects = (props)  => {
    const  [hasError, setErrors] =  useState(false)
    const  [isLoaded, setIsLoaded] =  useState(false)
    const  [projects, setProjects] = useState<projectsInterface[]>([])
    let    [count, setCount] = useState<number>(0)

    async function fetchData() {
        const fetchUrl = process.env.REACT_APP_API_DEVOPS;
        const res = await fetch(fetchUrl!!);
        res
            .json()
            .then((res) => {
                setProjects(res);
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
        setCount(count++);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (!isLoaded) {
        return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')}/></div>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

    return (
        <div className={'projects-container'}>
                {projects.map((projectData, index) => (
                    <div key={index} className={'project'}>
                        <a href={projectData._links.web.href} className={'project__link'}>
                            <div className={'project__link__content'}>
                                <div className={'project__link__content--image'}>
                                    <img src={projectData.defaultTeamImageUrl}/>
                                </div>
                                <div className={'project__link__content--text'}>
                                    <h3>{projectData.name}</h3>
                                    <p>{projectData.description}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
        </div>
    )
}

export default Projects;
