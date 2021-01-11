import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_projects.scss';
import ProjectsInterface from '../interfaces/projects';
import '../App.scss';

const Projects = (props)  => {
    const [hasError, setErrors] =  useState(false);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [projects, setProjects] = useState<ProjectsInterface[]>([]);
    const [count, setCount] = useState<number>(0);
    const [fetchUrl, setFetchUrl] = useState(process.env.REACT_APP_API_DEVOPS_PROJECTS);

    async function fetchData() {
        // const fetchUrl = process.env.REACT_APP_API_DEVOPS;
        const res = await fetch(fetchUrl!!);
        res
            .json()
            .then((result) => {
                setProjects(result);
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
        // setCount(count + 1);
    }

    useEffect(() => {
        fetchData();
        console.log(count);
    }, [count]);

    if (!isLoaded) {
        return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')}/></div>;
    }

    if (hasError) {
        return <h2>Error</h2>;
    }

    function sorted(sortBy) {
        if (sortBy === 'date') {
            setFetchUrl(process.env.REACT_APP_API_DEVOPS_PROJECTS_SORTEDBYLASTUPDATE);
            setCount(count + 1);
            const sortByDate = document.getElementById('sortByDate')!;
            sortByDate.classList.add('activeSort');
            const sortByName = document.getElementById('sortByName')!;
            sortByName.classList.remove('activeSort');
        } else if (sortBy === 'name') {
            setFetchUrl(process.env.REACT_APP_API_DEVOPS_PROJECTS);
            setCount(count + 1);
            const sortByName = document.getElementById('sortByName')!;
            sortByName.classList.add('activeSort');
            const sortByDate = document.getElementById('sortByDate')!;
            sortByDate.classList.remove('activeSort');
        }
    }

    return (
        <div className={'projects-container'}>
            <div className={'deadlines-container__sort'}>
                <h3 className={'deadlines-container__row--title'} style={{display: props.displayTitle}}>Sorteer op</h3>
                <button id={'sortByName'} onClick={() => sorted('name')} style={{display: props.displayDateSort}} className={'deadlines-container__sort--button activeSort'}>Naam</button>
                <button id={'sortByDate'} onClick={() => sorted('date')} style={{display: props.displayNameSort}} className={'deadlines-container__sort--button'}>Laatst geupdate</button>
            </div>
                {projects.map((projectData, index) => (
                    <div key={index} className={'project'}>
                        <a href={projectData._links.web.href} className={'project__link'}>
                            <div className={'project__link__content'}>
                                <div className={'project__link__content--image'}>
                                    <img src={projectData.defaultTeamImageUrl}/>
                                </div>
                                <div className={'project__link__content__text'}>
                                    <div className={'project__link__content__text--left'}>
                                        <h3>{projectData.name}</h3>
                                        <p>{projectData.description}</p>
                                    </div>
                                    <div className={'project__link__content__text--right'}>
                                        <p>Laatst geupdate op:</p>
                                        <p>{new Date(projectData.lastUpdateTime).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
        </div>
    );
};

export default Projects;
