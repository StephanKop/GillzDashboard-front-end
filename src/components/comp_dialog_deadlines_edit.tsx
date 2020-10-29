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
    let [members0]= useState("");
    let [members1]= useState("");
    let [members2]= useState("");

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

    function deleteRequest() {
        axios.delete(props.deadlineLink)
            .then(function (response) {
                console.log(response);
                closeForm();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function sendForm(this: any) {
        let formData = document.querySelector("#deadlineEditForm")! as HTMLFormElement;
        // const id = formData.elements['id'].value;
        const name = formData.elements['name'].value;
        const deadline = formData.elements['deadline'].value;
        const link = formData.elements['link'].value;
        let isActive = formData.elements['isActive'].value;
        var boolValue = getBoolean(isActive);
        function getBoolean(value){
            switch(value){
                case true:
                case "true":
                case 1:
                case "1":
                case "on":
                case "yes":
                    return true;
                default:
                    return false;
            }
        }
        let members = [] as any;
        if (formData.elements['members[0][id]'].value !== "") {
            members0 = formData.elements['members[0][id]'].value as string;
            let numMember0 = Number(members0);
            let memberObj0 = {id: numMember0};
            members.push(memberObj0);
        }
        if (formData.elements['members[1][id]'].value !== "") {
            members1 = formData.elements['members[1][id]'].value;
            let numMember1 = Number(members1);
            let memberObj1 = {id: numMember1};
            members.push(memberObj1);
        }
        if (formData.elements['members[2][id]'].value !== "") {
            members2 = formData.elements['members[2][id]'].value;
            let numMember2 = Number(members2);
            let memberObj2 = {id: numMember2};
            members.push(memberObj2);
        }

        axios.put(props.deadlineLink, {
            name: name,
            deadline: deadline,
            link: link,
            isActive: boolValue,
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
                <label className={'deadlineForm__label'}>Op dashboard</label>
                <select name={'isActive'} className={'deadlineForm__select'}>
                    <option value={'false'}>Nee</option>
                    <option value={'true'}>Ja</option>
                </select>
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
                <div className={'deadlineForm__buttons'}>
                    <input type={'button'} onClick={deleteRequest} value={'Verwijderen'} className={'deleteButton'}/>
                    <input type={'button'} onClick={sendForm} value={'Verzenden'} className={'submitButton'}/>
                </div>
            </form>
        </div>
    )
}

export default Dialog_deadlines_edit;