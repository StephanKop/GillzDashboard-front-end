import React, {useEffect, useState, useContext} from 'react';
import '../component_styles/style_dialog_deadlines.scss';
import '../App.scss';
import axios from 'axios';
import {ReloadContext} from '../context/reloadContext';
import ProjectsInterface from '../interfaces/projects';
import { useSnackbar } from 'notistack';

const DialogDeadlines = (props)  => {
    const [hasError, setErrors] =  useState(false);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [members,setMembers ]= useState<any[]>([]);
    const [projects,setProjects ]= useState<ProjectsInterface[]>([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [count] = useContext(ReloadContext);
    let [members0]= useState(Number);
    let [members1]= useState(Number);
    let [members2]= useState(Number);

    async function fetchData() {
        const res = await fetch(props.memberLink);
        res
            .json()
            .then((result) => {
                setIsLoaded(true);
                setMembers(result);
            })
            .catch(err => setErrors(err));
    }

    async function fetchProjects() {
        const res = await fetch(props.projectsLink);
        res
            .json()
            .then((result) => {
                setIsLoaded(true);
                setProjects(result);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
        fetchProjects();
        console.log(count);
        // let interval = setInterval(() => fetchData(), (1000))
        // return () => clearInterval(interval)
    }, [count]);

    if (isLoaded) {
        // convertDate();
    }

    if (!isLoaded) {
        return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')}/></div>;
    }

    if (hasError) {
        return <h2>Error</h2>;
    }

        function closeForm() {
            const modal = (document.getElementById('deadlineModal')!);
            modal.classList.remove('visibleAnim');
            const modalBackground = (document.getElementById('modalBackground')!);
            modalBackground.classList.remove('visible');
        }

    function sendForm(this: any) {
        const formData = document.querySelector('form')!;
        const project = formData.elements['project'.toString()].value;
        const name = formData.elements['name'.toString()].value;
        const deadline = formData.elements['deadline'.toString()].value;
        // const link = formData.elements['link'.toString()].value;
        // const isActive = formData.elements['isActive'.toString()].value;
        // const boolValue = getBoolean(isActive);
        function getBoolean(value){
            switch(value){
                case true:
                case 'true':
                case 1:
                case '1':
                case 'on':
                case 'yes':
                    return true;
                default:
                    return false;
            }
        }
        const allMembers = [] as any;
        if (formData.elements['members[0][id]'].value !== '') {
            members0 = formData.elements['members[0][id]'].value;
            const numMember0 = Number(members0);
            const memberObj0 = {id: numMember0};
            allMembers.push(memberObj0);
        }
        if (formData.elements['members[1][id]'].value !== '') {
            members1 = formData.elements['members[1][id]'].value;
            const numMember1 = Number(members1);
            const memberObj1 = {id: numMember1};
            allMembers.push(memberObj1);
        }
        if (formData.elements['members[2][id]'].value !== '') {
            members2 = formData.elements['members[2][id]'].value;
            const numMember2 = Number(members2);
            const memberObj2 = {id: numMember2};
            allMembers.push(memberObj2);
        }


        if (!!process.env.REACT_APP_API_DEADLINES) {
        axios.post(process.env.REACT_APP_API_DEADLINES, {
            project: project,
            name: name,
            deadline: deadline,
            members: allMembers
        })
            .then((response) => {
                closeForm();
                props.reload();
                enqueueSnackbar('Deadline aangemaakt', {variant: 'success', anchorOrigin: {vertical: 'bottom', horizontal: 'center'}});
            })
            .catch((error) => {
                enqueueSnackbar('Oeps dat ging niet helemaal goed', {variant: 'error'});
            });
        }
    }

    return (
        <>
            <div id="deadlineModal" className={'modal'}>
                <div className={'modal__top'}>
                    <h2>Deadline toevoegen</h2>
                    <img id={'cancel'} className={'modal__top--img'} src={(require('../img/add.svg'))} alt={'add'}
                         onClick={closeForm}/>
                </div>
                <form method="post" encType="application/json" id={'deadlineForm'} className={'deadlineForm'}>
                    <label className={'deadlineForm__label'}>Project</label>
                    <select name={'project'} className={'deadlineForm__select'}>
                        <option value={''}>Geen</option>
                        {projects.map((projectData, index) => (
                            <option key={index} value={projectData.name}
                                    id={projectData.id}>{projectData.name}</option>
                        ))}
                    </select>
                    <label className={'deadlineForm__label'}>Naam</label>
                    <input className={'deadlineForm__name'} type={'text'} name={'name'} placeholder={'Naam...'}/>
                    <label className={'deadlineForm__label'}>Datum</label>
                    <input className={'deadlineForm__date'} type={'date'} name={'deadline'} placeholder={'Date'}/>
                    {/*<label className={'deadlineForm__label'}>Link</label>*/}
                    {/*<input className={'deadlineForm__link'} type={'text'} name={'link'} placeholder={'Link...'}/>*/}
                    {/*<label className={'deadlineForm__label'}>Op dashboard</label>*/}
                    {/*<select name={'isActive'} className={'deadlineForm__select'}>*/}
                    {/*    <option value={'false'}>Nee</option>*/}
                    {/*    <option value={'true'}>Ja</option>*/}
                    {/*</select>*/}
                    <div className={'members'}>
                        <div className={'members__section'}>
                            <label className={'members__section--title'}>Member 1</label>
                            <select name={'members[0][id]'} className={'member__section--select'}>
                                <option value={''}>Geen</option>
                                {members.map((memberData, index) => (
                                    <option key={index} value={memberData.id}
                                            id={memberData.id}>{memberData.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={'members__section'}>
                            <label className={'members__section--title'}>Member 2</label>
                            <select name={'members[1][id]'}>
                                <option value={''}>Geen</option>
                                {members.map((memberData, index) => (
                                    <option key={index} value={memberData.id}
                                            id={memberData.id}>{memberData.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={'members__section'}>
                            <label className={'members__section--title'}>Member 3</label>
                            <select name={'members[2][id]'}>
                                <option value={''}>Geen</option>
                                {members.map((memberData, index) => (
                                    <option key={index} value={memberData.id}
                                            id={memberData.id}>{memberData.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <input type={'button'} onClick={sendForm} value={'Verzenden'} className={'submitButton'}/>
                </form>
            </div>
            <div className={'modal-background'} id={'modalBackground'}></div>
        </>
        );
};

export default DialogDeadlines;