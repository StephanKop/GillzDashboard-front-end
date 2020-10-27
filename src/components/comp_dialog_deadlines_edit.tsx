import React, {useEffect, useState} from 'react';
import '../component_styles/style_dialog_deadlines.scss';
import '../App.scss';
import axios from 'axios';

const Dialog_deadlines_edit = (props)  => {
    const [hasError, setErrors] =  useState(false)
    const [isLoaded, setIsLoaded] =  useState(false)
    const [deadlineIsLoaded, setDeadlineIsLoaded] =  useState(false)
    const [members,setMembers ]= useState<any[]>([])
    // const [deadline,setDeadline ]= useState<any[]>([])
    let [members0]= useState(Number);
    let [members1]= useState(Number);
    let [members2]= useState(Number);

    async function fetchMember() {
        const res = await fetch(props.memberLink);
        res
            .json()
            .then((res) => {
                setMembers(res);
                setTimeout(function() {
                    setIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
    }

    // async function fetchDeadline() {
    //     const res = await fetch(props.deadlineLink);
    //     res
    //         .json()
    //         .then((res) => {
    //             setDeadline(res);
    //             setTimeout(function() {
    //                 setDeadlineIsLoaded(true);
    //             }, 100);
    //         })
    //         .catch(err => setErrors(err));
    //     return true;
    // }

    useEffect(() => {
        fetchMember();
        // fetchDeadline();
    }, [isLoaded]);

    if (isLoaded && setDeadlineIsLoaded) {
        // console.log(deadline);
    }

    if (!isLoaded) {
        // return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')}/></div>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

    function closeForm() {
        const modal = (document.getElementById('deadlineEditModal')!);
        modal.classList.remove('visible');
    }

    function sendForm(this: any) {
        let formData = document.querySelector("#deadlineEditForm")! as HTMLFormElement;
        const id = formData.elements['id'].value;
        const name = formData.elements['name'].value;
        const deadline = formData.elements['deadline'].value;
        const link = formData.elements['link'].value;
        let members = [] as any;
        if (formData.elements['members[0][id]'].value !== "") {
            members0 = formData.elements['members[0][id]'].value;
            let memberObj0 = {id: members0};
            members.push(memberObj0);
        }
        if (formData.elements['members[1][id]'].value !== "") {
            members1 = formData.elements['members[1][id]'].value;
            let memberObj1 = {id: members1};
            members.push(memberObj1);
        }
        if (formData.elements['members[2][id]'].value !== "") {
            members2 = formData.elements['members[2][id]'].value;
            let memberObj2 = {id: members2};
            members.push(memberObj2);
        }

        axios.put(props.deadlineLink, {
            id: id,
            name: name,
            deadline: deadline,
            link: link,
            members: members
        })
            .then(function (response) {
                console.log(response);
                closeForm();
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    return (
        <div id="deadlineEditModal" className={'animate__animated animate__bounce modal'}>
            <div className={'modal__top'}>
                <h2>Deadline wijzigen</h2>
                <img id={'cancel'} className={'modal__top--img'} src={(require('../img/add.svg'))} alt={'add'} onClick={closeForm}/>
            </div>
            <form method="post" encType='application/json' id={'deadlineEditForm'} className={'deadlineForm'}>
                <label className={'deadlineForm__label'}>ID</label>
                <input className={'deadlineForm__name'} type={'text'} name={'id'} placeholder={props.id} value={props.id} disabled/>
                <label className={'deadlineForm__label'}>Naam</label>
                <input className={'deadlineForm__name'} type={'text'} name={'name'} placeholder={props.name} defaultValue={props.name}/>
                <label className={'deadlineForm__label'}>Datum</label>
                <input className={'deadlineForm__date'} type={'date'} name={'deadline'}/>
                <label className={'deadlineForm__label'}>Link</label>
                <input className={'deadlineForm__link'} type={'text'} name={'link'} placeholder={props.link} defaultValue={props.link}/>
                <div className={'members'}>
                    <div className={'members__section'}>
                        <label className={'members__section--title'}>Member 1</label>
                        <select name={'members[0][id]'} className={'member__section--select'}>
                            <option value={""}>Geen</option>
                            {members.map((memberData, index) => (
                                <option key={index} value={memberData.id} id={memberData.id}>{memberData.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={'members__section'}>
                        <label className={'members__section--title'}>Member 2</label>
                        <select name={'members[1][id]'}>
                            <option value={""}>Geen</option>
                            {members.map((memberData, index) => (
                                <option key={index} value={memberData.id} id={memberData.id}>{memberData.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={'members__section'}>
                        <label className={'members__section--title'}>Member 3</label>
                        <select name={'members[2][id]'}>
                            <option value={""}>Geen</option>
                            {members.map((memberData, index) => (
                                <option key={index} value={memberData.id} id={memberData.id}>{memberData.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <input type={'button'} onClick={sendForm} value={'Verzenden'} className={'submitButton'}/>
            </form>
        </div>
    )
}

export default Dialog_deadlines_edit;