import React, {useEffect, useState} from 'react';
import '../component_styles/style_dialog_deadlines.scss';
import '../App.scss';
import axios from 'axios';
import ProjectsInterface from '../interfaces/projects';
import {useSnackbar} from 'notistack';

const DialogDeadlinesEdit = (props) => {
    const [hasError, setErrors] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [members, setMembers] = useState<any[]>([]);
    const [changedDate, setChangedDate] = useState<Date>(new Date());
    const [projects,setProjects ]= useState<ProjectsInterface[]>([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    let [members0] = useState('');
    let [members1] = useState('');
    let [members2] = useState('');

    async function fetchMember() {
        const res = await fetch(props.memberLink);
        res
            .json()
            .then((result) => {
                setMembers(result);
                setTimeout(() => {
                    setIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
    }

    async function fetchProjects() {
        const res = await fetch(props.projectsLink);
        res
            .json()
            .then((result) => {
                setProjects(result);
                setTimeout(() => {
                    setIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchMember();
        fetchProjects();
    }, [isLoaded]);

    const convertDate = (value) => new Date(value).toISOString().substr(0, 10);

    function handler(e) {
        setChangedDate(e.target.value);
    }

    useEffect(() => {
        setChangedDate(props.deadline);
    }, [props.deadline]);

    if (hasError) {
        return <h2>Error</h2>;
    }

    const closeForm = () => {
        const modal = (document.getElementById('deadlineEditModal')!);
        modal.classList.remove('visibleAnim');
        const modalBackground = (document.getElementById('modalEditBackground')!);
        modalBackground.classList.remove('visible');
    };

    const deleteRequest = () => {
        axios.delete(props.deadlineLink)
            .then((response) => {
                console.log(response);
                props.reload();
                closeForm();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function sendForm(this: any) {
        const formData = document.querySelector('#deadlineEditForm')! as HTMLFormElement;
        const project = formData.elements['project'.toString()].value;
        const name = formData.elements['name'.toString()].value;
        const deadline = formData.elements['deadline'.toString()].value;

        const allMembers = [] as any;
        if (formData.elements['members[0][id]'].value !== '') {
            members0 = formData.elements['members[0][id]'].value as string;
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

        axios.put(props.deadlineLink, {
            project: project,
            name: name,
            deadline: deadline,
            members: allMembers
        })
            .then((response) => {
                console.log(response);
                props.reload();
                closeForm();
                enqueueSnackbar('Deadline gewijzigd', {variant: 'success', anchorOrigin:{horizontal: 'center', vertical: 'bottom'}});
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <>
            <div id="deadlineEditModal" className={'animate__animated animate__bounce modal'}>
                <div className={'modal__top'}>
                    <h2>Deadline wijzigen</h2>
                    <img id={'cancel'} className={'modal__top--img'} src={(require('../img/add.svg'))} alt={'add'}
                         onClick={closeForm}/>
                </div>
                <form method="post" encType="application/json" id={'deadlineEditForm'} className={'deadlineForm'}>
                    <label className={'deadlineForm__label'}>ID</label>
                    <input className={'deadlineForm__name'} type={'text'} name={'id'} placeholder={props.id}
                           value={props.id} disabled/>
                    <label className={'deadlineForm__label'}>Project</label>
                    <select name={'project'} className={'deadlineForm__select'}>
                        <option value={''}>Geen</option>
                        {projects.map((projectData, index) => (
                            <option key={index} value={projectData.name} selected={props.project === projectData.name}
                                    id={projectData.id}>{projectData.name}</option>
                        ))}
                    </select>
                    <label className={'deadlineForm__label'}>Naam</label>
                    <input className={'deadlineForm__name'} type={'text'} name={'name'} placeholder={props.name}
                           defaultValue={props.name}/>
                    <label className={'deadlineForm__label'}>Datum</label>
                    <input className={'deadlineForm__date'} type={'date'} name={'deadline'} required
                           value={convertDate(changedDate)} onChange={(e) => handler(e)}/>
                    <div className={'members'}>
                        <div className={'members__section'}>
                            <label className={'members__section--title'}>Member 1</label>
                            <select name={'members[0][id]'} className={'member__section--select'}>
                                <option value={''}>Geen</option>
                                {members.map((memberData, index) => (
                                    <option key={index} value={memberData.id} id={memberData.id}
                                            selected={props?.member1?.id === memberData.id}>{memberData.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={'members__section'}>
                            <label className={'members__section--title'}>Member 2</label>
                            <select name={'members[1][id]'}>
                                <option value={''}>Geen</option>
                                {members.map((memberData, index) => (
                                    <option key={index} value={memberData.id} id={memberData.id}
                                            selected={props?.member2?.id === memberData.id}>{memberData.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={'members__section'}>
                            <label className={'members__section--title'}>Member 3</label>
                            <select name={'members[2][id]'}>
                                <option value={''}>Geen</option>
                                {members.map((memberData, index) => (
                                    <option key={index} value={memberData.id} id={memberData.id}
                                            selected={props?.member3?.id === memberData.id}>{memberData.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={'deadlineForm__buttons'}>
                        <input type={'button'} onClick={deleteRequest} value={'Verwijderen'}
                               className={'deleteButton'}/>
                        <input type={'button'} onClick={sendForm} value={'Verzenden'} className={'submitButton'}/>
                    </div>
                </form>
            </div>
            <div className={'modal-background'} id={'modalEditBackground'}></div>
        </>
    );
};

export default DialogDeadlinesEdit;